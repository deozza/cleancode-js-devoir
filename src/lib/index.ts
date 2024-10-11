import { WEAPONS } from '../types/weapons';
import type { Weapon, Fighter, GameState } from '../types/gameType';

function getRandomWeapon(): Weapon {
	const weaponKeys = Object.keys(WEAPONS);
	const randomKey = weaponKeys[
		Math.floor(Math.random() * weaponKeys.length)
	] as keyof typeof WEAPONS;
	return WEAPONS[randomKey];
}

function createFighter(): Fighter {
	return {
		maxHealth: 10,
		currentHealth: 10,
		weapon: getRandomWeapon()
	};
}

export function init(): GameState {
	return {
		player: createFighter(),
		enemy: createFighter(),
		round: 1,
		isGameOver: false,
		winner: null
	};
}

export function newRound(gameState: GameState): GameState {
	if (!gameState) {
		throw new Error('Game not initialized');
	}

	return {
		...gameState,
		player: { ...gameState.player, weapon: getRandomWeapon() },
		enemy: { ...gameState.enemy, weapon: getRandomWeapon() },
		round: gameState.round + 1
	};
}

function calculateDamage(weapon: Weapon): number {
	return typeof weapon.damage === 'function' ? weapon.damage() : weapon.damage;
}

export function fight(gameState: GameState): GameState {
	if (gameState.isGameOver) {
		throw new Error('Game is already over');
	}

	const playerDamage = calculateDamage(gameState.player.weapon);
	const enemyDamage = calculateDamage(gameState.enemy.weapon);

	let playerHealth = gameState.player.currentHealth;
	let enemyHealth = gameState.enemy.currentHealth;

	if (playerDamage > enemyDamage) {
		enemyHealth -= playerDamage - enemyDamage;
	} else if (enemyDamage > playerDamage) {
		playerHealth -= enemyDamage - playerDamage;
	}

	playerHealth = Math.max(0, playerHealth);
	enemyHealth = Math.max(0, enemyHealth);

	const isGameOver = playerHealth === 0 || enemyHealth === 0;
	const winner = playerHealth === 0 ? 'enemy' : enemyHealth === 0 ? 'player' : null;

	return {
		player: { ...gameState.player, currentHealth: playerHealth },
		enemy: { ...gameState.enemy, currentHealth: enemyHealth },
		round: gameState.round,
		isGameOver,
		winner
	};
}

export function getDamageForWeapon(weaponName: string): number | (() => number) {
	const weapon = Object.values(WEAPONS).find(
		(w) => w.name.toLowerCase() === weaponName.toLowerCase()
	);

	if (!weapon) {
		throw new Error(`Invalid weapon: ${weaponName}`);
	}

	return weapon.damage;
}
