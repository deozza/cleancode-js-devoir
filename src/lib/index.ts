import weapons from './weaponList.json';

export let weaponList: any[] = [];

const INITIAL_PLAYER_HEALTH = 10;
const INITIAL_ENEMY_HEALTH = 10;

// damage for each weapon
const weaponDamage: { [key: string]: number | ((() => number)) } = {
    'hatchet': 1,
    'knife': 1,
    'spear': 1,
    'sword': 5,
    'halberd': 5,
    'bow': () => 1 * (Math.floor(Math.random() * 5)),
    'crossbow': () => 2 * (Math.floor(Math.random() * 5)),
    'darts': () => 1 * (Math.floor(Math.random() * 3)),
    'dagger': 3,
};

export function init() {
    weaponList = weapons;

    let playerMaxHealth = INITIAL_PLAYER_HEALTH;
    let playerCurrentHealth = INITIAL_PLAYER_HEALTH;
    let enemyMaxHealth = INITIAL_ENEMY_HEALTH;
    let enemyCurrentHealth = INITIAL_ENEMY_HEALTH;
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

export function fight(playerHealth: number, enemyHealth: number, playerWeapon: any, hasInit: boolean, hasRound: boolean, hasFought: boolean): Array<number | boolean | any> {

    if (!hasInit) throw new Error('Game not initialized');
    if (!hasRound) throw new Error('Round not initialized');
    if (hasFought) throw new Error('Round already played');

    // function for calculating damage
    function calculateDamage(weapon: any): number {
        const damage = weaponDamage[weapon.name];
        return typeof damage === 'function' ? damage() : damage;
    }

    // get a random weapon for the enemy
    let enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];

    // calculate damages for player and enemy
    let playerDamages = calculateDamage(playerWeapon);
    let enemyDamages = calculateDamage(enemyWeapon);

    if (playerDamages === enemyDamages) {
        return [playerHealth, enemyHealth, enemyWeapon, true, false, false];
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

    if (enemyHealth <= 0) {
        enemyHealth = 0;
    }

    // check if the game is over and the player has won
    if (enemyHealth === 0) {
        return [playerHealth, enemyHealth, enemyWeapon, true, true, false];
    }

    if (playerHealth === 0) {
        return [playerHealth, enemyHealth, enemyWeapon, true, false, true];
    }

    return [playerHealth, enemyHealth, enemyWeapon, true, false, false];
}
