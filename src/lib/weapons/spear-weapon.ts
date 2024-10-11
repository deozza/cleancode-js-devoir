import { Weapon } from "$lib/types/weapon";
import { WeaponRarity } from "$lib/types/weapon-rarity";

export class SpearWeapon extends Weapon {
  name = "spear";
  description = "Deals 1 damage to the enemy.";
  rarity = WeaponRarity.common;

  getDamage(): number {
    return 1;
  }
}
