<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { setSelectedTopic } from "../composables/useLevel";

const router = useRouter();

const defaultTopics = ["Daily life", "Business", "Formal Composition"];

const selectedIndex = ref(0);
const customTopic = ref("");
const isCustom = ref(false);
const inputRef = ref(null);

function handleKeydown(e) {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (!isCustom.value) {
      selectedIndex.value =
        (selectedIndex.value + 1) % (defaultTopics.length + 1);
      isCustom.value = selectedIndex.value === defaultTopics.length;
      if (isCustom.value) inputRef.value?.focus();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (!isCustom.value) {
      selectedIndex.value =
        (selectedIndex.value - 1 + defaultTopics.length + 1) %
        (defaultTopics.length + 1);
      isCustom.value = selectedIndex.value === defaultTopics.length;
      if (isCustom.value) inputRef.value?.focus();
    }
  } else if ((e.key === "Enter" || e.key === " ") && !isCustom.value) {
    e.preventDefault();
    begin();
  } else if (isCustom.value && e.key === "Enter") {
    e.preventDefault();
    begin();
  }
}

function selectTopic(index) {
  selectedIndex.value = index;
  isCustom.value = index === defaultTopics.length;
  if (isCustom.value) {
    inputRef.value?.focus();
  } else {
    begin();
  }
}

function begin() {
  let topic = isCustom.value
    ? customTopic.value.trim()
    : defaultTopics[selectedIndex.value];
  if (!topic) return;
  setSelectedTopic(topic);
  router.push("/practice");
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="topic-select">
    <div class="topic-select-container">
      <h1 class="title">Choose a Topic</h1>
      <div class="topics-list">
        <div
          v-for="(topic, idx) in defaultTopics"
          :key="topic"
          class="topic-item"
          :class="{ selected: selectedIndex === idx && !isCustom }"
          @click="selectTopic(idx)"
          @mouseenter="
            selectedIndex = idx;
            isCustom = false;
          "
        >
          <span class="caret left" v-if="selectedIndex === idx && !isCustom"
            >&lt;&lt;</span
          >
          <span class="topic-name">{{ topic }}</span>
          <span class="caret right" v-if="selectedIndex === idx && !isCustom"
            >&gt;&gt;</span
          >
        </div>
        <div
          class="topic-item custom"
          :class="{ selected: isCustom }"
          @click="selectTopic(defaultTopics.length)"
          @mouseenter="
            selectedIndex = defaultTopics.length;
            isCustom = true;
          "
        >
          <span class="caret left" v-if="isCustom">&lt;&lt;</span>
          <input
            ref="inputRef"
            v-model="customTopic"
            class="custom-input"
            type="text"
            placeholder="Or type your own topic..."
            @focus="
              isCustom = true;
              selectedIndex = defaultTopics.length;
            "
            @keydown.stop.enter="begin"
          />
          <span class="caret right" v-if="isCustom">&gt;&gt;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topic-select {
  height: calc(100dvh - 60px);
  min-height: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.topic-select-container {
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2.5vh;
}

.title {
  font-size: 2.2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 2vh;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 2.5vh;
  width: 100%;
  justify-content: center;
}

.topic-item {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 1.2vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5vh;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
}

.topic-item.selected {
  color: white;
  font-weight: 700;
  /* background and box-shadow removed for clean caret-only effect */
}

.caret {
  font-size: 1.3rem;
  color: #fff;
  font-weight: bold;
  animation: pulse 1s ease-in-out infinite;
  user-select: none;
  text-shadow: 0 2px 8px var(--color-secondary), 0 0 2px var(--color-secondary),
    0 0 8px var(--color-secondary);
}
.caret.left {
  animation-delay: 0s;
  margin-right: 0.7em;
}
.caret.right {
  animation-delay: 0.5s;
  margin-left: 0.7em;
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

.topic-name {
  font-size: 1.3rem;
  text-align: center;
}

.topic-item.custom {
  padding: 0.5vh 0;
}

.custom-input {
  width: 80%;
  max-width: 320px;
  font-size: 1.1rem;
  padding: 0.5em 1em;
  border-radius: 6px;
  border: 1.5px solid var(--color-secondary);
  background: rgba(255, 255, 255, 0.12);
  color: white;
  outline: none;
  transition: border-color 0.2s;
}
.custom-input:focus {
  border-color: var(--color-tertiary);
  background: rgba(255, 255, 255, 0.18);
}
</style>
