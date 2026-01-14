import { Enemy } from '@/utils/enemies'

export const enemies_low: Enemy[] = [
  {
    id: 'Kobold',
    name: 'Kobold',
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
          score: 3,
        },
      },
      {
        name: 'Dodge',
        tier: 'Low',
        dodge: 1,
        dice: 6,
        roll: {
          score: 6,
        },
      },
    ],
  },
]
