//Guy Equipment

import { Item } from '@/utils/inventory'

export const Young_blood_Items: Item[] = [
  {
    slot: 'Chest',
    name: `Guy's Plate`,
    desc: 'Sturdy and well maintained',
    skill: [
      {
        name: 'Plates Protection',
        requirements: [
          {
            type: 'Agility',
            score: 4,
          },
        ],
        block: 6,
      },
    ],
    resistances: [
      {
        damageType: 'Slash',
        percantage: 35,
      },
    ],
  },
  {
    slot: 'Hand',
    name: `Guy's Flail`,
    desc: 'Decent for cracking skulls',
    skill: [
      {
        name: 'Flail Swing',
        requirements: [
          {
            type: 'Strength',
            score: 4,
          },
        ],
        damageMin: 2,
        damageMax: 8,
        critRequirement: [
          {
            type: 'Agility',
            score: 6,
          },
        ],
        crit: 'Ignore Dodge Token',
      },
    ],
  },
  {
    slot: 'Hand',
    name: `Guy's Shield`,
    desc: 'Good Enough For a Block or Two',
    skill: [
      {
        name: 'Shield Block',
        requirements: [
          {
            type: 'Agility',
            score: 3,
          },
        ],
        block: 4,
      },
      {
        name: 'Shield Bash',
        requirements: [
          {
            type: 'Strength',
            score: 4,
          },
        ],
        damageMin: 1,
        damageMax: 4,
      },
    ],
  },
  {
    slot: 'Legs',
    name: `Guy's Walking Boots`,
    desc: `Seen better day's`,
    skill: [
      {
        name: 'Dodge',
        requirements: [
          {
            type: 'Agility',
            score: 6,
          },
        ],
        dodge: 1,
      },
    ],
  },
]
