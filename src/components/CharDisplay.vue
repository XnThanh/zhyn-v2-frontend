<template>
  <span class="char-display">{{ char }}</span>
</template>

<script setup>
const props = defineProps({
  char: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.char-display {
  display: inline-block;
  font-size: 1.7rem;
  color: #bdbdbd;
  margin: 0 0.13em 0.13em 0;
  line-height: 1.2;
  user-select: none;
}
</style>
