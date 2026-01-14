import { DamageType, EnemySkill } from './Skills'

export interface Enemy {
  id: string
  name: string
  health: number
  resistances: DamageType[]
  abilities: EnemySkill[]
}
