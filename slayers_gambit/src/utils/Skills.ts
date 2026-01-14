import { DiceType } from './dice'

export type DamageType =
  | 'Slash'
  | 'Pierce'
  | 'Bludgeon'
  | 'Fire'
  | 'Ice'
  | 'Thunder'
  | 'Blight'
  | 'Arcane'

export interface DiceRequirement {
  type?: DiceType
  specific?: boolean
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
  damageType?: DamageType
}

export interface EnemySkill {
  name: string
  damage?: number
  heal?: number
  dodge?: number
  block?: number
  damageType?: DamageType
  roll: DiceRequirement
}
