export interface DiceType {
  name: 'Power' | 'Strength' | 'Agility' | 'Chaos'
}

export interface Dice {
  sides: 3 | 6 | 8 | 10 | 12 | 20 | 100
}
