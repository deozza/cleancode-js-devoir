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
	let weaponReload = 0;

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
		weaponReload
	};
}

export function newRound(hasInit: boolean) {
	if (hasInit) {
		weaponList = weapons;

		return {
			playerWeapon: weaponList[Math.floor(Math.random() * weaponList.length)],
			enemyWeapon: null,
			hasRound: true,
			hasFought: false
		};
	} else {
		throw new Error('Game not initialized');
	}
}

export function rerollWeapon(
	excludedWeapons: any[],
	maxRerolls: number,
	currentRerollCount: number
): any {
	if (currentRerollCount >= maxRerolls) {
		throw new Error('Plus de rerolls disponibles');
	}

	const availableWeapons = weaponList.filter((w) => !excludedWeapons.includes(w));
	if (availableWeapons.length === 0) {
		throw new Error('Aucune arme disponible');
	}

	const newWeapon = availableWeapons[Math.floor(Math.random() * availableWeapons.length)];

	return newWeapon;
}

function randomDamage(baseDamage: number, damageMultiplicator: number) {
	if (!baseDamage || !damageMultiplicator || baseDamage < 0 || damageMultiplicator < 0) {
		throw new Error('Valeur de dégats invalide');
	}
	return baseDamage * Math.floor(Math.random() * damageMultiplicator);
}

function calculateDamage(weapon: any): number {
	let damage = 0;

	if (weapon.multiplicator) {
		 damage = randomDamage(weapon.basicDamage, weapon.multiplicator);
	} else {
        damage = weapon.basicDamage
    }

	return damage;
}

function resetWeapons(){
    weaponList = weapons;
}

function generateWeaponList(){
    return weaponList[Math.floor(Math.random() * weaponList.length)]
}

export function fight(
	playerHealth: number,
	enemyHealth: number,
	playerWeapon: any,
	hasInit: boolean,
	hasRound: boolean,
	hasFought: boolean
): Array<number | boolean> {
	if (!hasInit) {
		throw new Error('Game not initialized');
	}

	if (!hasRound) {
		throw new Error('Round not initialized');
	}

	if (hasFought) {
		throw new Error('Round already played');
	}

	const playerDamages = calculateDamage(playerWeapon);

    resetWeapons()

	const enemyWeapon = generateWeaponList();
	const enemyDamages = calculateDamage(enemyWeapon);

	if (playerDamages === enemyDamages) {
		return [playerHealth, enemyHealth];
	}

	if (playerDamages > enemyDamages) {
		enemyHealth -= playerDamages - enemyDamages;
	} else {
		playerHealth -= enemyDamages - playerDamages;
	}

	// health cannot be negative
	playerHealth = Math.max(0, playerHealth);
	enemyHealth = Math.max(0, enemyHealth);

	return [
		playerHealth,
		enemyHealth,
		enemyWeapon,
		true,
		enemyHealth === 0, // le joueur a gagné
		playerHealth === 0 // le joueur a perdu
	];
}
