
import weapons from './weaponList.json';

export let weaponList: any[] = [];

export function init() {
    weaponList = weapons;


    let playerMaxHealth = 10;
    let playerCurrentHealth = 10;
    let enemyMaxHealth = 10;
    let enemyCurrentHealth = 10;
    let playerWeapon = chooseWeapon();
    let enemyWeapon = null;
    let hasInit = true;
    let hasRound = true;
    let hasFought = false;
    let playerWon = false;
    let playerLost = false;
    let hasReloaded = false;

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
        playerLost,
        hasReloaded
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
    try {
        checkInitialConditions(hasInit, hasRound, hasFought);
        let playerDamages = calculateDamage(playerWeapon.name);
        let enemyWeapon = chooseWeapon()
        let enemyDamages = calculateDamage(enemyWeapon.name);

        [playerHealth, enemyHealth] = changingHealthPoint(playerHealth, enemyHealth, playerDamages, enemyDamages);

        return checkIfOver(playerHealth, enemyHealth, enemyWeapon);
    }
    catch(e: any) {
        throw new Error(e.message);
    }
}


export function checkInitialConditions(hasInit: boolean, hasRound: boolean, hasFought: boolean): void {
    if (!hasInit) {
        throw new Error('Game not initialized');
    }
    if (!hasRound) {
        throw new Error('Round not started');
    }
    if (hasFought) {
        throw new Error('Already fought this round');
    }
}


export function calculateDamage(weapon: string): number {
    const weaponDamageMap: { [key: string]: number | (() => number) } = {
        'hatchet': 1,
        'knife': 1,
        'spear': 1,
        'sword': 5,
        'halberd': 5,
        'bow': () => 1 * (Math.floor(Math.random() * 5)),
        'crossbow': () => 2 * (Math.floor(Math.random() * 5)),
        'darts': () => 1 * (Math.floor(Math.random() * 3)),
        'dagger': 3
    };

    const damage = weaponDamageMap[weapon];
    if (damage === undefined) {
        throw new Error('Invalid weapon');
    }

    return typeof damage === 'function' ? damage() : damage;
}

export function changingHealthPoint(playerHealth: number, enemyHealth: number, playerDamages: number, enemyDamages: number): Array<number> {
    if(playerDamages === enemyDamages) {
        return [playerHealth, enemyHealth];
    }
            
    if(playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    } else {
        playerHealth -= enemyDamages - playerDamages;
    }
           
    if(playerHealth <= 0) {
        playerHealth = 0;
    }
            
    if(enemyHealth <= 0) {
        enemyHealth = 0;
    }
    return [playerHealth, enemyHealth];
}

export function checkIfOver(playerHealth: number, enemyHealth: number, enemyWeapon: any): any {
    if(enemyHealth === 0) {
        return [playerHealth, enemyHealth, enemyWeapon, true, true, false, false];
    }

    if(playerHealth === 0) {
        return [playerHealth, enemyHealth, enemyWeapon, true, false, true, false];
    }        
    return [playerHealth, enemyHealth, enemyWeapon, true, false, false, false];
}

export function chooseWeapon(): any {
    if(weaponList.length === 0) {
        throw new Error('No weapons available');
    }
    return weaponList[Math.floor(Math.random() * weaponList.length)];
}

export function reloadWeapon(userWeapon : any) : any{
    try {
        let newWeapon = chooseWeapon();
        if(newWeapon.name === userWeapon.name) {
            return reloadWeapon(userWeapon);
        }
        return chooseWeapon();
    }
    catch(e) {
        throw new Error('No weapons available')
    }
}