
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

export function fight(playerHealth: number, enemyHealth: number, playerWeapon: any, hasInit: boolean, hasRound: boolean, hasFought: boolean): Array<number|boolean | any> {
    
    if (!hasInit) throw new Error('Game not initialized');
    if (!hasRound) throw new Error('Round not initialized');
    if (hasFought) throw new Error('Round already played');
                
    
    let playerDamages: number = 0;
    let enemyDamages: number = 0;

            
    // Initialisation de l'arme de l'ennemi
    let enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];


    function calculateDamage(weapon: any): number {
        switch (weapon.name) {
            case 'hatchet':
            case 'knife':
            case 'spear':
                return 1;
            case 'sword':
            case 'halberd':
                return 5;
            case 'bow':
                return 1 * (Math.floor(Math.random() * 5));
            case 'crossbow':
                return 2 * (Math.floor(Math.random() * 5));
            case 'darts':
                return 1 * (Math.floor(Math.random() * 3));
            case 'dagger':
                return 3;
            default:
                throw new Error('Invalid weapon');
        }
    }    

    // calculate damages for player and enemy
    playerDamages = calculateDamage(playerWeapon);
    enemyDamages = calculateDamage(enemyWeapon);

    if (playerDamages === enemyDamages) {
        return [playerHealth, enemyHealth, enemyWeapon, true, false, false];
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
