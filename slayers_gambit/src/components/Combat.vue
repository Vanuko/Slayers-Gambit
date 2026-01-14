<script setup lang="ts">
const props = defineProps<{}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function closeCombat() {
  emit('close')
}
</script>

<template>
  <div class="event-screen">
    <h2>Combat Node</h2>
    <button @click="closeCombat">Back to Map</button>
  </div>
</template>

<style scoped>
.event-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  border: 2px solid #888;
  border-radius: 12px;
  padding: 20px;
  background-color: #f5f5f5;
}
button {
  margin-top: 20px;
  padding: 8px 16px;
}
</style>
