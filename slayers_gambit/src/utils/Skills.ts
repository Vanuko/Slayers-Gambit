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

export type Tier = 'Low' | 'Medium' | 'High' | 'Legendary'

export interface DiceRequirement {
  type?: DiceType
  specific?: boolean
  score: number
}

export interface Skill {
  name: string
  requirements: DiceRequirement[]
  score: number
  damageMin?: number
  damageMax?: number
  healMin?: number
  healMax?: number
  dodge?: number
  block?: number
  damageType?: DamageType
}

export interface EnemySkill {
  name: string
  tier: Tier
  damageMin?: number
  damageMax?: number
  healMin?: number
  healMax?: number
  dodge?: number
  block?: number
  damageType?: DamageType
  dice: number
  roll: DiceRequirement
}
