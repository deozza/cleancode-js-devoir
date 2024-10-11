import weapons from './weaponList.json';

export let weaponList: any[] = [];

export interface GameStatus {
    RoundInit: boolean;
    RoundActive: boolean;
    RoundPlayed: boolean;
}

let playerMaxHealth = 10;
let playerCurrentHealth = 10;
let enemyMaxHealth = 10;
let enemyCurrentHealth = 10;

export function init(): {playerMaxHealth : number, playerCurrentHealth : number, enemyCurrentHealth : number, enemyMaxHealth: number, playerWeapon : any, enemyWeapon : any, GameStatus : GameStatus} {
    weaponList = weapons;
    let playerWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    let enemyWeapon = null;
    return {
        playerMaxHealth,
        playerCurrentHealth,
        enemyMaxHealth,
        enemyCurrentHealth,
        playerWeapon,
        enemyWeapon,
        GameStatus:{
            RoundInit: true,
            RoundActive : true,
            RoundPlayed : false,
        }
    };
}

export function newRound(GameStatus: GameStatus): {playerWeapon: any, enemyWeapon: any, GameStatus: GameStatus} {
    if(!GameStatus.RoundInit) {
        throw new Error("Game not initialized");
    }
    weaponList = weapons;
    return {
        playerWeapon: weaponList[Math.floor(Math.random() * weaponList.length)],
        enemyWeapon: null,
        GameStatus: {
            ...GameStatus,
            RoundActive: true,
            RoundPlayed: false,
        }
    };
}

export function calculateDamage(weaponName: string): number {
    const weaponDamageMap: { [key: string]: (randomFactor?: number) => number } = {
        hatchet: () => 1,
        knife: () => 1,
        spear: () => 1,
        sword: () => 5,
        halberd: () => 5,
        bow: () => 1 * Math.floor(Math.random() * 5),
        crossbow: () => 2 * Math.floor(Math.random() * 5),
        darts: () => 1 * Math.floor(Math.random() * 3),
        dagger: () => 3,
    };
    const Damage = weaponDamageMap[weaponName];
    if (Damage) {
        return Damage();
    }
    throw new Error('Invalid weapon');
}

export function updateHealth(playerHealth: number, enemyHealth: number, playerDamages: number, enemyDamages: number): { updatedPlayerHealth: number, updatedEnemyHealth: number } {
    enemyHealth = Math.max(0, enemyHealth - Math.max(0, playerDamages - enemyDamages));
    playerHealth = Math.max(0, playerHealth - Math.max(0, enemyDamages - playerDamages));

    return { updatedPlayerHealth: playerHealth, updatedEnemyHealth: enemyHealth };
}

function GetEnemyWeapon() {
    return weaponList[Math.floor(Math.random() * weaponList.length)];
}

export function fight(playerHealth: number, enemyHealth: number, playerWeapon: any, GameStatus: GameStatus): Array<number | boolean> {
    if (!GameStatus.RoundInit) {
        throw new Error('Game not initialized');
    }
    if (!GameStatus.RoundActive) {
        throw new Error('Round not initialized');
    }
    if (GameStatus.RoundPlayed) {
        throw new Error('Round already played');
    }            
    const playerDamages = calculateDamage(playerWeapon.name);
    const enemyWeapon = GetEnemyWeapon();
    const enemyDamages = calculateDamage(enemyWeapon.name);
    const { updatedPlayerHealth, updatedEnemyHealth } = updateHealth(playerHealth, enemyHealth, playerDamages, enemyDamages);
    // Vérification des conditions de victoire ou de défaite
    if (updatedEnemyHealth === 0) {
        return [updatedPlayerHealth, updatedEnemyHealth, enemyWeapon, true, true, false];
    }
    if (updatedPlayerHealth === 0) {
        return [updatedPlayerHealth, updatedEnemyHealth, enemyWeapon, true, false, true];
    }
    GameStatus.RoundPlayed = true;
    return [updatedPlayerHealth, updatedEnemyHealth, enemyWeapon, true, false, false];
}
