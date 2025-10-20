<script setup>
import Navbar from "./components/Navbar.vue";
import ApiPlayground from "./components/ApiPlayground.vue";
</script>

<template>
  <Navbar />
  <div class="content">
    <ApiPlayground />
  </div>
</template>

<style scoped>
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.logos {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
