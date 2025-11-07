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
    <transition :name="transitionName">
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
  transition: all 0.6s ease-out;
  position: absolute;
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-enter-to {
  transform: translateY(0);
}

.slide-up-leave-from {
  transform: translateY(0);
}

.slide-up-leave-to {
  transform: translateY(-100%);
}

/* Slide-left transition */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.6s ease-out;
  position: absolute;
  width: 100%;
  min-height: 100%;
  top: 0;
  left: 0;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-enter-to {
  transform: translateX(0);
}

.slide-left-leave-from {
  transform: translateX(0);
}

.slide-left-leave-to {
  transform: translateX(-100%);
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
