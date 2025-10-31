<script setup>
import Key from "./Key.vue";

// Highlighting controls come from parent (Practice.vue)
defineProps({
  keyHighlighting: { type: Boolean, default: false },
  activeZhuyin: { type: String, default: "" },
  showQwerty: { type: Boolean, default: true },
});
</script>

<template>
  <div class="keyboard">
    <!-- Number Row -->
    <div class="keyboard-row">
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === '`'"
        keyboardChar="`"
        >`</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄅ'"
        keyboardChar="1"
        >ㄅ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄉ'"
        keyboardChar="2"
        >ㄉ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ˇ'"
        keyboardChar="3"
        >ˇ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ˋ'"
        keyboardChar="4"
        >ˋ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄓ'"
        keyboardChar="5"
        >ㄓ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ˊ'"
        keyboardChar="6"
        >ˊ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === '˙'"
        keyboardChar="7"
        >˙</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄚ'"
        keyboardChar="8"
        >ㄚ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄞ'"
        keyboardChar="9"
        >ㄞ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄢ'"
        keyboardChar="0"
        >ㄢ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄦ'"
        keyboardChar="-"
        >ㄦ</Key
      >
      <Key size="normal" keyboardChar="="></Key>
      <Key size="backspace">⌫</Key>
    </div>

    <!-- First Letter Row (QWERTY) -->
    <div class="keyboard-row">
      <Key size="tab">↹</Key>
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄆ'"
        keyboardChar="Q"
        >ㄆ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄊ'"
        keyboardChar="W"
        >ㄊ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄍ'"
        keyboardChar="E"
        >ㄍ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄐ'"
        keyboardChar="R"
        >ㄐ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄔ'"
        keyboardChar="T"
        >ㄔ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄗ'"
        keyboardChar="Y"
        >ㄗ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄧ'"
        keyboardChar="U"
        >ㄧ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄛ'"
        keyboardChar="I"
        >ㄛ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄟ'"
        keyboardChar="O"
        >ㄟ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄣ'"
        keyboardChar="P"
        >ㄣ</Key
      >
      <Key size="normal" keyboardChar="["></Key>
      <Key size="normal" keyboardChar="]"></Key>
      <Key size="normal" keyboardChar="\\"></Key>
    </div>

    <!-- Second Letter Row (ASDFGH) -->
    <div class="keyboard-row">
      <Key size="caps">⇪</Key>
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄇ'"
        keyboardChar="A"
        >ㄇ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄋ'"
        keyboardChar="S"
        >ㄋ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄎ'"
        keyboardChar="D"
        >ㄎ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄑ'"
        keyboardChar="F"
        >ㄑ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄕ'"
        keyboardChar="G"
        >ㄕ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄘ'"
        keyboardChar="H"
        >ㄘ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄨ'"
        keyboardChar="J"
        >ㄨ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄜ'"
        keyboardChar="K"
        >ㄜ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄠ'"
        keyboardChar="L"
        >ㄠ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄤ'"
        keyboardChar=";"
        >ㄤ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === '、'"
        keyboardChar="'"
        >、</Key
      >
      <Key size="enter" :active="keyHighlighting && activeZhuyin === 'ENTER'"
        >⏎</Key
      >
    </div>

    <!-- Third Letter Row (ZXCVBN) -->
    <div class="keyboard-row">
      <Key size="shift-left">⇧</Key>
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄈ'"
        keyboardChar="Z"
        >ㄈ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄌ'"
        keyboardChar="X"
        >ㄌ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄏ'"
        keyboardChar="C"
        >ㄏ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄒ'"
        keyboardChar="V"
        >ㄒ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄖ'"
        keyboardChar="B"
        >ㄖ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄙ'"
        keyboardChar="N"
        >ㄙ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="keyHighlighting && activeZhuyin === 'ㄩ'"
        keyboardChar="M"
        >ㄩ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="
          keyHighlighting && (activeZhuyin === 'ㄝ' || activeZhuyin === ',')
        "
        keyboardChar=","
        >ㄝ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="
          keyHighlighting && (activeZhuyin === 'ㄡ' || activeZhuyin === '.')
        "
        keyboardChar="."
        >ㄡ</Key
      >
      <Key
        size="normal"
        :isZhuyin="true"
        :show-qwerty="showQwerty"
        :active="
          keyHighlighting && (activeZhuyin === 'ㄥ' || activeZhuyin === '?')
        "
        keyboardChar="/"
        >ㄥ</Key
      >
      <Key size="shift-right">⇧</Key>
    </div>

    <!-- Bottom Row (Space bar row) -->
    <div class="keyboard-row">
      <Key size="ctrl"></Key>
      <Key size="win"></Key>
      <Key size="alt"></Key>
      <Key
        size="space"
        :active="keyHighlighting && activeZhuyin === 'SPACE'"
      ></Key>
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
