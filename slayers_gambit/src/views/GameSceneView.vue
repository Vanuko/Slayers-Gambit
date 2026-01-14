<script setup lang="ts">
import Map from '@/components/Map.vue'
import Combat from '@/components/Combat.vue'
import Event from '@/components/Event.vue'
import { useGameStore } from '@/stores/gameStore'
import { ref, computed } from 'vue'

const gameStore = useGameStore()
const selectedHero = computed(() => gameStore.selectedHero)

// Track which view is active: 'map', 'combat', 'event'
const activeView = ref<'map' | 'combat' | 'event'>('map')

// Store the current node the player clicked
const currentNode = ref<{ type: string; id: number } | null>(null)

// Handle node clicks from Map
function onNodeClick(node: { type: string; id: number }) {
  if (['enemy', 'elite', 'boss'].includes(node.type)) {
    currentNode.value = node
    activeView.value = 'combat'
  } else if (node.type === 'event') {
    currentNode.value = node
    activeView.value = 'event'
  }
}

// Return to map
function backToMap() {
  currentNode.value = null
  activeView.value = 'map'
}
</script>

<template>
  <main class="game">
    <keep-alive>
      <Map v-if="activeView === 'map'" :length="9" @node-click="onNodeClick" />
    </keep-alive>
    <Combat v-if="activeView === 'combat'" @close="backToMap" />
    <Event v-if="activeView === 'event'" @close="backToMap" />
  </main>
</template>
