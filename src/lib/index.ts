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

    constructor(player: { [key in keyof Player]: Player[key] }) {
        this.health = player.health;
        this.maxHealth = player.maxHealth;
        this.weapon = player.weapon;
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

    newRound(hasInit: boolean) {
        if (!hasInit) throw new Error('Game not initialized');

        return {
            playerWeapon: this.getRandomWeapon(),
            enemyWeapon: null,
            hasRound: true,
            hasFought: false
        }
    }

    fight(
        playerWeapon: Weapon,
        hasRound: boolean,
        hasFought: boolean
    ): Array<number | boolean> {
        if (!hasRound) throw new Error('Round not initialized');
        if (hasFought) throw new Error('Round already played');

        let playerDamages: number = 0;
        let enemyDamages: number = 0;

        playerDamages += playerWeapon.getDamage();

        const enemyWeapon = this.getRandomWeapon();
        enemyDamages += enemyWeapon.getDamage();

        if (playerDamages === enemyDamages) {
            return [this.player.health, this.enemy.health];
        }

        if (playerDamages > enemyDamages) {
            this.enemy.health -= playerDamages - enemyDamages;
        } else {
            this.player.health -= enemyDamages - playerDamages;
        }

        // health cannot be negative
        if (this.player.health <= 0) {
            this.player.health = 0;
        }

        // health cannot be negative
        if (this.enemy.health <= 0) {
            this.enemy.health = 0;
        }

        // check if the game is over and the player has won
        if (this.enemy.health === 0) {
            return [this.player.health, this.enemy.health, enemyWeapon, true, true, false];
        }


        // check if the game is over and the player has lost
        if (this.player.health === 0) {
            return [this.player.health, this.enemy.health, enemyWeapon, true, false, true];
        }

        return [this.player.health, this.enemy.health, enemyWeapon, true, false, false];
    }
}
