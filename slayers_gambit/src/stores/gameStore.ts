import { defineStore } from 'pinia'
import type { Hero } from '@/utils/Heroes'
import type { Dice } from '@/utils/dice'
import type { EquippedItems, Item } from '@/utils/inventory'
import type { Skill } from '@/utils/skills'

import { heroDiceMap } from '@/content/dice/startingDice'
import { heroItemsMap } from '@/content/items/statingItems'
import { heroSkillsMap } from '@/content/skills/startingSkills'
import { heroBasis } from '@/content/basis/startingBasis'
import { equipStartingItems } from '@/utils/helpers/equipHelper'

export const useGameStore = defineStore('game', {
  state: () => ({
    selectedHero: null as Hero | null,

    heroDice: [] as Dice[],
    heroInventory: [] as Item[],
    equippedItems: {
      Rings: [undefined, undefined, undefined, undefined],
      Hand: {},
    } as EquippedItems,
    heroSkills: [] as Skill[],

    difficulty: 1,
    heroHealth: 0,
  }),

  actions: {
    selectHero(hero: Hero) {
      this.selectedHero = hero

      this.heroDice = heroDiceMap[hero.id] ?? []
      this.heroInventory = heroItemsMap[hero.id] ?? []
      this.heroSkills = heroSkillsMap[hero.id] ?? []
      this.heroHealth = heroBasis[hero.id]?.[0]?.health ?? 0

      this.equippedItems = equipStartingItems(this.heroInventory)
    },
    rollDice() {
      this.heroDice = this.heroDice.map((die) => ({
        ...die,
        score: Math.floor(Math.random() * die.diceSides) + 1,
      }))
    },
  },
})
