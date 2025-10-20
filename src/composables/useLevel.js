import { ref } from "vue";

// Global state for selected level and topic
const selectedLevel = ref(null);
const selectedTopic = ref(null);

export function useLevel() {
  return {
    selectedLevel,
    selectedTopic,
    setSelectedLevel: (level) => {
      selectedLevel.value = level;
      localStorage.setItem("zhyn-selected-level", level);
    },
    getSelectedLevel: () => {
      if (!selectedLevel.value) {
        const saved = localStorage.getItem("zhyn-selected-level");
        if (saved) selectedLevel.value = saved;
      }
      return selectedLevel.value;
    },
    setSelectedTopic: (topic) => {
      selectedTopic.value = topic;
      localStorage.setItem("zhyn-selected-topic", topic);
    },
    getSelectedTopic: () => {
      if (!selectedTopic.value) {
        const saved = localStorage.getItem("zhyn-selected-topic");
        if (saved) selectedTopic.value = saved;
      }
      return selectedTopic.value;
    },
  };
}

// Convenience exports
export function setSelectedLevel(level) {
  selectedLevel.value = level;
  localStorage.setItem("zhyn-selected-level", level);
}
export function getSelectedLevel() {
  if (!selectedLevel.value) {
    const saved = localStorage.getItem("zhyn-selected-level");
    if (saved) selectedLevel.value = saved;
  }
  return selectedLevel.value;
}
export function setSelectedTopic(topic) {
  selectedTopic.value = topic;
  localStorage.setItem("zhyn-selected-topic", topic);
}
export function getSelectedTopic() {
  if (!selectedTopic.value) {
    const saved = localStorage.getItem("zhyn-selected-topic");
    if (saved) selectedTopic.value = saved;
  }
  return selectedTopic.value;
}
