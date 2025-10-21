<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Get quiz stats from history state
const stats = ref(null);

onMounted(() => {
  // Stats passed via router state
  if (window.history.state && window.history.state.stats) {
    stats.value = window.history.state.stats;
    console.log("Loaded stats from history state:", stats.value);
  } else {
    console.warn("No stats found in history state");
  }
});

// Format speed as mm:ss (avgSpeed is in milliseconds)
const formattedAvgSpeed = computed(() => {
  if (!stats.value || !stats.value.avgSpeed) return "N/A";
  const ms = stats.value.avgSpeed;
  const seconds = Math.floor(ms / 1000);
  const millis = Math.floor(ms % 1000);
  return `${seconds}.${String(millis).padStart(3, "0")}s`;
});

const accuracy = computed(() => {
  if (!stats.value || stats.value.avgAccuracy == null) return 0;
  // avgAccuracy is a decimal (e.g., 0.3333 = 33.33%)
  return Math.round(stats.value.avgAccuracy * 100);
});

const errorCount = computed(() => {
  if (!stats.value || !stats.value.incorrectRecords) return 0;
  return stats.value.incorrectRecords.length;
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
          <div class="stat-label">Avg Speed</div>
          <div class="stat-value">{{ formattedAvgSpeed }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Accuracy</div>
          <div class="stat-value">{{ accuracy }}%</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Errors</div>
          <div class="stat-value">{{ errorCount }}</div>
        </div>
      </div>

      <!-- Incorrect Records Section -->
      <div
        v-if="
          stats && stats.incorrectRecords && stats.incorrectRecords.length > 0
        "
        class="errors-section"
      >
        <h2>Mistakes to Review</h2>
        <div class="error-list">
          <div
            v-for="(record, idx) in stats.incorrectRecords"
            :key="idx"
            class="error-item"
          >
            <div class="character">{{ record.character }}</div>
            <div class="responses">
              <div class="response-row">
                <span class="label incorrect">Your answer:</span>
                <span class="zhuyin incorrect">{{
                  record.response || "(no input)"
                }}</span>
              </div>
              <div class="response-row">
                <span class="label correct">Correct:</span>
                <span class="zhuyin correct">{{ record.target }}</span>
              </div>
            </div>
          </div>
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

.errors-section {
  margin: 2rem 0 3rem;
  text-align: left;
}

.errors-section h2 {
  color: #fc9e4f;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.error-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
}

.error-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.error-item .character {
  font-size: 2.5rem;
  color: #fff;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
  background: rgba(192, 132, 151, 0.2);
  border-radius: 8px;
  padding: 0.5rem;
}

.error-item .responses {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.response-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.response-row .label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 120px;
  font-weight: 500;
}

.response-row .label.incorrect {
  color: #fc9e4f;
}

.response-row .label.correct {
  color: #9dbbae;
}

.response-row .zhuyin {
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}

.response-row .zhuyin.incorrect {
  color: #fc9e4f;
  background: rgba(252, 158, 79, 0.1);
}

.response-row .zhuyin.correct {
  color: #9dbbae;
  background: rgba(157, 187, 174, 0.1);
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
