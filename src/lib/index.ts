import weapons from './weaponList.json';

export let weaponList: any[] = [];

export function init() {
    weaponList = weapons;
    let playerMaxHealth = 10;
    let playerCurrentHealth = 10;
    let enemyMaxHealth = 10;
    let enemyCurrentHealth = 10;
    let playerWeapon = weaponList[Math.floor(Math.random() * weaponList.length)] || { name: 'Unknown', description: 'No weapon' };
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
            enemyWeapon:null,
            hasRound: true,
            hasFought: false
        };
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
    rerollCount: number;
}

const BOW_MULTIPLIER = 5;
const CROSSBOW_MULTIPLIER = 5;
const DARTS_MULTIPLIER = 3;
const MAX_REROLL = 2;

const weaponDamageMap: Record<string, number | (() => number)> = {
    'hatchet': 1,
    'knife': 1,
    'spear': 1,
    'sword': 5,
    'halberd': 5,
    'bow': () => Math.floor(Math.random() * BOW_MULTIPLIER),
    'crossbow': () => 2 * Math.floor(Math.random() * CROSSBOW_MULTIPLIER),
    'darts': () => Math.floor(Math.random() * DARTS_MULTIPLIER),
    'dagger': 3
};
function calculateDamage(weapon: Weapon): number {
    const damage = weaponDamageMap[weapon.name];
    if (damage === undefined) {
        throw new Error('Arme invalide');
    }
    return typeof damage === 'number' ? damage : damage();
}

function updateHealth(
    playerHealth: number,
    enemyHealth: number,
    playerDamages: number,
    enemyDamages: number
): [number, number] {
    if (playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    } else {
        playerHealth -= enemyDamages - playerDamages;
    }
    return [Math.max(0, playerHealth), Math.max(0, enemyHealth)];
}
export function rerollWeapon(
    currentWeapon: Weapon,
    weaponList: Weapon[],
    usedWeapons: Set<string>,
    rerollCount: number
): { newWeapon: Weapon; updatedRerollCount: number } {
    if (rerollCount >= MAX_REROLL) {
        throw new Error('Nombre maximum de relances atteint');
    }
    const availableWeapons = weaponList.filter(
        (weapon) => !usedWeapons.has(weapon.name)
    );
    if (availableWeapons.length === 0) {
        throw new Error('Plus d\'armes disponibles pour la relance');
    }
    weaponList = weapons;
    const newWeapon = availableWeapons[Math.floor(Math.random() * availableWeapons.length)];
    usedWeapons.add(newWeapon.name);

    return { newWeapon, updatedRerollCount: rerollCount + 1 };
}
export function resolveCombatRound(
    playerHealth: number,
    enemyHealth: number,
    playerWeapon: Weapon,
    hasInit: boolean,
    hasRound: boolean,
    hasFought: boolean,
    weaponList: Weapon[],
    usedWeapons: Set<string>,
    rerollCount: number = 0
): FightResult {
    if (!hasInit) {
        throw new Error('La partie n\'est pas initialisée');
    }
    if (!hasRound) {
        throw new Error('Le round n\'est pas initialisé');
    }
    if (hasFought) {
        throw new Error('Le round a déjà été joué');
    }

    usedWeapons.add(playerWeapon.name);

    const playerDamages = calculateDamage(playerWeapon);
    weaponList = weapons;
    const enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    const enemyDamages = calculateDamage(enemyWeapon);

    const [updatedPlayerHealth, updatedEnemyHealth] = updateHealth(
        playerHealth,
        enemyHealth,
        playerDamages,
        enemyDamages
    );

    const hasWon = updatedEnemyHealth === 0;
    const hasLost = updatedPlayerHealth === 0;
    const roundContinues = !hasWon && !hasLost;
    return {
        playerHealth: updatedPlayerHealth,
        enemyHealth: updatedEnemyHealth,
        enemyWeapon,
        hasWon,
        hasLost,
        roundContinues,
        rerollCount
    };
}
