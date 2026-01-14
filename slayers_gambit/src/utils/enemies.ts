import { DamageType, EnemySkill } from './skills'

export type Craft = 'Essence' | 'Core' | 'Shard' | 'Veil'
export type CraftTier = 'I' | 'II' | 'III' | 'IV' | 'V'

export interface Enemy {
  id: string
  name: string
  health: number
  resistances: DamageType[]
  abilities: EnemySkill[]
}
