
import weapons from './weaponList.json';

export let weaponList: any[] = [];

interface Weapon {
    name: string;
    description: string;
    rarity: string;
}

const maxRerolls = 2;

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
    let rerollCount = 0;

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
        rerollCount
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


export function rerollWeapon(rerollCount: number, maxRerolls: number, currentWeapon: Weapon): { newWeapon: Weapon, rerollCount: number } {
    let weaponList = weapons;
    
    if (rerollCount >= maxRerolls) {
        throw new Error('Maximum rerolls reached');
    }

    const currentWeaponIndex = weaponList.indexOf(currentWeapon);
    if (currentWeaponIndex > -1) {
        weaponList.splice(currentWeaponIndex, 1);
    }

    let newPickedWeapon = getRandomWeapon();
    while (newPickedWeapon === currentWeapon) {
        newPickedWeapon = getRandomWeapon();
    }
    

    rerollCount += 1;

    return {
        newWeapon: newPickedWeapon,
        rerollCount: rerollCount
    }
}



function checkGameState(hasInit: boolean, hasRound: boolean, hasFought: boolean): void {
    if(!hasInit) {
        throw new Error('Game not initialized');
    }
    if(!hasRound) {
        throw new Error('Round not initialized');
    }
    if(hasFought) {
        throw new Error('Round already played');
    }
}

function getRandomWeapon(): Weapon {
    weaponList = weapons;
    return weaponList[Math.floor(Math.random() * weaponList.length)];
}

function calculateDamagesWeapon(selectedWeapon: Weapon): number {
    if (!selectedWeapon.name) {
        throw new Error('No weapon detected');
    }
    const damageMap: { [key: string]: () => number } = {
        'bow': () => 1 * (Math.floor(Math.random() * 5)),
        'crossbow': () => 2 * (Math.floor(Math.random() * 5)),
        'dagger': () => 3,
        'darts': () => 1 * (Math.floor(Math.random() * 3)),
        'halberd': () => 5,
        'hatchet': () => 1,
        'knife': () => 1,
        'spear': () => 1,
        'sword': () => 5
    };

    const calculateDamage = damageMap[selectedWeapon.name];
    return calculateDamage();
}

function calculeHealthLost(playerDamages: number, enemyDamages: number, playerHealth: number, enemyHealth: number): {playerHealth: number, enemyHealth: number} {
    if(playerDamages === enemyDamages) {
        return {    
            playerHealth: playerHealth,
            enemyHealth: enemyHealth
        }
    }

    if(playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    } else {
        playerHealth -= enemyDamages - playerDamages;
    }

    return {
        playerHealth: Math.max(playerHealth, 0),
        enemyHealth: Math.max(enemyHealth, 0)
    }
}

function checkRoundWinner(playerHealth: number, enemyHealth: number): { playerWon: boolean, playerLost: boolean } {
    if(enemyHealth === 0) {
        return { playerWon: true, playerLost: false };
    }
    if(playerHealth === 0) {
        return { playerWon: false, playerLost: true };
    }

    return { playerWon: false, playerLost: false };
}


export function fight(playerHealth: number, enemyHealth: number, playerWeapon: Weapon, hasInit: boolean, hasRound: boolean, hasFought: boolean): [playerHealth: number, enemyHealth: number, enemyWeapon: Weapon, hasRound: boolean, playerWon: boolean, playerLost: boolean] {
    checkGameState(hasInit, hasRound, hasFought);
    let playerDamages:number = calculateDamagesWeapon(playerWeapon);
    let enemyWeapon: Weapon = getRandomWeapon();
    let enemyDamages: number = calculateDamagesWeapon(enemyWeapon);
    
    let roundHealthLost = calculeHealthLost(playerDamages, enemyDamages, playerHealth, enemyHealth);
    
    let roundWinner = checkRoundWinner(roundHealthLost.playerHealth, roundHealthLost.enemyHealth);

    return [
        roundHealthLost.playerHealth,
        roundHealthLost.enemyHealth,
        enemyWeapon, 
        true, 
        roundWinner.playerWon, 
        roundWinner.playerLost
    ];
}
