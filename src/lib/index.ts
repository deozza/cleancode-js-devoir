import type { State, Weapon, HealthPlayersStatus } from './IGame';
import weapons from './weaponList.json';

export let weaponList: Weapon[] = [];

export const GAME_CONSTANTS = {
    PLAYER_MAX_HEALTH: 10,
    ENEMY_MAX_HEALTH: 10,
    WEAPON_DAMAGES: {
        LIGHT: 1,
        MEDIUM: 3,
        HEAVY: 5
    },
    MAX_REROLLS: 2
} as const;

export function init(): State {
    weaponList = weapons;

    return {
        playerMaxHealth: GAME_CONSTANTS.PLAYER_MAX_HEALTH,
        playerCurrentHealth: GAME_CONSTANTS.PLAYER_MAX_HEALTH,
        enemyMaxHealth: GAME_CONSTANTS.ENEMY_MAX_HEALTH,
        enemyCurrentHealth: GAME_CONSTANTS.ENEMY_MAX_HEALTH,
        playerWeapon: getRandomWeapon(weaponList, []),
        enemyWeapon: null,
        hasInit: true,
        hasRound: true,
        hasFought: false,
        playerWon: false,
        playerLost: false,
        rerollsLeft: GAME_CONSTANTS.MAX_REROLLS,
        pickedWeapons: []
    };
}

function getRandomWeapon(weaponList: Weapon[], pickedWeapons: Weapon[]): Weapon {
    const availableWeapons = weaponList.filter(weapon => !pickedWeapons.includes(weapon));
    return availableWeapons[Math.floor(Math.random() * availableWeapons.length)];
}

export function rerollWeapon(currentState: State): State {
    if (currentState.rerollsLeft === null || currentState.rerollsLeft <= 0) {
        throw new Error('No rerolls left');
    }

    const newWeapon = getRandomWeapon(weaponList, currentState.pickedWeapons);
    currentState.pickedWeapons.push(newWeapon);
    currentState.rerollsLeft--;

    return {
        ...currentState,
        playerWeapon: newWeapon
    };
}

export function newRound(currentState: State): State {
    if (!currentState.hasInit) {
        throw new Error('Game not initialized');
    }

    return {
        ...currentState,
        playerWeapon: getRandomWeapon(weaponList, []),
        enemyWeapon: null,
        hasRound: true,
        hasFought: false,
        rerollsLeft: GAME_CONSTANTS.MAX_REROLLS,
        pickedWeapons: []
    }
}

const damageStrategies: Record<string, () => number> = {
    bow: () => GAME_CONSTANTS.WEAPON_DAMAGES.LIGHT * (Math.floor(Math.random() * 5)),
    crossbow: () => 2 * (Math.floor(Math.random() * 5)),
    dagger: () => GAME_CONSTANTS.WEAPON_DAMAGES.MEDIUM,
    darts: () => GAME_CONSTANTS.WEAPON_DAMAGES.LIGHT * (Math.floor(Math.random() * 3)),
    halberd: () => GAME_CONSTANTS.WEAPON_DAMAGES.HEAVY,
    hatchet: () => GAME_CONSTANTS.WEAPON_DAMAGES.LIGHT,
    knife: () => GAME_CONSTANTS.WEAPON_DAMAGES.LIGHT,
    spear: () => GAME_CONSTANTS.WEAPON_DAMAGES.LIGHT,
    sword: () => GAME_CONSTANTS.WEAPON_DAMAGES.HEAVY
};

function calculateDamage(weapon: Weapon | null): number {
    if (!weapon) {
        throw new Error('Invalid weapon');
    }

    const damage = damageStrategies[weapon.name];
    return damage();
}

function calculateHealth(playerHealth: number, enemyHealth: number, playerDamages: number, enemyDamages: number): HealthPlayersStatus {
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

function validateFightConditions(hasInit: boolean, hasRound: boolean, hasFought: boolean): void {
    if (!hasInit) throw new Error('Game not initialized');
    if (!hasRound) throw new Error('Round not initialized');
    if (hasFought) throw new Error('Round already played');
}

export function fight(currentState: State): State {
    validateFightConditions(currentState.hasInit, currentState.hasRound, currentState.hasFought);

    const playerDamages = calculateDamage(currentState.playerWeapon);
    currentState.enemyWeapon = getRandomWeapon(weaponList, []);

    const enemyDamages = calculateDamage(currentState.enemyWeapon);

    const { playerHealth, enemyHealth }: HealthPlayersStatus = calculateHealth(
        currentState.playerCurrentHealth ?? GAME_CONSTANTS.PLAYER_MAX_HEALTH,
        currentState.enemyCurrentHealth ?? GAME_CONSTANTS.ENEMY_MAX_HEALTH,
        playerDamages,
        enemyDamages
    );

    return {
        ...currentState,
        playerCurrentHealth: playerHealth,
        enemyCurrentHealth: enemyHealth,
        playerWon: enemyHealth === 0,
        playerLost: playerHealth === 0,
        hasFought: true
    };
}