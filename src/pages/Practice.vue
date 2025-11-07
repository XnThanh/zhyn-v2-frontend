<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getSelectedLevel, getSelectedTopic } from "../composables/useLevel";
import { generateSentences } from "../api/levelMap";
import { getAnswer } from "../api/zhuyinDictionary";
import CharDisplay from "./../components/CharDisplay.vue";
import Keyboard from "./../components/Keyboard.vue";
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
const initialTime = 30; // seconds (DEVELOPMENT: reduced from 60 for testing)
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

    // Navigate to results page with stats using state (not params)
    router.push({
      name: "Results",
      state: { stats },
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
const userInput = ref(""); // Raw keystrokes
const displayInput = computed(() => keystrokesToZhuyin(userInput.value)); // Zhuyin display
const inputFocused = ref(false); // Track if input is focused
const startedQuestions = ref({}); // questionId: true if started
const incorrectChars = ref({}); // Track incorrect character indices
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
  "`": "`",
  "?": "?",
  "？": "？",
  "!": "!",
  "。": "。",
};
const loading = ref(true);
const error = ref(null);

// Toggle for keyboard highlighting feature
const keyHighlighting = ref(false);
// Toggle for showing QWERTY legends
const showQwerty = ref(false);
// Toggle for showing/hiding the keyboard
const showKeyboard = ref(false);

// When keyboard is turned on, default to QWERTY + Key Helper on
watch(showKeyboard, (val) => {
  if (val) {
    showQwerty.value = false;
    keyHighlighting.value = false;
  }
});

// Compute the next Zhuyin symbol to highlight based on current char and typed zhuyin
// Optionally consider the next raw character to suppress space before punctuation
// function buildHighlightSteps(expectedZhuyin, nextChar = "") {
//   const steps = [];
//   const s = (expectedZhuyin || "").toString();
//   // Special composition: Chinese period and question mark
//   if (s === "。") {
//     steps.push("`", ".");
//     return steps;
//   }
//   if (s === "？") {
//     steps.push("`", "?");
//     return steps;
//   }
//   // Default: each zhuyin symbol is one step
//   for (const ch of s) steps.push(ch);
//   // If there is no tone mark, require a space before submit
//   const hasTone = /[ˇˋˊ˙]/.test(s);
//   // Treat standalone punctuation as not requiring a space
//   const isPunctuation = /^[、。？！?!.,;:'"`\-]$/.test(s);
//   // Also, if the NEXT character is punctuation, do not ask for a space here
//   const nextIsPunctuation = nextChar
//     ? /[、。？！?!.,;:'"`\-]/.test(nextChar)
//     : false;
//   if (!hasTone && s.length > 0 && !isPunctuation && !nextIsPunctuation)
//     steps.push("SPACE");
//   return steps;
// }

function buildHighlightSteps(expectedZhuyin, nextChar = "") {
  const steps = [];
  const s = (expectedZhuyin || "").toString();

  // Special composition: Chinese period and question mark
  if (s === "。") {
    steps.push("`", ".");
    return steps;
  }
  if (s === "？") {
    steps.push("`", "?");
    return steps;
  }

  // Default: each zhuyin symbol is one step
  for (const ch of s) steps.push(ch);

  const hasTone = /[ˇˋˊ˙]/.test(s);
  const isPunctuation = /^[、。？！？，．?!.,;:'"`\-]$/.test(s);
  const nextIsPunctuation = nextChar
    ? /[、。？！？，．?!.,;:'"`\-]/.test(nextChar)
    : false;

  // Only require space if no tone, not punctuation, and not followed by punctuation
  if (!hasTone && s.length > 0 && !isPunctuation && !nextIsPunctuation)
    steps.push("SPACE");

  return steps;
}

const activeZhuyin = computed(() => {
  if (!keyHighlighting.value) return "";
  const idx = currentCharIdx.value;
  const expected = zhuyinArr.value?.[idx] || "";
  const nextChar = chars.value?.[idx + 1] || "";
  const steps = buildHighlightSteps(expected, nextChar);
  const typed = userInput.value.length;
  // No steps => no highlight
  if (steps.length === 0) return "";
  // If user hasn't completed the required symbols, highlight the next needed symbol
  if (typed < steps.length) {
    const nextIdx = Math.max(0, Math.min(typed, steps.length - 1));
    return steps[nextIdx];
  }
  // Otherwise, required symbols have been typed; keep highlighting Enter
  return "ENTER";
});

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
    const response = ["他好嗎？", "我很好。", "謝謝你。"];
    // Uncomment below to use real LLM:
    // const response = await generateSentences(payload);
    // console.log("generateSentences response:", response);

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
  // Handle special combinations first
  // Backtick + period should map to Chinese period
  str = str.replace(/`\./g, "`.");
  // // Backtick + question should map to Chinese question mark
  // str = str.replace(/`\?/g, "？");

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
    console.log("User input:", userInput.value);
    console.log("Converted to zhuyin:", answerZhuyin);
    console.log("Expected zhuyin:", zhuyinArr.value[idx]);
    try {
      const submitRes = await submitAnswer({
        quizId: quizId.value,
        questionId: qid,
        response: answerZhuyin,
      });
      console.log("submitAnswer result for", qid, ":", submitRes);

      // Check if answer was incorrect
      if (answerZhuyin !== zhuyinArr.value[idx]) {
        incorrectChars.value[idx] = true;
      }

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
        <div class="word-row">
          <div class="word-box">
            <span v-if="loading" class="loading-text"
              >Loading sentences...</span
            >
            <span v-else-if="error" class="error-text">{{ error }}</span>
            <template v-else>
              <CharDisplay
                v-for="(char, idx) in chars"
                :key="idx"
                :char="char"
                :class="{
                  current: idx === currentCharIdx,
                  incorrect: incorrectChars[idx],
                }"
              />
            </template>
          </div>
          <div class="toolbar">
            <div class="toggle-group">
              <span class="switch-text">Keyboard</span>
              <label class="switch">
                <input type="checkbox" v-model="showKeyboard" />
                <span class="slider"></span>
              </label>
            </div>
            <transition name="slide-down">
              <div v-if="showKeyboard" class="sub-toggles">
                <div class="toggle-group">
                  <span class="switch-text">QWERTY</span>
                  <label class="switch">
                    <input type="checkbox" v-model="showQwerty" />
                    <span class="slider"></span>
                  </label>
                </div>
                <div class="toggle-group">
                  <span class="switch-text">Key Helper</span>
                  <label class="switch">
                    <input type="checkbox" v-model="keyHighlighting" />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="input-wrapper">
          <input
            class="input-box hidden-input"
            v-model="userInput"
            type="text"
            placeholder=""
            autocomplete="off"
            spellcheck="false"
            @keydown="handleInputKeydown"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
          />
          <div
            class="input-display"
            :class="{
              placeholder: !displayInput,
              focused: inputFocused,
              'cursor-left': !displayInput && inputFocused,
              'cursor-end': displayInput && inputFocused,
            }"
          >
            {{ displayInput || "Start Typing..." }}
          </div>
        </div>
        <div class="keyboard-box" v-if="showKeyboard">
          <Keyboard
            :key-highlighting="keyHighlighting"
            :active-zhuyin="activeZhuyin"
            :show-qwerty="showQwerty"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.practice-page {
  /* height: calc(100vh - 150px); */
  background: url("./../assets/taipei101-background-blur.png") no-repeat top
    center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  height: 100vh;
  background-size: cover;
  background-attachment: fixed;
  background-position: top center;
}

.practice-container {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 1rem;
  /* background: rgba(22, 25, 37, 0.85); */
  /* backdrop-filter: blur(10px); */
  /* border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2); */
  /* display: flex;
  flex-direction: column;
  align-items: center; */
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
  /* gap: 1rem; */
}

.toolbar {
  grid-column: 3;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  padding-left: 2rem;
}

.sub-toggles {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

/* Slide-down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.toggle-group {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end; /* keep text + slider anchored to the right */
}

/* Slider Toggle */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
  margin-left: 10px; /* space between label text and slider */
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.2s ease;
  border-radius: 999px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.35);
}

.slider:before {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  background: #ffffff;
  border-radius: 50%;
  transition: all 0.2s ease;
  box-shadow: 0 0 8px rgba(119, 212, 219, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3);
}

.switch input:checked + .slider {
  background: rgba(119, 212, 219, 0.35);
  border-color: #77d4db;
  /* box-shadow: 0 0 12px rgba(119, 212, 219, 0.5); */
}

.switch input:checked + .slider:before {
  left: calc(100% - 23px);
  background: #77d4db;
  box-shadow: 0 0 12px rgba(119, 212, 219, 0.85),
    0 0 22px rgba(119, 212, 219, 0.5);
}

.switch-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  user-select: none;
  font-family: "Inconsolata", ui-monospace, SFMono-Regular, Menlo, Consolas,
    monospace;
}

