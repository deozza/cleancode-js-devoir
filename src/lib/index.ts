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

export function fight(playerHealth: number, enemyHealth: number, playerWeapon: any, hasInit: boolean, hasRound: boolean, hasFought: boolean): Array<number|boolean> {
    
    if(!hasInit){
        throw new Error('Game not initialized');
    }

    if(!hasRound){
        throw new Error('Round not initialized');
    }

    if(hasFought){
        throw new Error('Round already played');
    }

    let playerDamages: number = 0;
    let enemyDamages: number = 0;

    const fixedDamages: { [key: string]: number } = {
        'hatchet': 1,
        'knife': 1,
        'spear': 1,
        'dagger': 3,
        'sword': 5,
        'halberd': 5
    };

    const randomDamages: { [key: string]: () => number } = {
        'bow': () => Math.floor(Math.random() * 5),
        'crossbow': () => 2 * Math.floor(Math.random() * 5),
        'darts': () => Math.floor(Math.random() * 3)
    };

    const weaponName = playerWeapon.name;

    if (Object.prototype.hasOwnProperty.call(fixedDamages, weaponName)) {
        playerDamages += fixedDamages[weaponName];
    } else if (Object.prototype.hasOwnProperty.call(randomDamages, weaponName)) {
        playerDamages += randomDamages[weaponName]();
    } else {
        throw new Error('Invalid weapon');
    }

    weaponList = weapons;

    let enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    const weaponName2 = enemyWeapon.name;

    if (Object.prototype.hasOwnProperty.call(fixedDamages, weaponName2)) {
        enemyDamages += fixedDamages[weaponName2];
    } else if (Object.prototype.hasOwnProperty.call(randomDamages, weaponName2)) {
        enemyDamages += randomDamages[weaponName2]();
    } else {
        throw new Error('Invalid weapon');
    }

    weaponList = weapons;


    damagePriority(playerDamages, enemyDamages, playerHealth, enemyHealth)

    playerHealth = healthNonNegative(playerHealth);
    enemyHealth = healthNonNegative(enemyHealth);
    
    gameStatus(playerHealth,enemyHealth,playerWeapon,hasRound)
}

function healthNonNegative(health: number): number {
    if (health < 0) {
        return 0;
    }
    return health;
}

function gameStatus(playerHealth: number, enemyHealth: number, playerWeapon: any, hasInit: boolean): Array<number|boolean>{
    let playerWon = false;
    let playerLost = false;

    if(enemyHealth === 0) {
        playerWon = true;
    } else if(playerHealth === 0) {
        playerLost = true;
    }

    return[playerHealth,enemyHealth,playerWeapon,hasInit,playerWon,playerLost]
}

function damagePriority(playerDamages: number,enemyDamages: number,enemyHealth: number, playerHealth: number): any{
    if(playerDamages === enemyDamages) {
        return [playerHealth, enemyHealth];
    } else if (playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    } else {
        playerHealth -= enemyDamages - playerDamages;
    }

    return '';
}