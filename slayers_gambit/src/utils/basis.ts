import { Resistance } from './skills'

export interface Basis {
  health: number
  armor?: number
  resistances?: Resistance[]
}
