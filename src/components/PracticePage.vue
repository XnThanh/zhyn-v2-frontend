<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { getSelectedLevel, getSelectedTopic } from "../composables/useLevel";

const selectedLevel = computed(() => getSelectedLevel());
const selectedTopic = computed(() => getSelectedTopic());

// Countdown timer
const initialTime = 60; // seconds
const timeLeft = ref(initialTime);
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--;
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});

// Placeholder for backend-generated words
const words = ref(["example", "words", "from", "backend"]);
const userInput = ref("");
</script>

<template>
  <div class="practice-page">
    <div class="practice-container">
      <!-- Main content above -->
      <div class="practice-main">
        <div class="timer">⏰ {{ timeLeft }}s</div>
        <div class="word-box">
          <span v-for="(word, idx) in words" :key="idx" class="word">{{
            word
          }}</span>
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
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  box-sizing: border-box;
}
.word {
  margin: 0 0.5em;
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
