<script setup>
import Keyboard from "./Keyboard.vue";
</script>

<template>
  <div class="about-container">
    <Keyboard />
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px); /* Full height minus navbar */
}
</style>
