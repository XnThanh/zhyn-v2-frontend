<script setup>
import { useRouter } from "vue-router";
import "./../style.css";

const router = useRouter();

function goHome() {
  router.push("/");
}
</script>

<template>
  <button class="zhyn-button" @click="goHome">ZHYN</button>
</template>

<style scoped>
.zhyn-button {
  position: fixed;
  top: 2rem;
  left: 0;
  z-index: 10;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(var(--color-primary-rgb), 0.08);
  font-size: 1.3rem;
  padding: 0.8rem 1.5rem 0.8rem 1rem;
  border: 1.5px solid rgba(var(--color-primary-rgb), 0.5);
  border-left: none;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(var(--color-primary-rgb), 0.25),
    0 0 12px rgba(var(--color-primary-rgb), 0.1),
    inset 0 0 8px rgba(var(--color-primary-rgb), 0.08);
  transition: all 0.3s ease;
  font-weight: bold;
  font-family: "Inconsolata", ui-monospace, SFMono-Regular, Menlo, Consolas,
    monospace;
  letter-spacing: 3px;
  text-shadow: 0 0 4px rgba(var(--color-primary-rgb), 0.4), 2px 2px 4px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  /* Create arrow/tag shape pointing right */
  clip-path: polygon(
    0 0,
    /* top-left */ 85% 0,
    /* top-right before point */ 100% 50%,
    /* arrow point (middle right) */ 85% 100%,
    /* bottom-right before point */ 0 100% /* bottom-left */
  );

  border-radius: 0 8px 8px 0;
}

.zhyn-button:hover {
  color: rgba(255, 255, 255, 1);
  background: rgba(var(--color-primary-rgb), 0.15);
  border-color: rgba(var(--color-primary-rgb), 0.7);
  box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.4),
    0 0 20px rgba(var(--color-primary-rgb), 0.2),
    inset 0 0 12px rgba(var(--color-primary-rgb), 0.12);
  padding-right: 1.8rem;
  text-shadow: 0 0 6px rgba(var(--color-primary-rgb), 0.6), 2px 2px 6px rgba(0, 0, 0, 0.4);
}

.zhyn-button:active {
  padding-right: 1.5rem;
}
</style>
