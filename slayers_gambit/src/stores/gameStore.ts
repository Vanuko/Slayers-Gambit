import { defineStore } from 'pinia'
import type { Hero } from '@/utils/Heroes'
import type { Dice } from '@/utils/dice'
import type { Item } from '@/utils/inventory'
import type { Skill } from '@/utils/skills'

import { heroDiceMap } from '@/content/dice/startingDice'
import { heroItemsMap } from '@/content/items/statingItems'
import { heroSkillsMap } from '@/content/skills/startingSkills'

export const useGameStore = defineStore('game', {
  state: () => ({
    selectedHero: null as Hero | null,

    heroDice: [] as Dice[],
    heroItems: [] as Item[],
    heroSkills: [] as Skill[],

    difficulty: 1,
  }),

  actions: {
    selectHero(hero: Hero) {
      this.selectedHero = hero

      this.heroDice = heroDiceMap[hero.id] ?? []
      this.heroItems = heroItemsMap[hero.id] ?? []
      this.heroSkills = heroSkillsMap[hero.id] ?? []
    },
    rollDice() {
      this.heroDice = this.heroDice.map((die) => ({
        ...die,
        score: Math.floor(Math.random() * die.diceSides) + 1,
      }))
    },
    // getDiceTotal(type: Dice['diceType']) {
    //   return this.heroDice
    //     .filter((d) => d.diceType === type)
    //     .reduce((sum, d) => sum + (d.score ?? 0), 0)
    // },
  },
})
