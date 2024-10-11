import { Weapon } from "$lib/types/weapon";
import { WeaponRarity } from "$lib/types/weapon-rarity";

export class CrossbowWeapon extends Weapon {
  name = "crossbow";
  description = "Deals 2 damage to the enemy. Hits between 1 and 5 times.";
  rarity = WeaponRarity.epic;

  getDamage(): number {
    return 2 * (Math.floor(Math.random() * 5));
  }
}
