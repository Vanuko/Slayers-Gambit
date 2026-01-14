<script setup lang="ts">
import Map from '@/components/Map.vue'
import Combat from '@/components/Combat.vue'
import Event from '@/components/Event.vue'
import { useGameStore } from '@/stores/gameStore'
import { ref, computed } from 'vue'

const gameStore = useGameStore()
const selectedHero = computed(() => gameStore.selectedHero)
const activeView = ref<'map' | 'combat' | 'event'>('map')

function onNodeClick(node: { type: string; id: number }) {
  if (['enemy', 'elite', 'boss'].includes(node.type)) {
    activeView.value = 'combat'
  } else if (node.type === 'event') {
    activeView.value = 'event'
  }
}

function backToMap() {
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
