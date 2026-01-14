import { EnemySkill, Resistance } from './skills'

export interface Enemy {
  id: string
  name: string
  health: number
  resistances: Resistance[]
  abilities: EnemySkill[]
}
