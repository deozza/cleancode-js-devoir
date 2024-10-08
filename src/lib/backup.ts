import weapons from './weaponList.json';

export let weaponList: any[] = [];

export function init() {
    weaponList = weapons;


    let playerMaxHealth = 10;
    let playerCurrentHealth = 10;
    let enemyMaxHealth = 10;
    let enemyCurrentHealth = 10;
    let weapon = weaponList[Math.floor(Math.random() * weaponList.length)];
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
        weapon,
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
            weapon: weaponList[Math.floor(Math.random() * weaponList.length)],
            enemyWeapon: null,
            hasRound: true,
            hasFought: false
        }
    } else {
        throw new Error('Game not initialized');
    }
}

export function fight(playerHealth: number, enemyHealth: number, weapon: any, hasInit: boolean, hasRound: boolean, hasFought: boolean): Array<number|boolean> {
    
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

    // reset weapon list so the enemy could play
    roundAttack(weapon,playerDamages,enemyDamages)

    if(playerDamages === enemyDamages) {
        return [playerHealth, enemyHealth];
    }

    if(playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    } else {
        playerHealth -= enemyDamages - playerDamages;
    }

    // health cannot be negative
    if(playerHealth <= 0) {
        playerHealth = 0;
    }

    // health cannot be negative
    if(enemyHealth <= 0) {
        enemyHealth = 0;
    }
    
    // check if the game is over and the player has won
    if(enemyHealth === 0) {
        return [playerHealth, enemyHealth, enemyWeapon, true, true, false];
    }

    // check if the game is over and the player has lost
    if(playerHealth === 0) {
        return [playerHealth, enemyHealth, enemyWeapon, true, false, true];
    }

    return [playerHealth, enemyHealth, enemyWeapon, true, false, false];

}

function roundAttack(weapon: any, playerDamages: number, enemyDamages: number): void{

    weaponList = weapons;

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

    let round: number = 0;

    let arrayDamage: Array = [];

    const weaponName = weapon.name;

    do{
        if (Object.prototype.hasOwnProperty.call(fixedDamages, weaponName)) {
            // playerDamages += fixedDamages[weaponName];
            arrayDamage.push(fixedDamages[weaponName]);
        } else if (Object.prototype.hasOwnProperty.call(randomDamages, weaponName)) {
            // playerDamages += randomDamages[weaponName]();
            arrayDamage.push(randomDamages[weaponName]);
        } else {
            throw new Error('Invalid weapon');
        }
    } while (round != 2){
        round++
    }

    enemyDamages += arrayDamage[0];
    playerDamages += arrayDamage[1];
    
}
