export type DiceType = 'Power' | 'Strength' | 'Agility' | 'Chaos' | 'Chance'

export interface Dice {
  sides: 3 | 6 | 8 | 10 | 12 | 20 | 100
}
