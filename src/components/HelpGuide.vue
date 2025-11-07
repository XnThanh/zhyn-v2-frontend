<script setup>
import { useRouter } from "vue-router";
import "./../style.css";
import Keyboard from "./Keyboard.vue";

const router = useRouter();

const beginGame = () => {
  router.push("/");
};
</script>

<template>
  <div
    class="help-guide dark-overlay dark-overlay-60 blur-overlay"
    style="--blur-amount: 4px"
  >
    <div class="help-content">
      <h1 class="font-mono">Welcome to ZHYN</h1>
      <h2 class="font-mono">Help Guide</h2>

      <section class="help-section">
        <h2 class="font-mono">What is Zhuyin (注音)?</h2>
        <p>
          Zhuyin, also known as Zhuyin Fuhao (注音符號) or Bopomofo (ㄅㄆㄇㄈ),
          is a phonetic system for Mandarin Chinese that is used in Taiwan.
        </p>
      </section>

      <section class="help-section">
        <h2 class="font-mono">How Zhuyin works</h2>
        <ul>
          <li>
            <strong>Origin:</strong> The symbols are not derived from the Latin
            alphabet like Hanyu Pinyin. Instead, they are simplified forms of
            older Chinese characters
          </li>
          <li>
            <strong>Symbols:</strong> The system includes 37 basic phonetic
            symbols and four tone marks to represent the sounds of Mandarin
            Chinese.
          </li>
          <li>
            <strong>Structure:</strong> Each syllable is broken down into
            components that can be represented by Zhuyin symbols. The 37 symbols
            are divided into 21 initials (consonants) and 16 finals (vowels and
            diphthongs).
          </li>
          <li>
            <strong>Tones:</strong> There are four tone symbols representing
            2nd, 3rd, 4th, and neutral tone. The first tone is indicated by the
            absence of a tone mark (via typing a space).
          </li>
          <li>
            <strong>Keyboard:</strong> Several keyboard layouts exist for
            Zhuyin. The most common layout is displayed below, along with the
            keys they correspond to on a QWERTY keyboard.
          </li>
        </ul>
        <keyboard />
      </section>

      <section class="help-section">
        <h2 class="font-mono">How to Play</h2>
        <ul>
          <li>
            Type the Zhuyin symbols corresponding to the displayed characters as
            quickly and accurately as possible.
          </li>
          <li>
            Display the Zhuyin Keyboard using the Keyboard toggle on the right
            side.
          </li>
          <li>
            Display the QWERTY hints using the QWERTY toggle on the right side.
            Toggle will only appear when the Zhuyin Keyboard is displayed.
          </li>
          <li>
            <strong>Don't know which key to type?</strong> Toggle the Key
            Helper.
          </li>
        </ul>
      </section>

      <button class="begin-game-btn font-mono" @click="beginGame">
        Begin Game
      </button>
    </div>
  </div>
</template>

<style scoped>
.help-guide {
  background: url("./../assets/taipei101-background2.jpg") no-repeat top center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
}

.help-content {
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.help-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.help-content > h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #888;
}

.help-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.help-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.help-section p,
.help-section ul {
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
}

.help-section ul {
  list-style: none;
  padding-left: 0;
}

.help-section li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.help-section li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

.begin-game-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: rgba(var(--color-primary-rgb), 0.7);
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: bounce-button 2s ease-in-out infinite;
  z-index: 10;
}

@keyframes bounce-button {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.begin-game-btn:hover {
  background-color: transparent;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.5);
  animation: none;
}

.begin-game-btn:active {
  transform: scale(0.98);
}
</style>
