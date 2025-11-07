<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import "./../style.css";

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
  router.push("/practice");
}
</script>

<template>
  <div class="results-page">
    <div class="results-container font-mono">
      <p class="author-right font-mono">Made by LTX</p>
      <h1>Game Complete</h1>
      <div class="results-main font-mono">
        <!-- Left: Stats -->
        <section class="left-panel glow-container">
          <h1>Stats</h1>

          <template v-if="stats">
            <div class="stats-grid">
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
          </template>
          <div v-else class="no-stats">
            <p>No statistics available</p>
          </div>

          <div class="actions">
            <button class="btn btn-primary" @click="retry">Try Again</button>
            <button class="btn btn-secondary" @click="goHome">Home</button>
          </div>
        </section>

        <!-- Right: Mistakes -->
        <section class="right-panel glow-container">
          <h1>Mistakes</h1>
          <div class="error-list">
            <template
              v-if="
                stats &&
                stats.incorrectRecords &&
                stats.incorrectRecords.length > 0
              "
            >
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
            </template>
            <div v-else class="no-errors">No Mistakes? 你是天才! 🌟</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results-page {
  background: url("./../assets/taipei101-background-blur.png") no-repeat top
    center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh; /* lock to viewport so only right panel scrolls */
  padding: 1rem;
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden; /* prevent page overflow */
  box-sizing: border-box;
}

.results-container {
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  box-sizing: border-box;
}

.results-main {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  flex: 1;
  min-height: 0;
}

.left-panel,
.right-panel {
  flex: 1 1 50%;
  min-width: 0; /* allow flex children to shrink without overflow */
  padding: 1.5rem;
  box-sizing: border-box;
  overflow: hidden; /* contain inner scroll areas */
  display: flex;
  flex-direction: column; /* make list fill and scroll inside */
}

h1 {
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-size: 2.4rem;
  text-align: center;
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
  box-shadow: 0 8px 16px rgba(var(--color-primary-rgb), 0.2);
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

.right-panel h2 {
  color: var(--color-primary);
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
}

.error-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 auto; /* take remaining space */
  min-height: 0; /* allow flex child to shrink for scroll */
  overflow-y: auto; /* scroll only this column */
  padding: 0.5rem;
}

.no-errors {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-size: 1rem;
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
  /* Primary glow styling for mistake characters */
  background: rgba(var(--color-primary-rgb), 0.2);
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.9),
    0 0 20px rgba(var(--color-primary-rgb), 0.55),
    inset 0 0 10px rgba(var(--color-primary-rgb), 0.3);
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
  color: var(--color-tertiary);
}

.response-row .label.correct {
  color: var(--color-primary);
}

.response-row .zhuyin {
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}

.response-row .zhuyin.incorrect {
  color: var(--color-tertiary);
  background: rgba(252, 158, 79, 0.1);
}

.response-row .zhuyin.correct {
  color: var(--color-primary);
  background: rgba(157, 187, 174, 0.1);
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
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
  background: var(--color-primary, var(--color-primary-light));
  color: #fff;
}

.btn-primary:hover {
  background: var(--color-primary-light);
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
