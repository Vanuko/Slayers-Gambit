<script setup lang="ts">
import { heroes } from '../utils/Heroes'
import HeroPortrait from '../components/HeroSelectionComponents/HeroPortrait.vue'
import { useGameStore } from '@/stores/gameStore'
import router from '@/router'

const gameStore = useGameStore()

function handleHeroSelect(hero: (typeof heroes)[number]) {
  gameStore.selectHero(hero)
  console.log('Selected hero:', hero)
  // navigate to game scene
  router.push('/game')
}
</script>

<template>
  <main class="hero-select">
    <h2>Select Your Hero</h2>

    <div class="heroes-grid">
      <HeroPortrait v-for="hero in heroes" :key="hero.id" :hero="hero" @select="handleHeroSelect" />
    </div>
  </main>
</template>

<style scoped>
.hero-select {
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heroes-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>
