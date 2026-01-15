export type DiceType = 'Power' | 'Strength' | 'Agility' | 'Chaos' | 'Chance'
export type DiceSides = 4 | 6 | 8 | 10 | 12 | 20 | 100

export interface Dice {
  diceType: DiceType
  diceSides: DiceSides
}
