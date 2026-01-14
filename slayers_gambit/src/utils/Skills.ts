import { DiceType } from './Dice'

export interface DiceRequirement {
  type: DiceType
  specific: boolean
  score: number
}

export interface Skill {
  name: string
  requirements: DiceRequirement[]
  score: number
  damage?: number
  heal?: number
  dodge?: number
  block?: number
  damageType?: 'Slash' | 'Pierce' | 'Bludgeon' | 'Fire' | 'Ice' | 'Thunder' | 'Corrosive' | 'Arcane'
}

export interface EnemySkill {
  name: string
  damage?: number
  heal?: number
  dodge?: number
  block?: number
  damageType?: 'Slash' | 'Pierce' | 'Bludgeon' | 'Fire' | 'Ice' | 'Thunder' | 'Corrosive' | 'Arcane'
}
