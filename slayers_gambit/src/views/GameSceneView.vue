<script setup lang="ts">
import Map from '@/components/HeroSelectionComponents/Map.vue'
import { useGameStore } from '@/stores/gameStore'
import { computed } from 'vue'

const gameStore = useGameStore()

const selectedHero = computed(() => gameStore.selectedHero)
</script>

<template>
  <main class="game">
    <div v-if="selectedHero">Selected Hero: {{ selectedHero.name }}</div>
    <div v-else>No hero selected</div>
    <Map :length="9" />
  </main>
</template>
