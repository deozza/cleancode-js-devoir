import type { Game } from './gameState';
import weapons from './weaponList.json';

export let weaponList: Game.Weapon[] = [];

const INITIAL_HEALTH = 10;
const MAX_REROLLS = 2;

export function init(): Game.State {
    weaponList = weapons;

    return {
        playerMaxHealth: INITIAL_HEALTH,
        playerCurrentHealth: INITIAL_HEALTH,
        enemyMaxHealth: INITIAL_HEALTH,
        enemyCurrentHealth: INITIAL_HEALTH,
        playerWeapon: getRandomWeapon(weaponList, []),
        enemyWeapon: null,
        hasInit: true,
        hasRound: true,
        hasFought: false,
        playerWon: false,
        playerLost: false,
        rerollsLeft: MAX_REROLLS,
        pickedWeapons: []
    };
}

function getRandomWeapon(weaponList: Game.Weapon[], pickedWeapons: Game.Weapon[]): Game.Weapon {
    const availableWeapons = weaponList.filter(weapon => !pickedWeapons.includes(weapon));
    return availableWeapons[Math.floor(Math.random() * availableWeapons.length)];
}

export function rerollWeapon(state: Game.State) {
    if (state.rerollsLeft === null || state.rerollsLeft <= 0) {
        throw new Error('No rerolls left');
    }

    const newWeapon = getRandomWeapon(weaponList, state.pickedWeapons);
    state.pickedWeapons.push(newWeapon);
    state.rerollsLeft--;

    return {
        ...state,
        playerWeapon: newWeapon
    };
}

export function newRound(hasInit: boolean) {
    if (!hasInit) {
        throw new Error('Game not initialized');
    }

    return {
        playerWeapon: getRandomWeapon(weaponList, []),
        enemyWeapon: null,
        hasRound: true,
        hasFought: false,
        rerollsLeft: MAX_REROLLS,
        pickedWeapons: []
    }
}

const weaponDamagesValues: { [key in Game.Weapon['name']]: number | (() => number) } = {
    hatchet: 1,
    knife: 1,
    spear: 1,
    sword: 5,
    halberd: 5,
    bow: () => 1 * Math.floor(Math.random() * 5),
    crossbow: () => 2 * Math.floor(Math.random() * 5),
    darts: () => 1 * Math.floor(Math.random() * 3),
    dagger: 3
};

function calculateDamage(weapon: Game.Weapon | null): number {
    if (!weapon) {
        throw new Error('Invalid weapon')
    }

    const damage = weaponDamagesValues[weapon.name];
    return typeof damage === 'function' ? damage() : damage;
}

function calculateHealth(playerHealth: number, enemyHealth: number, playerDamages: number, enemyDamages: number): { playerHealth: number, enemyHealth: number } {
    if (playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    } else {
        playerHealth -= enemyDamages - playerDamages;
    }

    return {
        playerHealth: Math.max(playerHealth, 0),
        enemyHealth: Math.max(enemyHealth, 0)
    };
}

export function fight(playerHealth: number, enemyHealth: number, playerWeapon: Game.Weapon | null, hasInit: boolean, hasRound: boolean, hasFought: boolean): { playerHealth: number, enemyHealth: number, enemyWeapon: Game.Weapon, hasFought: boolean, playerWon: boolean, playerLost: boolean } {
    if (!hasInit) throw new Error('Game not initialized');
    if (!hasRound) throw new Error('Round not initialized');
    if (hasFought) throw new Error('Round already played');

    const playerDamages = calculateDamage(playerWeapon);
    const enemyWeapon = getRandomWeapon(weaponList, []);
    const enemyDamages = calculateDamage(enemyWeapon);

    const { playerHealth: newPlayerHealth, enemyHealth: newEnemyHealth } = calculateHealth(playerHealth, enemyHealth, playerDamages, enemyDamages);

    const playerWon = newEnemyHealth === 0;
    const playerLost = newPlayerHealth === 0;

    return {
        playerHealth: newPlayerHealth,
        enemyHealth: newEnemyHealth,
        enemyWeapon,
        hasFought: true,
        playerWon,
        playerLost
    };
}
