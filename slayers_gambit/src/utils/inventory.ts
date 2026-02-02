import { Resistance, Skill } from './skills'

export type Slot = 'Head' | 'Chest' | 'Arms' | 'Legs' | 'Cape' | 'Hand' | 'Amulet' | 'Rings'
export type ItemType = 'Weapon' | 'Armor' | 'Accessory'
export type Craft = 'Essence' | 'Core' | 'Shard' | 'Veil'
export type CraftTier = 'I' | 'II' | 'III' | 'IV' | 'V'
export type Coin = number

type HeadItem = Item<'Head'>
type ChestItem = Item<'Chest'>
type ArmsItem = Item<'Arms'>
type LegsItem = Item<'Legs'>
type CapeItem = Item<'Cape'>
type AmuletItem = Item<'Amulet'>
type RingItem = Item<'Rings'>
type HandItem = Item<'Hand'>

export interface Item<S extends Slot = Slot> {
  slot: S
  name: string
  desc: string
  skill: Skill[]
  resistances?: Resistance[]
  health?: number
}

export interface EquippedItems {
  Head?: HeadItem
  Chest?: ChestItem
  Arms?: ArmsItem
  Legs?: LegsItem
  Cape?: CapeItem
  Amulet?: AmuletItem

  Rings: [RingItem?, RingItem?, RingItem?, RingItem?]

  Hand: {
    main?: HandItem
    offhand?: HandItem
  }
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
