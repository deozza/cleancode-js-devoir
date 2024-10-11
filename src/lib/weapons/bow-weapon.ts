import { Weapon } from "$lib/types/weapon";
import { WeaponRarity } from "$lib/types/weapon-rarity";

export class BowWeapon extends Weapon {
  name = "bow";
  description = "Deals 1 damage to the enemy. Hits between 1 and 5 times.";
  rarity = WeaponRarity.rare;
  
  getDamage(): number {
    return 1 * (Math.floor(Math.random() * 5));
  }
}