.timer {
  font-size: 1.3rem;
  color: var(--color-primary);
  font-weight: bold;
  margin-bottom: 0.7rem;
}

.word-box {
  width: 50vw;
  height: 25vh;
  min-width: 320px;
  min-height: 120px;
  max-width: 700px;
  max-height: 340px;
  background: rgba(var(--color-primary-rgb), 0.2);
  color: #bdbdbd;
  border-radius: 0;
  padding: 1.2rem 2rem;
  font-size: 1.7rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  overflow: hidden;
  margin-bottom: 0.5rem;
  box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.9),
    0 0 20px rgba(var(--color-primary-rgb), 0.55),
    inset 0 0 10px rgba(var(--color-primary-rgb), 0.3);
  box-sizing: border-box;
  grid-column: 2;
  justify-self: center;
  flex-shrink: 0;
  border: 2px solid var(--color-primary);
}

.word-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: flex-start;
  width: 100%;
  position: relative;
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
  color: var(--color-secondary);
}

.input-wrapper {
  position: relative;
  width: 20vw;
  min-width: 220px;
  max-width: 500px;
  margin-bottom: 2rem;
  border-radius: 0;
  border: none;
  border-bottom: 2.5px solid var(--color-tertiary);
  background: rgba(var(--color-tertiary-rgb), 0.12);
  box-shadow: 0 0 16px 2px var(--color-tertiary),
    0 0 32px 4px rgba(var(--color-tertiary-rgb), 0.25);
}

