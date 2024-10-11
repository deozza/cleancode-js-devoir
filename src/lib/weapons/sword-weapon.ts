import { Weapon } from "$lib/types/weapon";
import { WeaponRarity } from "$lib/types/weapon-rarity";

export class SwordWeapon extends Weapon {
  name = "sword";
  description = "Deals 5 damage to the enemy.";
  rarity = WeaponRarity.rare;

  getDamage(): number {
    return 5;
  }
}
