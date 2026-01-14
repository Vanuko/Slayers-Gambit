<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

function finishCombat() {
  emit('close')
}
</script>

<template>
  <div class="combat-screen">
    <h2>Combat Node ⚔️</h2>
    <button @click="finishCombat">Back to Map</button>
  </div>
</template>

<style scoped>
.combat-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  border: 2px solid #f00;
  border-radius: 12px;
  padding: 20px;
  background-color: #ffe5e5;
}
button {
  margin-top: 20px;
  padding: 8px 16px;
}
</style>
