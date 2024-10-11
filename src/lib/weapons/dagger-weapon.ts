import { Weapon } from "$lib/types/weapon";
import { WeaponRarity } from "$lib/types/weapon-rarity";

export class DaggerWeapon extends Weapon {
  name = "dagger";
  description = "Deals 3 damage to the enemy.";
  rarity = WeaponRarity.uncommon;

  getDamage(): number {
    return 3;
  }
}
