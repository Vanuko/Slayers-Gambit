<script setup lang="ts">
import Map from '@/components/Map.vue'
import Combat from '@/components/Combat.vue'
import Event from '@/components/Event.vue'
import Crafting from '@/components/Crafting.vue'
import Character from '@/components/Character.vue'
import { useGameStore } from '@/stores/gameStore'
import { ref, computed } from 'vue'

const gameStore = useGameStore()
const selectedHero = computed(() => gameStore.selectedHero)

type GameView = 'map' | 'combat' | 'event' | 'crafting' | 'character'
const activeView = ref<GameView>('map')

function onNodeClick(node: { type: string; id: number }) {
  switch (node.type) {
    case 'enemy':
    case 'elite':
    case 'boss':
      openCombat()
      break
    case 'event':
      openEvent()
      break
  }
}

function openCombat() {
  activeView.value = 'combat'
}

function openEvent() {
  activeView.value = 'event'
}

function openCrafting() {
  activeView.value = 'crafting'
}

function openCharacter() {
  activeView.value = 'character'
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

    <div v-if="activeView === 'map'" class="map-actions">
      <button @click="openCrafting">Crafting</button>
      <button @click="openCharacter">Character</button>
    </div>
    <Combat v-if="activeView === 'combat'" :hero="selectedHero" @close="backToMap" />
    <Event v-if="activeView === 'event'" @close="backToMap" />
    <Crafting v-if="activeView === 'crafting'" @close="backToMap" />
    <Character v-if="activeView === 'character'" @close="backToMap" />
  </main>
</template>

<style scoped>
.game {
  height: 100%;
  width: 100%;
  .map-actions {
    display: flex;
    justify-content: center;
    margin-top: 16px;
    gap: 4px;
  }
}
</style>
