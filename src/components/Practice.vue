<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getSelectedLevel, getSelectedTopic } from "../composables/useLevel";
// TEMPORARY: Comment out LLM import for development
// import { generateSentences } from "../api/levelMap";
import { getAnswer } from "../api/zhuyinDictionary";
import CharDisplay from "./CharDisplay.vue";
import {
  makeQuiz,
  registerQuestion,
  startQuestion,
  submitAnswer,
  endQuiz,
} from "../api/quiz";

const router = useRouter();
const quizId = ref(null);
const questionIds = ref([]);
const selectedLevel = computed(() => getSelectedLevel());
const selectedTopic = computed(() => getSelectedTopic());
const currentCharIdx = ref(0); // index of the current character to type

// Countdown timer
const initialTime = 10; // seconds (DEVELOPMENT: reduced from 60 for testing)
const timeLeft = ref(initialTime);
let timer = null;
let quizExpiryTime = null; // Backend expiry time

// Format time as mm:ss
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
});

onMounted(() => {
  // Fetch sentences from backend
  fetchSentences();
  // Note: Timer will be started after quiz is created in fetchSentences()
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// Watch for timer completion
watch(timeLeft, async (newTime) => {
  if (newTime === 0 && quizId.value) {
    // Timer ran out - end quiz and navigate to results
    await handleQuizEnd();
  }
});

// Handle quiz end
async function handleQuizEnd() {
  try {
    console.log("Ending quiz:", quizId.value);
    const stats = await endQuiz({ quizId: quizId.value });
    console.log("Quiz stats:", stats);

    // Navigate to results page with stats
    router.push({
      name: "Results",
      params: { stats },
    });
  } catch (err) {
    console.error("Failed to end quiz:", err);
    // Navigate anyway with empty stats
    router.push({ name: "Results" });
  }
}

// Sentences and characters
const sentences = ref([]);
const chars = ref([]); // flat array of all characters (including punctuation)
const zhuyinArr = ref([]); // aligned array of zhuyin reps for each char
const userInput = ref("");
const startedQuestions = ref({}); // questionId: true if started
const zhuyin_keymap = {
  1: "ㄅ",
  q: "ㄆ",
  a: "ㄇ",
  z: "ㄈ",
  2: "ㄉ",
  w: "ㄊ",
  s: "ㄋ",
  x: "ㄌ",
  3: "ˇ",
  e: "ㄍ",
  d: "ㄎ",
  c: "ㄏ",
  4: "ˋ",
  r: "ㄐ",
  f: "ㄑ",
  v: "ㄒ",
  5: "ㄓ",
  t: "ㄔ",
  g: "ㄕ",
  b: "ㄖ",
  6: "ˊ",
  y: "ㄗ",
  h: "ㄘ",
  n: "ㄙ",
  7: "˙",
  u: "ㄧ",
  j: "ㄨ",
  m: "ㄩ",
  8: "ㄚ",
  i: "ㄛ",
  k: "ㄜ",
  ",": "ㄝ",
  9: "ㄞ",
  o: "ㄟ",
  l: "ㄠ",
  ".": "ㄡ",
  0: "ㄢ",
  p: "ㄣ",
  ";": "ㄤ",
  "/": "ㄥ",
  "-": "ㄦ",
  "'": "、",
};
const loading = ref(true);
const error = ref(null);

// Fetch sentences from backend
async function fetchSentences() {
  try {
    loading.value = true;
    error.value = null;

    let level = selectedLevel.value;
    const topic = selectedTopic.value;
    // Capitalize first letter of level name if needed
    if (level && typeof level === "string") {
      level = level.charAt(0).toUpperCase() + level.slice(1);
    }

    if (!level || !topic) {
      error.value = "Level and topic are required";
      return;
    }

    const payload = { levelName: level, topic: topic };
    console.log("generateSentences payload:", payload);

    // TEMPORARY: Use hardcoded sentences for development instead of LLM
    const response = ["你好嗎？", "我很好。", "謝謝你。"];
    // Uncomment below to use real LLM:
    // const response = await generateSentences(payload);
    console.log("generateSentences response:", response);

    if (response) {
      sentences.value = Array.isArray(response)
        ? response
        : response.sentences || [];
      // Split all sentences into a flat array of characters (including punctuation)
      chars.value = sentences.value.join("").split("");
      console.log("chars.value updated:", chars.value);
      // Fetch zhuyin for each character
      zhuyinArr.value = await Promise.all(
        chars.value.map(async (char) => {
          try {
            const res = await getAnswer({ character: char });
            console.log("getAnswer result for", char, ":", res);
            // API may return { zhuyinRep: ... } or just a string
            return res && res.zhuyinRep
              ? res.zhuyinRep
              : typeof res === "string"
              ? res
              : "";
          } catch (e) {
            console.error("Zhuyin lookup failed for", char, e);
            return "";
          }
        })
      );
      console.log("zhuyinArr.value:", zhuyinArr.value);

      // Create quiz and register each character as a question
      quizId.value = await makeQuiz({ length: initialTime });
      console.log("makeQuiz result:", quizId.value);
      if (!quizId.value) throw new Error("Failed to create quiz");
      questionIds.value = [];
      for (let i = 0; i < chars.value.length; ++i) {
        try {
          const result = await registerQuestion({
            quizId: quizId.value,
            character: chars.value[i],
            targetZhuyinRep: zhuyinArr.value[i],
          });
          console.log(
            "registerQuestion result for",
            chars.value[i],
            ":",
            result
          );
          questionIds.value.push(result);
        } catch (e) {
          console.error("Failed to register question for", chars.value[i], e);
          questionIds.value.push(null);
        }
      }
      console.log("quizId:", quizId.value);
      console.log("questionIds:", questionIds.value);

      // Timer will be started when first question is started (which returns expiry time)
    }
  } catch (err) {
    console.error("Error fetching sentences:", err);
    error.value = err.message || "Failed to load sentences";
  } finally {
    loading.value = false;
  }
}
function keystrokesToZhuyin(str) {
  // Map each character in the string to zhuyin using the keymap
  return str
    .split("")
    .map((k) => zhuyin_keymap[k] || "")
    .join("");
}

async function handleInputKeydown(e) {
  // Start question on first input for current character
  const idx = currentCharIdx.value;
  const qid = questionIds.value[idx];
  if (
    !startedQuestions.value[qid] &&
    userInput.value.length === 0 &&
    e.key.length === 1
  ) {
    try {
      const startRes = await startQuestion({
        quizId: quizId.value,
        questionId: qid,
      });
      console.log("startQuestion result for", qid, ":", startRes);
      console.log("Has expiryTime?", !!startRes?.expiryTime);
      console.log("Timer already running?", !!timer);
      console.log("Current character index:", idx);
      startedQuestions.value[qid] = true;

      // If this is the first question and we got expiry time, start the timer
      if (!timer) {
        if (startRes && startRes.expiryTime) {
          // Backend returned expiry time
          quizExpiryTime = new Date(startRes.expiryTime);
          console.log("Quiz expiry time from backend:", quizExpiryTime);
          console.log("Current time:", new Date());

          if (!isNaN(quizExpiryTime.getTime())) {
            console.log("Starting timer with backend expiry!");
            startTimerWithExpiry();
          } else {
            console.error("Invalid expiry time received:", startRes.expiryTime);
          }
        } else if (idx === 0) {
          // First character but no expiry time from backend - calculate locally
          console.log(
            "First question but no expiry time from backend, calculating locally"
          );
          quizExpiryTime = new Date(Date.now() + initialTime * 1000);
          console.log("Calculated expiry time:", quizExpiryTime);
          startTimerWithExpiry();
        }
      } else {
        console.log("Not starting timer - timer already exists");
      }
    } catch (err) {
      console.error("Failed to start question", qid, err);
    }
  }
  // On Enter, submit answer and advance
  if (e.key === "Enter") {
    e.preventDefault();
    const answerZhuyin = keystrokesToZhuyin(userInput.value);
    try {
      const submitRes = await submitAnswer({
        quizId: quizId.value,
        questionId: qid,
        response: answerZhuyin,
      });
      console.log("submitAnswer result for", qid, ":", submitRes);
      // Advance to next character
      userInput.value = "";
      if (currentCharIdx.value < chars.value.length - 1) {
        currentCharIdx.value++;
      }
    } catch (err) {
      console.error("Failed to submit answer", qid, err);
    }
  }
}

// Start timer based on backend expiry time
function startTimerWithExpiry() {
  console.log("startTimerWithExpiry called!");
  timer = setInterval(() => {
    const now = new Date();
    const remainingMs = quizExpiryTime - now;
    const remainingSecs = Math.max(0, Math.ceil(remainingMs / 1000));

    console.log("Timer tick - remaining:", remainingSecs, "seconds");
    timeLeft.value = remainingSecs;

    if (remainingSecs <= 0) {
      console.log("Timer expired!");
      clearInterval(timer);
    }
  }, 100); // Update every 100ms for accuracy
  console.log("Timer started with interval ID:", timer);
}
</script>

<template>
  <div class="practice-page">
    <div class="practice-container">
      <!-- Main content above -->
      <div class="practice-main">
        <div class="timer">{{ formattedTime }}</div>
        <div class="word-box">
          <span v-if="loading" class="loading-text">Loading sentences...</span>
          <span v-else-if="error" class="error-text">{{ error }}</span>
          <template v-else>
            <CharDisplay
              v-for="(char, idx) in chars"
              :key="idx"
              :char="char"
              :class="{ current: idx === currentCharIdx }"
            />
          </template>
        </div>
        <input
          class="input-box"
          v-model="userInput"
          type="text"
          placeholder="Type here..."
          autocomplete="off"
          spellcheck="false"
          @keydown="handleInputKeydown"
        />
        <div class="keyboard-box">
          <span>Keyboard display</span>
        </div>
      </div>
      <div class="practice-footer">
        <h1>Practice Mode</h1>
        <p class="level-info" v-if="selectedLevel">
          Level: <strong>{{ selectedLevel }}</strong>
        </p>
        <p class="topic-info" v-if="selectedTopic">
          Topic: <strong>{{ selectedTopic }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.practice-page {
  min-height: calc(100vh - 60px);
  padding: 2rem 1rem;
}

.practice-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background: rgba(22, 25, 37, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

h1 {
  color: #fc9e4f;
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.level-info,
.topic-info {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.level-info strong,
.topic-info strong {
  color: #fc9e4f;
  text-transform: capitalize;
}

.practice-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.2rem;
  /* margin-top: 1rem; */
}

.timer {
  font-size: 1.3rem;
  color: #fc9e4f;
  font-weight: bold;
  margin-bottom: 0.7rem;
}

.word-box {
  width: 50vw;
  height: 33vh;
  min-width: 320px;
  min-height: 120px;
  max-width: 700px;
  max-height: 340px;
  background: rgba(200, 200, 200, 0.18);
  color: #bdbdbd;
  border-radius: 10px;
  padding: 1.2rem 2rem;
  font-size: 1.7rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  overflow: hidden;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  box-sizing: border-box;
}
.word {
  margin: 0 0.5em;
}

.loading-text,
.error-text {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.error-text {
  color: #fc9e4f;
}

.input-box {
  width: 40vw;
  min-width: 220px;
  max-width: 500px;
  min-height: 36px;
  background: rgba(255, 255, 255, 0.13);
  color: #fff;
  border-radius: 7px;
  padding: 0.7rem 1.2rem;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  text-align: left;
  box-sizing: border-box;
  border: none;
  outline: none;
}

.keyboard-box {
  width: 50vw;
  height: 25vh;
  /* min-width: 340px;
  max-width: 800px;
  min-height: 60px; */
  background: #e0e0e0;
  color: #888;
  border-radius: 8px;
  padding: 1.3rem 2.5rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}

.practice-footer {
  width: 100%;
  text-align: center;
  margin-top: 3.5rem;
  padding-bottom: 1.5rem;
}

.char-display.current {
  background: var(--color-secondary, #fc9e4f);
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(252, 158, 79, 0.15);
  font-weight: bold;
}
</style>
