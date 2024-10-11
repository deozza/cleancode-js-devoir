import { Weapon } from "$lib/types/weapon";
import { WeaponRarity } from "$lib/types/weapon-rarity";

export class HatchetWeapon extends Weapon {
  name = "hatchet";
  description = "Deals 1 damage to the enemy.";
  rarity = WeaponRarity.common;

  getDamage(): number {
    return 1;
  }
}
