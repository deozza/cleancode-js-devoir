import { BowWeapon } from "$lib/weapons/bow-weapon";
import { CrossbowWeapon } from "$lib/weapons/crossbow-weapon";
import { DaggerWeapon } from "$lib/weapons/dagger-weapon";
import { DartsWeapon } from "$lib/weapons/darts-weapon";
import { HatchetWeapon } from "$lib/weapons/hatcher-weapon";
import { KnifeWeapon } from "$lib/weapons/knife-weapon";
import { SpearWeapon } from "$lib/weapons/spear-weapon";
import { SwordWeapon } from "$lib/weapons/sword-weapon";
import type { Actor } from "./actor";
import type { Weapon } from "./types/weapon";

export class Player implements Actor {
  health: number;
  maxHealth: number;
  weapon: Weapon | null = null;

  private weaponList: Weapon[] = [];
  private rerollCount = 0;
  private MAX_REROLL_COUNT = 2;

  constructor(player: {
      health: number;
      maxHealth: number;
  }) {
      this.health = player.health;
      this.maxHealth = player.maxHealth;
      this.resetWeaponList();
  }

  applyDamage(damage: number) {
      this.health -= damage;
      if (this.health < 0) {
          this.health = 0;
      }
  }

  canRerollWeapon(): boolean {
      return this.rerollCount < this.MAX_REROLL_COUNT;
  }

  rerollWeapon() {
      if (!this.canRerollWeapon()) throw new Error('Cannot reroll weapon');
      this.weapon = this.getRandomWeapon();
      this.rerollCount++;
  }

  startNewRound(): void {
      this.resetRerollCount();
      this.takeRandomWeapon();
  }

  private resetRerollCount() {
      this.rerollCount = 0;
      this.resetWeaponList();
  }

  private resetWeaponList() {
      this.weaponList = [
          new BowWeapon(),
          new CrossbowWeapon(),
          new DaggerWeapon(),
          new DartsWeapon(),
          new HatchetWeapon(),
          new KnifeWeapon(),
          new SpearWeapon(),
          new SwordWeapon(),
      ];
  }

  private takeRandomWeapon() {
      this.weapon = this.getRandomWeapon();
  }

  private getRandomWeapon(): Weapon {
      const randomIndex = Math.floor(Math.random() * this.weaponList.length);
      const weapon = this.weaponList[randomIndex];
      this.weaponList.splice(randomIndex, 1);
      return weapon;
  }
}
