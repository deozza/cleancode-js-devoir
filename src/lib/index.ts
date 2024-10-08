import weapons from './weaponList.json';

export let weaponList: any[] = [];

export function init() {
	weaponList = weapons;

	const playerMaxHealth = 10;
	const playerCurrentHealth = 10;
	const enemyMaxHealth = 10;
	const enemyCurrentHealth = 10;
	const playerWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
	const enemyWeapon = null;
	const hasInit = true;
	const hasRound = true;
	const hasFought = false;
	const playerWon = false;
	const playerLost = false;

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

	// reset weapon list so the enemy could play
	weaponList = weapons;
	const enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];

	const playerDamages: number = calculatingDamage(playerWeapon, 0);
	const enemyDamages: number = calculatingDamage(enemyWeapon, 0);

	playerHealth = calculatingHealth(playerHealth, enemyDamages);
	enemyHealth = calculatingHealth(enemyHealth, playerDamages);

	return checkWinner(playerHealth, enemyHealth, enemyWeapon);
}

function calculatingDamage(fighterWeapon: any, fighterDamages: number): number {
	switch (fighterWeapon.name) {
		case 'hatchet':
		case 'knife':
		case 'spear':
			return (fighterDamages += 1);
		case 'sword':
		case 'halberd':
			return (fighterDamages += 5);
		case 'bow':
			return (fighterDamages += Math.floor(Math.random() * 5));
		case 'crossbow':
			return (fighterDamages += 2 * Math.floor(Math.random() * 5));
		case 'darts':
			return (fighterDamages += Math.floor(Math.random() * 3));
		case 'dagger':
			return (fighterDamages += 3);
		default:
			throw new Error('Invalid weapon');
	}
}

function calculatingHealth(fighterHealth: number, damages: number): number {
	fighterHealth -= damages;

	if (fighterHealth <= 0) {
		fighterHealth = 0;
	}

	return fighterHealth;
}

function checkWinner(
	playerHealth: number,
	enemyHealth: number,
	enemyWeapon: any
): Array<number | boolean> {
	if (enemyHealth === 0) {
		return [playerHealth, enemyHealth, enemyWeapon, true, true, false];
	}

	if (playerHealth === 0) {
		return [playerHealth, enemyHealth, enemyWeapon, true, false, true];
	}

	return [playerHealth, enemyHealth, enemyWeapon, true, false, false];
}
