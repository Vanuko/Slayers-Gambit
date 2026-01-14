import { Resistance, Skill } from './skills'

export type Slot = 'Head' | 'Chest' | 'Arms' | 'Legs' | 'Cape' | 'Hand' | 'Amulet' | 'Rings'
export type ItemType = 'Weapon' | 'Armor' | 'Accessory'
export type Craft = 'Essence' | 'Core' | 'Shard' | 'Veil'
export type CraftTier = 'I' | 'II' | 'III' | 'IV' | 'V'
export type Coin = number

export interface Item {
  slot: Slot
  name: string
  desc: string
  skill: Skill[]
  resistances?: Resistance[]
}
export interface CraftComponent {
  name: string
  desc: string
  item: Craft
  tier: CraftComponent
}
export interface Recipes {
  name: string
  desc: string
  requirements: CraftComponent[]
}
export interface Boons {
  name: string
  desc: string
}
export interface Curse {
  name: string
  desc: string
}

export type inventory = Item[]
export type craftingInventory = CraftComponent[]
