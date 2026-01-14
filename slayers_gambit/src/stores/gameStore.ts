import { defineStore } from 'pinia'
import type { Hero } from '@/utils/Heroes'

export const useGameStore = defineStore('game', {
  state: () => ({
    selectedHero: null as Hero | null,
  }),
  actions: {
    selectHero(hero: Hero) {
      this.selectedHero = hero
    },
  },
})
