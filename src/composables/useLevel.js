import { ref } from "vue";

// Global state for selected level
const selectedLevel = ref(null);

export function useLevel() {
  return {
    selectedLevel,
    setSelectedLevel: (level) => {
      selectedLevel.value = level;
      // Optionally persist to localStorage
      localStorage.setItem("zhyn-selected-level", level);
    },
    getSelectedLevel: () => {
      if (!selectedLevel.value) {
        // Try to restore from localStorage
        const saved = localStorage.getItem("zhyn-selected-level");
        if (saved) {
          selectedLevel.value = saved;
        }
      }
      return selectedLevel.value;
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
    if (saved) {
      selectedLevel.value = saved;
    }
  }
  return selectedLevel.value;
}