.input-box {
  width: 100%;
  min-height: 36px;
  background: rgba(var(--color-primary-rgb), 0.13);
  color: transparent;
  caret-color: transparent;
  border-radius: 7px;
  padding: 0.7rem 1.2rem;
  font-size: 1.2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  text-align: left;
  box-sizing: border-box;
  border: none;
  outline: none;
}

.hidden-input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.input-display {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 36px;
  padding: 0.7rem 1.2rem;
  font-size: 1.2rem;
  color: #fff;
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

/* Cursor at left (before text) */
.input-display.cursor-left::before {
  content: "";
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: #fff;
  margin-right: 2px;
  animation: blink 1s infinite;
}

/* Cursor at end (after text) */
.input-display.cursor-end::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: #fff;
  margin-left: 2px;
  animation: blink 1s infinite;
}

.input-display.placeholder {
  color: rgba(200, 200, 200, 0.4);
  font-family: "Inconsolata", ui-monospace, SFMono-Regular, Menlo, Consolas,
    monospace;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.keyboard-box {
  display: inline-flex;
  justify-content: center;
}

.practice-footer {
  width: 100%;
  text-align: center;
  margin-top: 3.5rem;
  /* padding-bottom: 1.5rem; */
}

.char-display.current {
  background: var(--color-primary-light);
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(252, 158, 79, 0.15);
  font-weight: bold;
}

.char-display.incorrect {
  color: var(--color-secondary, var(--color-secondary));
}
</style>
