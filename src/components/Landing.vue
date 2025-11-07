<script setup>
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import "./../style.css";

const router = useRouter();

const handleKeyDown = (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    router.push("/level");
  } else if (event.key === "h" || event.key === "H") {
    event.preventDefault();
    router.push("/help");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="landing-page dark-overlay dark-overlay-60">
    <div class="main-content">
      <h1 class="welcome-msg font-mono">Welcome to ZHYN</h1>
      <h2 class="font-mono pulse">&lt; press space to start &gt;</h2>
    </div>
    <div class="bottom-content">
      <h3 class="welcome-msg font-mono">&lt; press h for help &gt;</h3>
    </div>
    <p class="author font-mono">Made by LTX</p>
  </div>
</template>

<style scoped>
.landing-page {
  background: url("./../assets/taipei101-background1.jpg") no-repeat top center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}

/* dark overlay */
/* .landing-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* adjust 0.5 = 50% darkness */
/* z-index: 0; /* behind text */
/* }  */

.main-content {
  flex-grow: 1; /* takes up remaining vertical space */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.bottom-content {
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.author {
  position: fixed;
  bottom: 0.5rem;
  right: 2rem;
  color: gray;
  font-size: 1rem;
}

.pulse {
  display: inline-block;
  animation: pulse 1.6s ease-in-out infinite;
  will-change: transform, opacity;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.75;
  }
  50% {
    transform: scale(1.06);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pulse {
    animation: none;
  }
}
</style>
