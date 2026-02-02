import { EquippedItems, Item } from '../inventory'

export function equipStartingItems(items: Item[]): EquippedItems {
  const equipped: EquippedItems = {
    Rings: [undefined, undefined, undefined, undefined],
    Hand: {},
  }

  for (const item of items) {
    switch (item.slot) {
      case 'Head':
      case 'Chest':
      case 'Arms':
      case 'Legs':
      case 'Cape':
      case 'Amulet':
        equipped[item.slot] = item as any
        break

      case 'Hand': {
        const handItem = item as Item<'Hand'>
        if (!equipped.Hand.main) {
          equipped.Hand.main = handItem
        } else if (!equipped.Hand.offhand) {
          equipped.Hand.offhand = handItem
        }
        break
      }

      case 'Rings': {
        const index = equipped.Rings.findIndex((r) => !r)
        if (index !== -1) {
          equipped.Rings[index] = item as Item<'Rings'>
        }
        break
      }
    }
  }

  return equipped
}
