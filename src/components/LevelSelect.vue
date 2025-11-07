<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { setSelectedLevel } from "../composables/useLevel";

const router = useRouter();

const levels = [
  { id: "newbie", name: "Newbie" },
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
];

const selectedIndex = ref(0);

function handleKeydown(e) {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    selectedIndex.value = (selectedIndex.value + 1) % levels.length;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selectedIndex.value =
      (selectedIndex.value - 1 + levels.length) % levels.length;
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    selectLevel(selectedIndex.value);
  }
}

function selectLevel(index) {
  const level = levels[index];
  setSelectedLevel(level.id);
  // Navigate to topic select page
  router.push("/topic");
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    class="level-select dark-overlay dark-overlay-70 blur-overlay"
    style="--blur-amount: 3px"
  >
    <div class="level-select-container">
      <h1 class="title font-mono">Select Level</h1>

      <div class="levels-list font-mono">
        <div
          v-for="(level, index) in levels"
          :key="level.id"
          class="level-item"
          :class="{ selected: selectedIndex === index }"
          @click="selectLevel(index)"
          @mouseenter="selectedIndex = index"
        >
          <span class="caret left" v-if="selectedIndex === index"
            >&lt;&lt;</span
          >
          <span class="level-name">{{ level.name }}</span>
          <span class="caret right" v-if="selectedIndex === index"
            >&gt;&gt;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.level-select {
  background: url("./../assets/taipei101-background2.jpg") no-repeat top center;
  background-size: cover;
  background-attachment: fixed;
  background-position: top center;
  height: 100vh;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
}

.level-select-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 1;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 2.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.levels-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  justify-content: center;
}

.level-item {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 1.2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-height: 2.8rem;
}

.level-name {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  min-width: 140px;
  text-align: center;
}

.level-item.selected .level-name {
  color: white;
  font-weight: 700;
}

.caret {
  font-size: 1.7rem;
  color: #fff;
  font-weight: bold;
  animation: pulse 1s ease-in-out infinite;
  user-select: none;
  text-shadow: 0 2px 8px var(--color-secondary), 0 0 2px var(--color-secondary),
    0 0 8px var(--color-secondary);
}

.caret.left {
  animation-delay: 0s;
}

.caret.right {
  animation-delay: 0.5s;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }

  .level-name {
    font-size: 1.2rem;
    min-width: 90px;
  }

  .levels-list {
    gap: 0.7rem;
  }

  .level-item {
    padding: 0.7rem 0;
    min-height: 2.1rem;
    gap: 1.2rem;
  }

  .caret {
    font-size: 1.2rem;
  }
}
</style>
