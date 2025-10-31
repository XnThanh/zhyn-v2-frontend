<script setup>
import "./../style.css";

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
  active: {
    type: Boolean,
    default: false, // highlight state
  },
});
</script>

<template>
  <div
    class="key"
    :class="[`key-${size}`, { 'key-zhuyin': isZhuyin, 'key-active': active }]"
  >
    <span v-if="keyboardChar" class="keyboard-char">{{ keyboardChar }}</span>
    <span :class="{ 'zhuyin-symbol': isZhuyin }">
      <slot></slot>
    </span>
  </div>
</template>

<style scoped>
.key {
  /* CSS Variables for easy color customization */
  --key-color: var(--color-primary);
  --key-color-rgb: 119, 212, 219;
  --key-color-hover: var(--color-primary-light);

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

/* When active, make the Zhuyin symbol brighter (towards white) to pop more */
.key-active .zhuyin-symbol {
  color: #d2dddd;
  text-shadow: 0 0 4px rgba(var(--key-color-rgb), 0.6),
    0 0 8px rgba(var(--key-color-rgb), 0.35);
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

/* .key:hover {
  background: rgba(var(--key-color-rgb), 0.15);
  border-color: var(--key-color-hover);
  box-shadow: 0 0 15px rgba(var(--key-color-rgb), 0.6),
    0 0 25px rgba(var(--key-color-rgb), 0.4),
    inset 0 0 15px rgba(var(--key-color-rgb), 0.2);
  transform: translateY(-2px);
  color: var(--key-color-hover);
} */

/* .key:hover::before {
  opacity: 1;
} */
/* 
.key:active {
  transform: translateY(0);
  box-shadow: 0 0 10px rgba(var(--key-color-rgb), 0.5),
    0 0 20px rgba(var(--key-color-rgb), 0.3),
    inset 0 0 12px rgba(var(--key-color-rgb), 0.15);
} */

/* Active highlighted key */
/* .key-active {
  border-color: var(--key-color-hover);
  box-shadow: 0 0 18px rgba(var(--key-color-rgb), 0.85),
    0 0 36px rgba(var(--key-color-rgb), 0.45),
    inset 0 0 18px rgba(var(--key-color-rgb), 0.25);
  animation: keyPulse 1.2s ease-in-out infinite;
} */

.key-active {
  background: rgba(var(--key-color-rgb), 0.4);
  /* background: color-mix(in srgb, var(--color-primary), transparent 60%); */
  border-color: var(--key-color);
  box-shadow: none;
  animation: keyPulse 1.2s ease-in-out infinite;
}

@keyframes keyPulse {
  0% {
    box-shadow: 0 0 12px rgba(var(--key-color-rgb), 0.6),
      0 0 22px rgba(var(--key-color-rgb), 0.35),
      inset 0 0 12px rgba(var(--key-color-rgb), 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(var(--key-color-rgb), 0.9),
      0 0 40px rgba(var(--key-color-rgb), 0.55),
      inset 0 0 20px rgba(var(--key-color-rgb), 0.3);
  }
  100% {
    box-shadow: 0 0 12px rgba(var(--key-color-rgb), 0.6),
      0 0 22px rgba(var(--key-color-rgb), 0.35),
      inset 0 0 12px rgba(var(--key-color-rgb), 0.2);
  }
}

/* Zhuyin keys have enhanced styling */
.key-zhuyin {
  font-size: 1.1rem;
  /* font-weight: 600;
  background: rgba(var(--key-color-rgb), 0.08);
  border-width: 2.5px; */
}

/* .key-zhuyin:hover {
  background: rgba(var(--key-color-rgb), 0.2);
} */

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
