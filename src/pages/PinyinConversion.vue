<script setup>
import chart from "../assets/ZhuyinPinyin.png";
import { useRouter } from "vue-router";
const router = useRouter();
function goBack() {
  router.back();
}
</script>

<template>
  <div
    class="conversion-page dark-overlay dark-overlay-60 blur-overlay"
    style="--blur-amount: 4px"
  >
    <div class="conversion-container">
      <button
        class="close-btn font-mono"
        @click="goBack"
        aria-label="Close chart"
      >
        ✕ Close
      </button>
      <h1 class="font-mono title">Conversion Chart</h1>
      <div class="chart-wrapper">
        <img
          :src="chart"
          alt="Zhuyin to Pinyin Conversion Chart"
          class="chart-img"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.conversion-page {
  background: url("../assets/taipei101-background2.jpg") no-repeat top center;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0; /* avoid extra scroll budget */
  box-sizing: border-box;
}
.conversion-container {
  width: min(100vw, 1100px);
  height: 100vh;
  padding: 1rem;
  display: grid;
  grid-template-rows: auto 1fr; /* title + chart area */
  justify-items: center;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  box-sizing: border-box;
}
.title {
  color: white;
  font-size: clamp(1.1rem, 2.2vw + 0.4rem, 2rem);
  margin: 0.25rem 3rem 0.25rem 3rem; /* leave room for close button */
  text-align: center;
}
.chart-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(6px);
  box-sizing: border-box;
  overflow: hidden; /* no scrolling */
}
.chart-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}
.close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.35rem 0.7rem;
  font-size: 0.95rem;
  line-height: 1;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}
.close-btn:hover {
  background: rgba(0, 0, 0, 0.5);
}
.close-btn:active {
  transform: scale(0.98);
}
</style>
