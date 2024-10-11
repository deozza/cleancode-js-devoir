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

function randomDamage(baseDamage: number, damageMultiplicator: number) {
	if (!baseDamage || !damageMultiplicator || baseDamage < 0 || damageMultiplicator < 0) {
		throw new Error('Valeur de dégats invalide');
	}
	return baseDamage * Math.floor(Math.random() * damageMultiplicator);
}

function calculateDamage(weapon: any): number {
	let damage = 0;

	switch (weapon.name) {
		case 'hatchet':
		case 'knife':
		case 'spear':
			damage += 1;
			break;
		case 'sword':
		case 'halberd':
			damage += 5;
			break;
		case 'bow':
			damage += randomDamage(1, 5);
			break;
		case 'crossbow':
			damage += randomDamage(2, 5);
			break;
		case 'darts':
			damage += randomDamage(1, 3);
			break;
		case 'dagger':
			damage += 3;
			break;
		default:
			throw new Error('Invalid weapon');
	}

	return damage;
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

	// reset weapon list so the enemy could play
	weaponList = weapons;

	const enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
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

	// check if the game is over and the player has won
	if (enemyHealth === 0) {
		return [playerHealth, enemyHealth, enemyWeapon, true, true, false];
	}

	// check if the game is over and the player has lost
	if (playerHealth === 0) {
		return [playerHealth, enemyHealth, enemyWeapon, true, false, true];
	}

	return [playerHealth, enemyHealth, enemyWeapon, true, false, false];
}
