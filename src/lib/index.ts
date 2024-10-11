import type { Weapon } from './types/weapon';
import { BowWeapon } from './weapons/bow-weapon';
import { CrossbowWeapon } from './weapons/crossbow-weapon';
import { DaggerWeapon } from './weapons/dagger-weapon';
import { DartsWeapon } from './weapons/darts-weapon';
import { HatchetWeapon } from './weapons/hatcher-weapon';
import { KnifeWeapon } from './weapons/knife-weapon';
import { SpearWeapon } from './weapons/spear-weapon';
import { SwordWeapon } from './weapons/sword-weapon';

interface Actor {
    newRound(): void;
}

class Player implements Actor {
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

    damage(damage: number) {
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

    newRound(): void {
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

export class Game implements Actor {
    player = new Player({ health: 10, maxHealth: 10 });
    enemy = new Player({ health: 10, maxHealth: 10 });

    hasRound = true;
    hasFought = false;

    playerWon = false;
    playerLost = false;

    newRound() {
        this.hasRound = true;
        this.hasFought = false;
        this.player.newRound();
        this.enemy.newRound();
    }

    fight(): void {
        this.assertCanFight();

        const { playerDamages, enemyDamages } = this.getDamages();

        this.hasFought = true;

        if (playerDamages === enemyDamages) {
            return;
        }

        if (playerDamages > enemyDamages) {
            this.enemy.damage(playerDamages - enemyDamages);
        }

        if (playerDamages < enemyDamages) {
            this.player.damage(enemyDamages - playerDamages);
        }

        this.determineWinner();
    }

    private assertCanFight() {
        if (!this.hasRound) throw new Error('Round not initialized');
        if (this.hasFought) throw new Error('Round already played');
    }

    private getDamages() {
        const playerWeapon = this.player.weapon;
        const enemyWeapon = this.enemy.weapon;

        if (!playerWeapon || !enemyWeapon) {
            throw new Error('Player or enemy weapon not initialized');
        }

        const playerDamages = playerWeapon.getDamage();
        const enemyDamages = enemyWeapon.getDamage();

        return { playerDamages, enemyDamages };
    }

    private determineWinner(): void {
        if (this.player.health === 0) {
            this.playerLost = true;
        }

        if (this.enemy.health === 0) {
            this.playerWon = true;
        }
    }
}
