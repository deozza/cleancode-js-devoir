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
    startNewRound(): void;
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

export class Game implements Actor {
    player = new Player({ health: 10, maxHealth: 10 });
    enemy = new Player({ health: 10, maxHealth: 10 });
    state: Game.GameState = Game.GameState.INITIALIZED;

    startNewRound() {
        this.state = Game.GameState.ROUND_STARTED;
        this.player.startNewRound();
        this.enemy.startNewRound();
    }

    fight(): void {
        this.assertCanFight();

        const { playerDamages, enemyDamages } = this.getDamages();

        this.state = Game.GameState.ROUND_ENDED;

        if (playerDamages === enemyDamages) {
            return;
        }

        if (playerDamages > enemyDamages) {
            this.enemy.applyDamage(playerDamages - enemyDamages);
        }

        if (playerDamages < enemyDamages) {
            this.player.applyDamage(enemyDamages - playerDamages);
        }

        this.determineWinner();
    }

    private assertCanFight() {
        if (this.state === Game.GameState.ROUND_ENDED) throw new Error('Round already played');
        if (this.state !== Game.GameState.ROUND_STARTED) throw new Error('Round not initialized');
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
        if (this.player.health === 0) this.state = Game.GameState.PLAYER_LOST;
        if (this.enemy.health === 0) this.state = Game.GameState.PLAYER_WON;
    }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Game {
    export enum GameState {
        INITIALIZED,
        ROUND_STARTED,
        ROUND_ENDED,
        PLAYER_WON,
        PLAYER_LOST,
    }
}