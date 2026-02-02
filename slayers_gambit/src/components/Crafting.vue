<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

function finishCombat() {
  emit('close')
}

const gameStore = useGameStore()
const equiped = computed(() => gameStore.equippedItems)
</script>

<template>
  <div class="crafting-screen">
    <div class="equiped">
      {{ equiped }}
    </div>
    <h2>Crafting</h2>
    <button @click="finishCombat">Back to Map</button>
  </div>
</template>

<style scoped>
.crafting-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  border: 2px solid #f00;
  border-radius: 12px;
  padding: 20px;

  .equiped {
  }
}
button {
  margin-top: 20px;
  padding: 8px 16px;
}
</style>
