<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { getSelectedLevel, getSelectedTopic } from "../composables/useLevel";
import { generateSentences } from "../api/levelMap";
import CharDisplay from "./CharDisplay.vue";

const selectedLevel = computed(() => getSelectedLevel());
const selectedTopic = computed(() => getSelectedTopic());

// Countdown timer
const initialTime = 60; // seconds
const timeLeft = ref(initialTime);
let timer = null;

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

  // Start timer
  timer = setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--;
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});

// Words from backend
const words = ref([]);
const userInput = ref("");
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
    const response = await generateSentences(payload);
    console.log("generateSentences response:", response);

    if (response) {
      // Backend returns array directly, not wrapped in { sentences: [...] }
      words.value = Array.isArray(response)
        ? response
        : response.sentences || [];
      console.log("words.value updated:", words.value);
    }
  } catch (err) {
    console.error("Error fetching sentences:", err);
    error.value = err.message || "Failed to load sentences";
  } finally {
    loading.value = false;
  }
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
              v-for="(char, idx) in words.join('').split('')"
              :key="idx"
              :char="char"
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
</style>
