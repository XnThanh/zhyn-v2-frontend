<script setup>
defineProps({
  size: {
    type: String,
    default: "normal", // normal, wide, wider, space, etc.
  },
  isZhuyin: {
    type: Boolean,
    default: false, // true for keys that map to Zhuyin symbols
  },
  keyboardChar: {
    type: String,
    default: "", // Standard keyboard character (e.g., "Q", "W", "1", etc.)
  },
});
</script>

<template>
  <div class="key" :class="[`key-${size}`, { 'key-zhuyin': isZhuyin }]">
    <span v-if="keyboardChar" class="keyboard-char">{{ keyboardChar }}</span>
    <span :class="{ 'zhuyin-symbol': isZhuyin }">
      <slot></slot>
    </span>
  </div>
</template>

<style scoped>
.key {
  /* CSS Variables for easy color customization */
  --key-color: #77d4db;
  --key-color-rgb: 119, 212, 219;
  --key-color-hover: #8ee4ea;

  background: rgba(var(--key-color-rgb), 0.05);
  border: 2px solid var(--key-color);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--key-color);
  transition: all 0.3s ease;
  box-shadow: 0 0 8px rgba(var(--key-color-rgb), 0.4),
    0 0 15px rgba(var(--key-color-rgb), 0.2),
    inset 0 0 10px rgba(var(--key-color-rgb), 0.1);
  height: 50px;
  position: relative;
}

/* Keyboard character in top-left corner */
.keyboard-char {
  position: absolute;
  top: 4px;
  left: 6px;
  font-size: 0.75rem;
  font-weight: 400;
  opacity: 0.7;
}

/* Zhuyin symbol slightly offset to center-right */
.zhuyin-symbol {
  position: relative;
  top: 3px;
  left: 3px;
  font-size: 1.1rem;
}

.key::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 4px;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(var(--key-color-rgb), 0.6),
    rgba(var(--key-color-rgb), 0.3)
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.key:hover {
  background: rgba(var(--key-color-rgb), 0.15);
  border-color: var(--key-color-hover);
  box-shadow: 0 0 15px rgba(var(--key-color-rgb), 0.6),
    0 0 25px rgba(var(--key-color-rgb), 0.4),
    inset 0 0 15px rgba(var(--key-color-rgb), 0.2);
  transform: translateY(-2px);
  color: var(--key-color-hover);
}

.key:hover::before {
  opacity: 1;
}

.key:active {
  transform: translateY(0);
  box-shadow: 0 0 10px rgba(var(--key-color-rgb), 0.5),
    0 0 20px rgba(var(--key-color-rgb), 0.3),
    inset 0 0 12px rgba(var(--key-color-rgb), 0.15);
}

/* Zhuyin keys have enhanced styling */
.key-zhuyin {
  font-size: 1.1rem;
  /* font-weight: 600;
  background: rgba(var(--key-color-rgb), 0.08);
  border-width: 2.5px; */
}

.key-zhuyin:hover {
  background: rgba(var(--key-color-rgb), 0.2);
}

/* All rows align to 806px total width */
.key-normal {
  width: 50px;
}

.key-backspace {
  width: 78px;
}

.key-tab {
  width: 75px;
}

.key-caps {
  width: 94px;
}

.key-enter {
  width: 90px;
}

.key-shift-left {
  width: 122px;
}

.key-shift-right {
  width: 122px;
}

.key-space {
  width: 316px;
}

.key-ctrl {
  width: 65px;
}

.key-alt {
  width: 65px;
}

.key-win {
  width: 65px;
}
</style>
