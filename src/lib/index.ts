import weapons from './weaponList.json';

export let weaponList: weaponType[] = [];

export interface weaponType {
	name: string;
	damage: number;
	description: string;
	rarity: string;
}

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

export function fight(
	playerHealth: number,
	enemyHealth: number,
	playerWeapon: weaponType,
	hasInit: boolean,
	hasRound: boolean,
	hasFought: boolean
): Array<number | boolean | weaponType> {
	if (!hasInit) {
		throw new Error('Game not initialized');
	}
	if (!hasRound) {
		throw new Error('Round not initialized');
	}
	if (hasFought) {
		throw new Error('Round already played');
	}

	let playerDamages: number = 0;
	let enemyDamages: number = 0;

	enemyDamages += playerWeapon.damage;

	weaponList = weapons;

	let enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];

	playerDamages += enemyWeapon.damage;

	if (playerDamages === enemyDamages) {
		return [playerHealth, enemyHealth];
	}

	if (playerDamages > enemyDamages) {
		enemyHealth -= playerDamages - enemyDamages;
	} else {
		playerHealth -= enemyDamages - playerDamages;
	}

	if (playerHealth <= 0) {
		playerHealth = 0;
	}

	if (enemyHealth <= 0) {
		enemyHealth = 0;
	}

	if (enemyHealth === 0) {
		return [playerHealth, enemyHealth, enemyWeapon, true, true, false];
	}

	if (playerHealth === 0) {
		return [playerHealth, enemyHealth, enemyWeapon, true, false, true];
	}

	return [playerHealth, enemyHealth, enemyWeapon, true, false, false];
}
