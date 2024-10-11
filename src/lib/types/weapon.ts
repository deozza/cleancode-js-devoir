import type { WeaponRarity } from "./weapon-rarity"

export abstract class Weapon {
  abstract name: string
  abstract description: string
  abstract rarity: WeaponRarity
  
  abstract getDamage(): number
}
