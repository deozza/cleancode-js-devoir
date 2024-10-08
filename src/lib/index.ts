
import weapons from './weaponList.json';

export let weaponList: any[] = [];
export let hasInit= true;
export let hasRound= true;
export let playerWeapon: any
export let enemyWeapon: any;
export let playerCurrentHealth = 10;
export let enemyCurrentHealth = 10;
let playerDamages: number = 0;
let enemyDamages: number = 0;

export function init() {
    weaponList = weapons;

    let playerMaxHealth = 10;
    let playerCurrentHealth = 10;
    let enemyMaxHealth = 10;
    let enemyCurrentHealth = 10;
    let playerWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    let enemyWeapon = null;
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

export function resetList(){
    weaponList = weapons;
}

export function randomWeaponPick(){
    weapons[Math.floor(Math.random() * weapons.length)];
}

export function checkIfFightInitialized(): boolean{
    const initFight=hasInit;
    if (initFight===false)
        throw new Error('Game not initialized');
    return true;
}

export function checkIfRoundInitiaized(): boolean{
    checkIfFightInitialized();
    const initRound=hasRound;
    if (initRound===false)
        throw new Error ('Round not intialized');
    return true;
}
export function dammagesCalculate(){
    let playerHealth=playerCurrentHealth;
    let enemyHealth=enemyCurrentHealth;

    if(playerDamages === enemyDamages) {
        return [playerHealth, enemyHealth];
    }
    if(playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    } else {
        playerHealth -= enemyDamages - playerDamages;
    }
}

export function healthCheck(playerHealth: number, enemyHealth: number){
    if(playerHealth <= 0) {
        playerHealth = 0;
    }
    if(enemyHealth <= 0) {
        enemyHealth = 0;
    }
}

export function isFightOver(playerHealth: number, enemyHealth: number){
    if(enemyHealth === 0 || playerHealth===0)
        return 'Game is over';
}

export function showWinner(playerHealth: number, enemyHealth: number){
    healthCheck(playerHealth, enemyHealth);
    isFightOver(playerHealth, enemyHealth);

    if(enemyHealth === 0) {
        return [playerHealth, enemyHealth, playerWeapon, true, true, false];
    }else if (playerHealth === 0)
        return [playerHealth, enemyHealth, enemyWeapon, true, false, true];
} 

export function fight(playerHealth: number, enemyHealth: number, playerWeapon: any, hasInit: boolean, hasRound: boolean, hasFought: boolean): Array<number|boolean> {
    checkIfFightInitialized();
    checkIfRoundInitiaized();
    if(!hasFought) {


        const lowDammageWeapons = ['hatchet', 'knife', 'spear'];
        const bigDammageWeapons = ['sword', 'halberd'];
        const bowWeapon =['bow'];
        const crossbowWeapon =['crossbow'];
        const dartswWeapon =['darts'];
        const daggerWeapon =['dagger'];


        if(lowDammageWeapons.includes(typeof playerWeapon)){
            enemyDamages += 1;
        }else if (bigDammageWeapons.includes(typeof playerWeapon)){
            enemyDamages += 5;
        }else if (bowWeapon===playerWeapon.name){
            enemyDamages += 1 * (Math.floor(Math.random() * 5));
        }else if (crossbowWeapon===playerWeapon.name){
            enemyDamages += 2 * (Math.floor(Math.random() * 5));
        }else if (dartswWeapon===playerWeapon.name){
            enemyDamages += 1 * (Math.floor(Math.random() * 3));
        }else if (daggerWeapon===playerWeapon.name){
            enemyDamages += 3;
        }else{
            throw new Error('Invalid weapon');
        }

        resetList();

        let enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];

        randomWeaponPick();

        if(lowDammageWeapons.includes(typeof enemyWeapon)){
            enemyDamages += 1;
        }else if (bigDammageWeapons.includes(typeof enemyWeapon)){
            enemyDamages += 5;
        }else if (bowWeapon===enemyWeapon.name){
            enemyDamages += 1 * (Math.floor(Math.random() * 5));
        }else if (crossbowWeapon===enemyWeapon.name){
            enemyDamages += 2 * (Math.floor(Math.random() * 5));
        }else if (dartswWeapon===enemyWeapon.name){
            enemyDamages += 1 * (Math.floor(Math.random() * 3));
        }else if (daggerWeapon===enemyWeapon.name){
            enemyDamages += 3;
        }else{
            throw new Error('Invalid weapon');
        }
        dammagesCalculate();

        healthCheck(playerHealth,enemyHealth);
        isFightOver(playerHealth, enemyHealth);
        showWinner(playerHealth,enemyHealth);

        return [playerHealth, enemyHealth, enemyWeapon, true, false, false];
    }
    else{
        throw new Error('Round already played');
    }
}