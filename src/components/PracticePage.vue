<script setup>
import { computed } from "vue";
import { getSelectedLevel, getSelectedTopic } from "../composables/useLevel";

const selectedLevel = computed(() => getSelectedLevel());
const selectedTopic = computed(() => getSelectedTopic());
</script>

<template>
  <div class="practice-page">
    <div class="practice-container">
      <h1>Practice Mode</h1>
      <p class="level-info" v-if="selectedLevel">
        Level: <strong>{{ selectedLevel }}</strong>
      </p>
      <p class="topic-info" v-if="selectedTopic">
        Topic: <strong>{{ selectedTopic }}</strong>
      </p>
      <div class="coming-soon">
        <h2>🚀 Coming Soon</h2>
        <p>Practice exercises will be available here</p>
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
  padding: 2rem;
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

.coming-soon {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(157, 187, 174, 0.1);
  border-radius: 12px;
  margin-top: 2rem;
}

.coming-soon h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.coming-soon p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
}
</style>
