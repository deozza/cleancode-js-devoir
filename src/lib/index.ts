import type { Weapon } from './types/weapon';
import { BowWeapon } from './weapons/bow-weapon';
import { CrossbowWeapon } from './weapons/crossbow-weapon';
import { DaggerWeapon } from './weapons/dagger-weapon';
import { DartsWeapon } from './weapons/darts-weapon';
import { HatchetWeapon } from './weapons/hatcher-weapon';
import { KnifeWeapon } from './weapons/knife-weapon';
import { SpearWeapon } from './weapons/spear-weapon';
import { SwordWeapon } from './weapons/sword-weapon';

class Player {
    health: number;
    maxHealth: number;
    weapon: Weapon | null;

    constructor(player: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key in keyof Player as Player[key] extends (...args: any[]) => any ? never : key]: Player[key]
    }) {
        this.health = player.health;
        this.maxHealth = player.maxHealth;
        this.weapon = player.weapon;
    }

    damage(damage: number) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        }
    }
}

export class Game {
    player = new Player({
        health: 10,
        maxHealth: 10,
        weapon: this.getRandomWeapon()
    });
    enemy = new Player({
        health: 10,
        maxHealth: 10,
        weapon: this.getRandomWeapon()
    });

    hasRound = true;
    hasFought = false;

    playerWon = false;
    playerLost = false;

    private getWeaponList(): Weapon[] {
        return [
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

    private getRandomWeapon(): Weapon {
        const weaponList = this.getWeaponList();
        return weaponList[Math.floor(Math.random() * weaponList.length)];
    }

    newRound() {
        this.player.weapon = this.getRandomWeapon();
        this.enemy.weapon = null;
        this.hasRound = true;
        this.hasFought = false;
    }

    fight(playerWeapon: Weapon): void {
        if (!this.hasRound) throw new Error('Round not initialized');
        if (this.hasFought) throw new Error('Round already played');

        let playerDamages: number = 0;
        let enemyDamages: number = 0;

        playerDamages += playerWeapon.getDamage();

        const enemyWeapon = this.getRandomWeapon();
        enemyDamages += enemyWeapon.getDamage();

        if (playerDamages === enemyDamages) {
            return;
        }

        if (playerDamages > enemyDamages) {
            this.enemy.damage(playerDamages - enemyDamages);
        }

        if (playerDamages < enemyDamages) {
            this.player.damage(enemyDamages - playerDamages);
        }

        this.hasFought = true;

        if (this.enemy.health === 0) {
            this.playerWon = true;
        }

        if (this.player.health === 0) {
            this.playerLost = true;
        }
    }
}
