import weapons from './weaponList.json';

interface Weapon {
    name: string;
}

interface FightResult {
    playerHealth: number;
    enemyHealth: number;
    enemyWeapon: Weapon;
    hasWon: boolean;
    hasLost: boolean;
    roundPlayed: boolean;
}

let weaponList: Weapon[] = [];

export function init() {
    weaponList = weapons;

    const initialHealth = 10;
    const playerWeapon = getRandomWeapon();

    return {
        playerMaxHealth: initialHealth,
        playerCurrentHealth: initialHealth,
        enemyMaxHealth: initialHealth,
        enemyCurrentHealth: initialHealth,
        playerWeapon,
        enemyWeapon: null,
        gameStatus: 'initialized'
    };
}

export function newRound() {
    weaponList = weapons;

    const playerWeapon = getRandomWeapon();

    return {
        playerWeapon,
        enemyWeapon: null,
        gameStatus: 'round_started'
    };
}

export function fight(
    playerHealth: number,
    enemyHealth: number,
    playerWeapon: Weapon
): FightResult {
    const playerDamage = calculateDamage(playerWeapon);
    const enemyWeapon = getRandomWeapon();
    const enemyDamage = calculateDamage(enemyWeapon);

    playerHealth -= Math.max(0, enemyDamage - playerDamage);
    enemyHealth -= Math.max(0, playerDamage - enemyDamage);

    playerHealth = Math.max(0, playerHealth);
    enemyHealth = Math.max(0, enemyHealth);

    return {
        playerHealth,
        enemyHealth,
        enemyWeapon,
        hasWon: enemyHealth === 0,
        hasLost: playerHealth === 0,
        roundPlayed: true,
    };
}

function calculateDamage(weapon: Weapon): number {
    const damageMapping: { [key: string]: number | (() => number) } = {
        'hatchet': 1,
        'knife': 1,
        'spear': 1,
        'sword': 5,
        'halberd': 5,
        'bow': () => Math.floor(Math.random() * 5),
        'crossbow': () => 2 * Math.floor(Math.random() * 5),
        'darts': () => Math.floor(Math.random() * 3),
        'dagger': 3
    };

    const damageValue = damageMapping[weapon.name];
    if (typeof damageValue === 'function') {
        return damageValue();
    } else if (damageValue !== undefined) {
        return damageValue;
    }

    throw new Error(`Arme invalide : ${weapon.name}`);
}

function getRandomWeapon(): Weapon {
    return weaponList[Math.floor(Math.random() * weaponList.length)];
}
