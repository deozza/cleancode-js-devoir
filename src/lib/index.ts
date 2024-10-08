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
    let playerWeaponRerolls = 0;

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
        playerLost,
        playerWeaponRerolls,
    };
}

export function newRound(hasInit: boolean) {
    if (hasInit) {
        return {
            playerWeapon: weaponList[Math.floor(Math.random() * weaponList.length)],
            enemyWeapon: null,
            hasRound: true,
            hasFought: false,
            playerWeaponRerolls: 0,
        };
    } else {
        throw new Error('Game not initialized');
    }
}

export function calculateDamage(
    playerDamage: number,
    enemyDamage: number
): { playerDamage: number; enemyDamage: number } {
    if (playerDamage > enemyDamage) {
        return { playerDamage: 0, enemyDamage: playerDamage - enemyDamage };
    } else if (playerDamage < enemyDamage) {
        return { playerDamage: enemyDamage - playerDamage, enemyDamage: 0 };
    } else {
        // Ex-aequo, les deux armes infligent les mêmes dégâts
        return { playerDamage: 0, enemyDamage: 0 };
    }
}

export function updateHealth(health: number, damage: number): number {
    health -= damage;
    return Math.max(health, 0);
}

export function updateGameState(
    playerHealth: number,
    enemyHealth: number,
    playerDamage: number,
    enemyDamage: number
): { playerHealth: number; enemyHealth: number; enemyWeapon: any } {
    const { playerDamage: playerDamageCalculated, enemyDamage: enemyDamageCalculated } =
        calculateDamage(playerDamage, enemyDamage);
    const updatedPlayerHealth = updateHealth(playerHealth, enemyDamageCalculated);
    const updatedEnemyHealth = updateHealth(enemyHealth, playerDamageCalculated);
    const enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    return { playerHealth: updatedPlayerHealth, enemyHealth: updatedEnemyHealth, enemyWeapon };
}

export function hasPlayerWon(enemyHealth: number): boolean {
    return enemyHealth === 0;
}

export function hasPlayerLost(playerHealth: number): boolean {
    return playerHealth === 0;
}

export function checkGameEnd(
    playerHealth: number,
    enemyHealth: number
): { playerWon: boolean; playerLost: boolean } {
    if (hasPlayerWon(enemyHealth)) {
        return { playerWon: true, playerLost: false };
    } else if (hasPlayerLost(playerHealth)) {
        return { playerWon: false, playerLost: true };
    }

    return { playerWon: false, playerLost: false };
}

export function calculateDamageForWeapons(
    playerWeapon: any,
    enemyWeapon: any
): { playerDamage: number; enemyDamage: number } {
    const playerDamage = getDamageForWeapon(playerWeapon);
    const enemyDamage = getDamageForWeapon(enemyWeapon);
    return { playerDamage, enemyDamage };
}

export function getDamageForWeapon(weapon: any): number {
    switch (weapon.name) {
        case 'hatchet':
        case 'knife':
        case 'spear':
            return 1;
        case 'sword':
        case 'halberd':
            return 5;
        case 'bow':
            return 1 * Math.floor(Math.random() * 5);
        case 'crossbow':
            return 2 * Math.floor(Math.random() * 5);
        case 'darts':
            return 1 * Math.floor(Math.random() * 3);
        case 'dagger':
            return 3;
        default:
            throw new Error('Invalid weapon');
    }
}

export function rerollWeapon(
    playerWeapon: any,
    playerWeaponRerolls: number,
    hasInit: boolean,
    hasRound: boolean
): { playerWeapon: any; playerWeaponRerolls: number } {
    if (hasInit && hasRound) {
        if (playerWeaponRerolls < 2) {
            let newWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
            while (newWeapon === playerWeapon) {
                newWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
            }
            return { playerWeapon: newWeapon, playerWeaponRerolls: playerWeaponRerolls + 1 };
        } else {
            throw new Error('Vous avez déjà réinitialisé votre arme deux fois ce tour.');
        }
    } else {
        throw new Error('Vous ne pouvez pas réinitialiser votre arme maintenant.');
    }
}

export function fight(
    playerHealth: number,
    enemyHealth: number,
    playerWeapon: any,
    hasInit: boolean,
    hasRound: boolean,
    hasFought: boolean,
    playerWeaponRerolls: number
): Array<number | boolean | any> {
    if (hasInit) {
        if (hasRound) {
            if (!hasFought) {
                const { playerDamage, enemyDamage } = calculateDamageForWeapons(
                    playerWeapon,
                    weaponList[Math.floor(Math.random() * weaponList.length)]
                );
                const {
                    playerHealth: updatedPlayerHealth,
                    enemyHealth: updatedEnemyHealth,
                    enemyWeapon,
                } = updateGameState(playerHealth, enemyHealth, playerDamage, enemyDamage);
                const { playerWon, playerLost } = checkGameEnd(updatedPlayerHealth, updatedEnemyHealth);
                return [
                    updatedPlayerHealth,
                    updatedEnemyHealth,
                    enemyWeapon,
                    true,
                    playerWon,
                    playerLost,
                    playerWeaponRerolls,
                ];
            } else {
                throw new Error('Round already played');
            }
        } else {
            throw new Error('Round not initialized');
        }
    } else {
        throw new Error('Game not initialized');
    }
}