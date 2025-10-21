<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Get quiz stats from route params
const stats = ref(null);

onMounted(() => {
  // Stats passed via router state
  if (route.params.stats) {
    stats.value = route.params.stats;
  }
});

// Format time as mm:ss
const formattedTime = computed(() => {
  if (!stats.value || !stats.value.totalTime) return "00:00";
  const seconds = Math.floor(stats.value.totalTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
});

const accuracy = computed(() => {
  if (!stats.value) return 0;
  const { correctAnswers = 0, totalQuestions = 0 } = stats.value;
  if (totalQuestions === 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
});

function goHome() {
  router.push("/");
}

function retry() {
  router.push("/topic");
}
</script>

<template>
  <div class="results-page">
    <div class="results-container">
      <h1>Quiz Complete!</h1>

      <div v-if="stats" class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Time</div>
          <div class="stat-value">{{ formattedTime }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Accuracy</div>
          <div class="stat-value">{{ accuracy }}%</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Correct</div>
          <div class="stat-value">{{ stats.correctAnswers || 0 }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Total</div>
          <div class="stat-value">{{ stats.totalQuestions || 0 }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">WPM</div>
          <div class="stat-value">{{ stats.wpm || 0 }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Errors</div>
          <div class="stat-value">{{ stats.errors || 0 }}</div>
        </div>
      </div>

      <div v-else class="no-stats">
        <p>No statistics available</p>
      </div>

      <div class="actions">
        <button class="btn btn-primary" @click="retry">Try Again</button>
        <button class="btn btn-secondary" @click="goHome">Home</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results-page {
  min-height: calc(100vh - 60px);
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.results-container {
  max-width: 800px;
  width: 100%;
  padding: 3rem 2rem;
  background: rgba(22, 25, 37, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

h1 {
  color: #fc9e4f;
  margin-bottom: 3rem;
  font-size: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(252, 158, 79, 0.2);
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #9dbbae;
}

.no-stats {
  padding: 2rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  min-width: 140px;
}

.btn-primary {
  background: var(--color-secondary, #fc9e4f);
  color: #fff;
}

.btn-primary:hover {
  background: #fd8e35;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(252, 158, 79, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}
</style>
