import weapons from './weaponList.json';

interface Weapon {
    name: string;
    damage: number | [number, number];
    description: string;
    rarity: string;
}

interface GameState {
    playerMaxHealth: number;
    playerCurrentHealth: number;
    enemyMaxHealth: number;
    enemyCurrentHealth: number;
    playerWeapon: Weapon | null;
    enemyWeapon: Weapon | null;
    availableWeapons: Weapon[];
    weaponRerollsLeft: number;
    hasInit: boolean;
    hasRound: boolean;
    hasFought: boolean;
    playerWon: boolean;
    playerLost: boolean;
}

const MAX_HEALTH = 10;
const MAX_WEAPON_REROLLS = 2;
const weaponList: Weapon[] = weapons;

export function init(): GameState {
    return {
        playerMaxHealth: MAX_HEALTH,
        playerCurrentHealth: MAX_HEALTH,
        enemyMaxHealth: MAX_HEALTH,
        enemyCurrentHealth: MAX_HEALTH,
        playerWeapon: selectRandomWeapon(weaponList),
        enemyWeapon: null,
        availableWeapons: [...weaponList],
        weaponRerollsLeft: MAX_WEAPON_REROLLS,
        hasInit: true,
        hasRound: true,
        hasFought: false,
        playerWon: false,
        playerLost: false
    };
}

export function newRound(hasInit: boolean): { playerWeapon: Weapon; enemyWeapon: null; hasRound: boolean; hasFought: boolean } {
    if (!hasInit) {
        throw new Error('Game not initialized');
    }
    return {
        playerWeapon: selectRandomWeapon(weaponList),
        enemyWeapon: null,
        hasRound: true,
        hasFought: false
    };
}

export function rerollPlayerWeapon(gameState: GameState): GameState {
    if (gameState.weaponRerollsLeft <= 0) {
        throw new Error('No weapon rerolls left');
    }

    const newWeapon = selectRandomWeapon(gameState.availableWeapons.filter(w => w !== gameState.playerWeapon));
    const updatedAvailableWeapons = gameState.availableWeapons.filter(w => w !== newWeapon);

    return {
        ...gameState,
        playerWeapon: newWeapon,
        availableWeapons: updatedAvailableWeapons,
        weaponRerollsLeft: gameState.weaponRerollsLeft - 1
    };
}

export function fight(playerHealth: number, enemyHealth: number, playerWeapon: Weapon, hasInit: boolean, hasRound: boolean, hasFought: boolean): [number, number, Weapon | null, boolean, boolean, boolean] {
    if (!hasInit) {
        throw new Error('Game not initialized');
    }
    if (!hasRound) {
        throw new Error('Round not initialized');
    }
    if (hasFought) {
        throw new Error('Round already played');
    }

    const enemyWeapon = selectRandomWeapon(weaponList);
    const playerDamage = calculateWeaponDamage(playerWeapon);
    const enemyDamage = calculateWeaponDamage(enemyWeapon);

    if (playerDamage > enemyDamage) {
        enemyHealth -= playerDamage - enemyDamage;
    } else if (enemyDamage > playerDamage) {
        playerHealth -= enemyDamage - playerDamage;
    }

    playerHealth = Math.max(playerHealth, 0);
    enemyHealth = Math.max(enemyHealth, 0);

    const playerWon = enemyHealth === 0;
    const playerLost = playerHealth === 0;

    return [playerHealth, enemyHealth, enemyWeapon, true, playerWon, playerLost];
}

function selectRandomWeapon(availableWeapons: Weapon[]): Weapon {
    return availableWeapons[Math.floor(Math.random() * availableWeapons.length)];
}

function calculateWeaponDamage(weapon: Weapon): number {
    if (Array.isArray(weapon.damage)) {
        const [min, max] = weapon.damage;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return weapon.damage;
}