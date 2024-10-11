import weapons from './weaponList.json';

export let weaponList: any[] = [];

const INITIAL_PLAYER_HEALTH = 10;
const INITIAL_ENEMY_HEALTH = 10;
const MAX_REROLLS = 2;

class Fighter {
    currentHealth: number;
    maxHealth: number;
    weapon: string;
    damage: number;

    constructor(maxHealth: number) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.weapon = '';
        this.damage = 0;
    }

    setWeapon(weapon: string, damage: number): void {
        this.weapon = weapon;
        this.damage = damage;
    }

    takeDamage(amount: number): void {
        this.currentHealth = Math.max(this.currentHealth - amount, 0);
    }

    isAlive(): boolean {
        return this.currentHealth > 0;
    }
}

export function init(): { player: Fighter, enemy: Fighter, rerollCount: number, hasFought: boolean } {
    weaponList = weapons;

    const player = new Fighter(INITIAL_PLAYER_HEALTH);
    const enemy = new Fighter(INITIAL_ENEMY_HEALTH);
    const rerollCount = 0;
    const hasFought = false;

    return { player, enemy, rerollCount, hasFought };
}

export function newRound(state: any): { playerWeapon: any, hasRound: boolean, hasFought: boolean } {
    if (!state) throw new Error('Game not initialized');

    return {
        playerWeapon: getRandomWeapon(),
        hasRound: true,
        hasFought: false
    };
}

export function rerollWeapon(state: any): { playerWeapon: any, rerollCount: number } {
    if (state.rerollCount >= MAX_REROLLS) {
        throw new Error('Maximum number of rerolls reached');
    }

    return {
        playerWeapon: getRandomWeapon(),
        rerollCount: state.rerollCount + 1
    };
}

export function fight(player: Fighter, enemy: Fighter, hasFought: boolean): { updatedPlayer: Fighter, updatedEnemy: Fighter, fightOutcome: any } {
    if (hasFought) throw new Error('Round already played');

    const playerDamage = calculateDamage(player.weapon);
    const enemyWeapon = getRandomWeapon();
    const enemyDamage = calculateDamage(enemyWeapon);

    enemy.takeDamage(playerDamage);
    player.takeDamage(enemyDamage);

    return {
        updatedPlayer: player,
        updatedEnemy: enemy,
        fightOutcome: checkFightResult(player, enemy, enemyWeapon)
    };
}

function checkFightResult(player: Fighter, enemy: Fighter, enemyWeapon: any): { playerWon: boolean, playerLost: boolean, enemyWeapon: any } {
    return {
        playerWon: !enemy.isAlive(),
        playerLost: !player.isAlive(),
        enemyWeapon: enemyWeapon
    };
}

function calculateDamage(weapon: any): number {
    const weaponDamageMap: { [key: string]: number | (() => number) } = {
        'hatchet': 1,
        'knife': 1,
        'spear': 1,
        'sword': 5,
        'halberd': 5,
        'bow': () => 1 * Math.floor(Math.random() * 5),
        'crossbow': () => 2 * Math.floor(Math.random() * 5),
        'darts': () => 1 * Math.floor(Math.random() * 3),
        'dagger': 3,
    };

    const damage = weaponDamageMap[weapon.name];
    return typeof damage === 'function' ? damage() : damage;
}

function getRandomWeapon(): any {
    return weaponList[Math.floor(Math.random() * weaponList.length)];
}
