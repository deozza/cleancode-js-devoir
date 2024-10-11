import { Weapon } from "$lib/types/weapon";
import { WeaponRarity } from "$lib/types/weapon-rarity";

export class DartsWeapon extends Weapon {
  name = "darts";
  description = "Deals 1 damage to the enemy. Hits between 1 and 3 times.";
  rarity = WeaponRarity.common;

  getDamage(): number {
    return 1 * (Math.floor(Math.random() * 3));
  }
}
