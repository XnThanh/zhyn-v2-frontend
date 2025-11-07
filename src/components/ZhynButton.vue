<script setup>
import "./../style.css";
</script>

<template>
  <button class="zhyn-button">ZHYN</button>
</template>

<style scoped>
.zhyn-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 10;
  color: white;
  background: transparent;
  /* font-size: 1.75rem; */

  /* border: 2px solid var(--color-primary); */
  cursor: pointer;
  box-shadow: 0 0 1px var(--color-primary), 0 0 10px var(--color-primary);
  transition: all 0.3s ease;

  font-weight: bold;
  /* text-decoration: none; */
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.zhyn-button:hover {
  box-shadow: 0 0 1px var(--color-primary), 0 0 20px var(--color-primary);
  /* transform: scale(1.05); */
}
</style>
