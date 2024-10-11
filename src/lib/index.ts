import type { Weapon } from './types/weapon';
import { BowWeapon } from './weapons/bow-weapon';
import { CrossbowWeapon } from './weapons/crossbow-weapon';
import { DaggerWeapon } from './weapons/dagger-weapon';
import { DartsWeapon } from './weapons/darts-weapon';
import { HatchetWeapon } from './weapons/hatcher-weapon';
import { KnifeWeapon } from './weapons/knife-weapon';
import { SpearWeapon } from './weapons/spear-weapon';
import { SwordWeapon } from './weapons/sword-weapon';

export class Game {
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

    init() {
        const playerMaxHealth = 10;
        const playerCurrentHealth = 10;
        const enemyMaxHealth = 10;
        const enemyCurrentHealth = 10;
        const playerWeapon = this.getRandomWeapon();
        const enemyWeapon = null;
        const hasInit = true;
        const hasRound = true;
        const hasFought = false;
        const playerWon = false;
        const playerLost = false;

        return {
            playerMaxHealth,
            playerCurrentHealth,
            enemyMaxHealth,
            enemyCurrentHealth,
            playerWeapon,
            enemyWeapon,
            hasInit,
            hasRound,
            hasFought,
            playerWon,
            playerLost
        }
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
        playerHealth: number,
        enemyHealth: number,
        playerWeapon: Weapon,
        hasInit: boolean,
        hasRound: boolean,
        hasFought: boolean
    ): Array<number | boolean> {
        if (!hasInit) throw new Error('Game not initialized');
        if (!hasRound) throw new Error('Round not initialized');
        if (hasFought) throw new Error('Round already played');

        let playerDamages: number = 0;
        let enemyDamages: number = 0;

        playerDamages += playerWeapon.getDamage();

        const enemyWeapon = this.getRandomWeapon();
        enemyDamages += enemyWeapon.getDamage();

        if (playerDamages === enemyDamages) {
            return [playerHealth, enemyHealth];
        }

        if (playerDamages > enemyDamages) {
            enemyHealth -= playerDamages - enemyDamages;
        } else {
            playerHealth -= enemyDamages - playerDamages;
        }

        // health cannot be negative
        if (playerHealth <= 0) {
            playerHealth = 0;
        }

        // health cannot be negative
        if (enemyHealth <= 0) {
            enemyHealth = 0;
        }

        // check if the game is over and the player has won
        if (enemyHealth === 0) {
            return [playerHealth, enemyHealth, enemyWeapon, true, true, false];
        }


        // check if the game is over and the player has lost
        if (playerHealth === 0) {
            return [playerHealth, enemyHealth, enemyWeapon, true, false, true];
        }

        return [playerHealth, enemyHealth, enemyWeapon, true, false, false];
    }
}
