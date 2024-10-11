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
    playerMaxHealth = 10;
    playerCurrentHealth = 10;
    enemyMaxHealth = 10;
    enemyCurrentHealth = 10;
    playerWeapon = this.getRandomWeapon();
    enemyWeapon = null;
    hasInit = true;
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
            return [this.playerCurrentHealth, this.enemyCurrentHealth];
        }

        if (playerDamages > enemyDamages) {
            this.enemyCurrentHealth -= playerDamages - enemyDamages;
        } else {
            this.playerCurrentHealth -= enemyDamages - playerDamages;
        }

        // health cannot be negative
        if (this.playerCurrentHealth <= 0) {
            this.playerCurrentHealth = 0;
        }

        // health cannot be negative
        if (this.enemyCurrentHealth <= 0) {
            this.enemyCurrentHealth = 0;
        }

        // check if the game is over and the player has won
        if (this.enemyCurrentHealth === 0) {
            return [this.playerCurrentHealth, this.enemyCurrentHealth, enemyWeapon, true, true, false];
        }


        // check if the game is over and the player has lost
        if (this.playerCurrentHealth === 0) {
            return [this.playerCurrentHealth, this.enemyCurrentHealth, enemyWeapon, true, false, true];
        }

        return [this.playerCurrentHealth, this.enemyCurrentHealth, enemyWeapon, true, false, false];
    }
}
