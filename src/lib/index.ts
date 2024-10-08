
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

export function damage(weapon: any): number{
        
    let damageInflicted: number = 0;
    switch (weapon.name) {
        case 'hatchet':
        case 'knife':
        case 'spear':
            damageInflicted += 1;
            break;
        case 'sword':
        case 'halberd': 
            damageInflicted += 5;
            break;
        case 'bow':
            damageInflicted += 1 * (Math.floor(Math.random() * 5));
            break;
        case 'crossbow':
            damageInflicted += 2 * (Math.floor(Math.random() * 5));
            break
        case 'darts':
            damageInflicted += 1 * (Math.floor(Math.random() * 3));
            break;
        case 'dagger':
            damageInflicted += 3;
            break;
        default:
            throw new Error('Invalid weapon');
    }
    return damageInflicted;

}

export function resetWeapon(): Array<any>{
    return weaponList = weapons;
}

export function setHealthToValid(health: number): number{
    if(health <= 0) {
        health = 0;
    }
    return health
}

export function gameIsOver(playerHealth: number, enemyHealth: number){
    if(enemyHealth === 0 || playerHealth === 0) {
        console.log("Game is over");
        return true;
    }
}


export function fight(playerHealth: number, enemyHealth: number, playerWeapon: any, enemyWeapon: any, hasInit: boolean, hasRound: boolean, hasFought: boolean): Array<number|boolean> {
    
    if(hasInit){
        if(hasRound){
            if(!hasFought) {

                console.log('fight starts')

                damage(playerWeapon);
                resetWeapon();
                damage(enemyWeapon);

                if(damage(playerWeapon) === damage(enemyWeapon)){
                    return [playerHealth, enemyHealth]
                }
            
                if(damage(playerWeapon) > damage(enemyWeapon)) {
                    enemyHealth -= damage(playerWeapon);
                } else {
                    playerHealth -= damage(enemyWeapon);
                }
           

            
                setHealthToValid(playerHealth);
                setHealthToValid(enemyHealth);
                
                gameIsOver(playerHealth, enemyHealth);
                return [playerHealth, enemyHealth, enemyWeapon, true, false, false];

            }else{
                throw new Error('Round already played');
            }
        }else{
            throw new Error('Round not initialized');
        }
    }else{
        throw new Error('Game not initialized');
    }


}
