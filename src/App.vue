<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <router-view />
</template>

<style scoped>
/* App-level styles */
.app-root {
  width: 100%;
  height: 100vh;
  background: transparent;
}
</style>
