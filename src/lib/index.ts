
import weapons from './weaponList.json';

export let weaponList: any[] = [];

export function init() {
    weaponList = weapons;

    let playerMaxHealth = 10;
    let playerCurrentHealth = 10;
    let enemyMaxHealth = 10;
    let enemyCurrentHealth = 10;
    let playerWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    let enemyWeapon = null;
    let hasInit = true;
    let hasRound = true;
    let hasFought = false;
    let playerWon = false;
    let playerLost = false;
    weaponList = weapons;

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

export function newRound(hasInit: boolean) {
    if(hasInit) {
        weaponList = weapons;

        return {
            playerWeapon: weaponList[Math.floor(Math.random() * weaponList.length)],
            enemyWeapon: null,
            hasRound: true,
            hasFought: false
        }
    } else {
        throw new Error('Game not initialized');
    }
}

interface Weapon {
    name: string;
}

interface FightResult {
    playerHealth: number;
    enemyHealth: number;
    enemyWeapon: Weapon;
    hasWon: boolean;
    hasLost: boolean;
    roundContinues: boolean;
}

const BASE_DAMAGE = 1;
const SWORD_DAMAGE = 5;
const BOW_MULTIPLIER = 5;
const CROSSBOW_MULTIPLIER = 5;
const DARTS_MULTIPLIER = 3;

function calculateDamage(weapon: Weapon): number {
    switch (weapon.name) {
        case 'hatchet':
        case 'knife':
        case 'spear':
            return BASE_DAMAGE;
        case 'sword':
        case 'halberd':
            return SWORD_DAMAGE;
        case 'bow':
            return Math.floor(Math.random() * BOW_MULTIPLIER);
        case 'crossbow':
            return 2 * Math.floor(Math.random() * CROSSBOW_MULTIPLIER);
        case 'darts':
            return Math.floor(Math.random() * DARTS_MULTIPLIER);
        case 'dagger':
            return 3;
        default:
            throw new Error('Invalid weapon');
    }
}

function updateHealth(playerHealth: number, enemyHealth: number, playerDamages: number, enemyDamages: number): [number, number] {
    if (playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    } else {
        playerHealth -= enemyDamages - playerDamages;
    }
    return [Math.max(0, playerHealth), Math.max(0, enemyHealth)];
}

export function resolveCombatRound(
    playerHealth: number,
    enemyHealth: number,
    playerWeapon: Weapon,
    hasInit: boolean,
    hasRound: boolean,
    hasFought: boolean,
    weaponList: Weapon[]
): FightResult {
    if (!hasInit) {
        throw new Error('Game not initialized');
    }
    if (!hasRound) {
        throw new Error('Round not initialized');
    }
    if (hasFought) {
        throw new Error('Round already played');
    }

    const playerDamages = calculateDamage(playerWeapon);

    const enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    const enemyDamages = calculateDamage(enemyWeapon);

    const [updatedPlayerHealth, updatedEnemyHealth] = updateHealth(playerHealth, enemyHealth, playerDamages, enemyDamages);

    const hasWon = updatedEnemyHealth === 0;
    const hasLost = updatedPlayerHealth === 0;
    const roundContinues = !hasWon && !hasLost;

    return {
        playerHealth: updatedPlayerHealth,
        enemyHealth: updatedEnemyHealth,
        enemyWeapon,
        hasWon,
        hasLost,
        roundContinues
    };
}

