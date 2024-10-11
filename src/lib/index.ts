import weapons from './weaponList.json';

export let weaponList: any[] = [];
const WeaponsWithOneDommage = 1;
const WeaponsWithFiveDommage = 5;
const WeaponsWithTwoDommage = 2;
const WeaponsWithThreeDommage = 3;

export interface ResultFight {
    playerHealth: number;
    enemyHealth: number;
    enemyWeapon?: any;
    gameOver: boolean;
    playerWon?: boolean;
    playerLost?: boolean;
}

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
    };
}

export function newRound(hasInit: boolean) {
    if (hasInit) {
        weaponList = weapons;

        return {
            playerWeapon: weaponList[Math.floor(Math.random() * weaponList.length)],
            enemyWeapon: null,
            hasRound: true,
            hasFought: false
        };
    } else {
        throw new Error('Game not initialized');
    }
}

const weaponDamageMap: Record<string, number | ((weapon: any) => number)> = {
    'hatchet': WeaponsWithOneDommage,
    'knife': WeaponsWithOneDommage,
    'spear': WeaponsWithOneDommage,
    'sword': WeaponsWithFiveDommage,
    'halberd': WeaponsWithFiveDommage,
    'bow': (weapon) => WeaponsWithOneDommage * Math.floor(Math.random() * 5),
    'crossbow': (weapon) => WeaponsWithTwoDommage * Math.floor(Math.random() * 5),
    'darts': (weapon) => WeaponsWithOneDommage * Math.floor(Math.random() * 3),
    'dagger': WeaponsWithThreeDommage
};

function calculateDamage(weapon: any): number {
    const damage = weaponDamageMap[weapon.name];
    return typeof damage === 'function' ? damage(weapon) : damage ?? 0;
}

function updateHealth(playerHealth: number, enemyHealth: number, playerDamages: number, enemyDamages: number): [number, number] {
    if (playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    } else {
        playerHealth -= enemyDamages - playerDamages;
    }

    return [Math.max(playerHealth, 0), Math.max(enemyHealth, 0)];
}

function checkGameStatus(playerHealth: number, enemyHealth: number, enemyWeapon: any): ResultFight {
    const gameOver = playerHealth === 0 || enemyHealth === 0;
    const playerWon = enemyHealth === 0;
    const playerLost = playerHealth === 0;
    
    return {
        playerHealth,
        enemyHealth,
        enemyWeapon,
        gameOver,
        playerWon,
        playerLost
    };
}

export function fight(playerHealth: number, enemyHealth: number, playerWeapon: any, hasInit: boolean, hasRound: boolean, hasFought: boolean): ResultFight {
    if (!hasInit) throw new Error('Game not initialized');
    if (!hasRound) throw new Error('Round not initialized');
    if (hasFought) throw new Error('Round already played');

    const playerDamages = calculateDamage(playerWeapon);
    
    weaponList = weapons;
    const enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    const enemyDamages = calculateDamage(enemyWeapon);

    [playerHealth, enemyHealth] = updateHealth(playerHealth, enemyHealth, playerDamages, enemyDamages);

    return checkGameStatus(playerHealth, enemyHealth, enemyWeapon);
}
