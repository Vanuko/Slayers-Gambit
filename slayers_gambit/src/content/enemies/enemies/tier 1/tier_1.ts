import { Enemy } from '@/utils/enemies'

export const enemies_low: Enemy[] = [
  {
    id: 'kobold_miner',
    name: 'Kobold Miner',
    health: 12,
    resistances: [],
    abilities: [
      {
        name: 'Swing Pickaxe',
        tier: 'Low',
        damageMax: 6,
        damageMin: 1,
        damageType: 'Pierce',
        dice: 3,
        roll: {
          specific: true,
          score: 2,
        },
      },
      {
        name: 'Dodge',
        tier: 'Low',
        dodge: 1,
        dice: 6,
        roll: {
          score: 5,
        },
      },
    ],
  },
  {
    id: 'Brigand',
    name: 'Brigand',
    health: 16,
    resistances: [
      { damageType: 'Pierce', percantage: 25 },
      { damageType: 'Slash', percantage: 40 },
    ],
    abilities: [
      {
        name: 'Axe Swing',
        tier: 'Low',
        damageMax: 12,
        damageMin: 1,
        damageType: 'Slash',
        dice: 6,
        roll: {
          score: 4,
        },
      },
    ],
  },
]
