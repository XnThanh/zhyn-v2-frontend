<script setup>
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const transitionName = computed(() => route.meta.transition || "fade");
</script>

<template>
  <!-- <Navbar /> -->
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style scoped>
/* App-level styles */
.app-root {
  width: 100%;
  height: 100vh;
  background: transparent;
}

/* Slide-up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(300px);
}

.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-300px);
}

/* Default fade transition for other routes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
