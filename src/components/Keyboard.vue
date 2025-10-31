<script setup>
import Key from "./Key.vue";
</script>

<template>
  <div class="keyboard">
    <!-- Number Row -->
    <div class="keyboard-row">
      <Key size="normal" :isZhuyin="true" keyboardChar="`">`</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="1">ㄅ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="2">ㄉ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="3">ˇ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="4">ˋ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="5">ㄓ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="6">ˊ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="7">˙</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="8">ㄚ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="9">ㄞ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="0">ㄢ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="-">ㄦ</Key>
      <Key size="normal" keyboardChar="="></Key>
      <Key size="backspace">⌫</Key>
    </div>

    <!-- First Letter Row (QWERTY) -->
    <div class="keyboard-row">
      <Key size="tab">↹</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="Q">ㄆ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="W">ㄊ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="E">ㄍ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="R">ㄐ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="T">ㄔ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="Y">ㄗ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="U">ㄧ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="I">ㄛ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="O">ㄟ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="P">ㄣ</Key>
      <Key size="normal" keyboardChar="["></Key>
      <Key size="normal" keyboardChar="]"></Key>
      <Key size="normal" keyboardChar="\"></Key>
    </div>

    <!-- Second Letter Row (ASDFGH) -->
    <div class="keyboard-row">
      <Key size="caps">⇪</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="A">ㄇ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="S">ㄋ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="D">ㄎ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="F">ㄑ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="G">ㄕ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="H">ㄘ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="J">ㄨ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="K">ㄜ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="L">ㄠ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar=";">ㄤ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="'">、</Key>
      <Key size="enter">⏎</Key>
    </div>

    <!-- Third Letter Row (ZXCVBN) -->
    <div class="keyboard-row">
      <Key size="shift-left">⇧</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="Z">ㄈ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="X">ㄌ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="C">ㄏ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="V">ㄒ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="B">ㄖ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="N">ㄙ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="M">ㄩ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar=",">ㄝ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar=".">ㄡ</Key>
      <Key size="normal" :isZhuyin="true" keyboardChar="/">ㄥ</Key>
      <Key size="shift-right">⇧</Key>
    </div>

    <!-- Bottom Row (Space bar row) -->
    <div class="keyboard-row">
      <Key size="ctrl"></Key>
      <Key size="win"></Key>
      <Key size="alt"></Key>
      <Key size="space"></Key>
      <Key size="alt"></Key>
      <Key size="win"></Key>
      <Key size="ctrl"></Key>
    </div>
  </div>
</template>

<style scoped>
.keyboard {
  /* CSS Variables for easy color customization */
  --keyboard-color-rgb: 119, 212, 219;

  display: inline-flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px;
  /* background: rgba(0, 10, 30, 0.6); */
  /* backdrop-filter: blur(10px); */
  /* border-radius: 12px; */
  /* box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5), 0 0 30px rgba(var(--keyboard-color-rgb), 0.1); */
  border: none;
  max-width: calc(100vw - 2rem);
  width: fit-content;
  /* Scale down by 20% */
  transform: scale(0.8);
  transform-origin: center;
}

/* Scale the entire keyboard when screen width is less than keyboard width */
@media (max-width: 850px) {
  .keyboard {
    transform: scale(calc(0.8 * (100vw - 2rem) / 846));
  }
}

.keyboard-row {
  display: flex;
  gap: 3px;
  justify-content: flex-start;
}
</style>
