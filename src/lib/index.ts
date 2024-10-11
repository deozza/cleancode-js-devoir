import { WEAPONS } from '../types/weapons';
import type { ExtendedGameState } from '../types/extendedGameState';
import type { Weapon, Fighter } from '../types/gameType';

function getRandomUnusedWeapon(usedWeapons: Set<string>): Weapon {
	const availableWeapons = Object.entries(WEAPONS).filter(([key]) => !usedWeapons.has(key));
	if (availableWeapons.length === 0) {
		throw new Error('No more unused weapons available');
	}
	const randomIndex = Math.floor(Math.random() * availableWeapons.length);
	return availableWeapons[randomIndex][1];
}

export function changePlayerWeapon(gameState: ExtendedGameState): ExtendedGameState {
	if (gameState.playerWeaponChanges >= 2) {
		throw new Error('Maximum number of weapon changes reached');
	}

	const newWeapon = getRandomUnusedWeapon(gameState.usedWeapons);
	gameState.usedWeapons.add(newWeapon.name);

	return {
		...gameState,
		player: { ...gameState.player, weapon: newWeapon },
		playerWeaponChanges: gameState.playerWeaponChanges + 1
	};
}

function createFighter(usedWeapons: Set<string>): Fighter {
	const weapon = getRandomUnusedWeapon(usedWeapons);
	usedWeapons.add(weapon.name);
	return {
		maxHealth: 10,
		currentHealth: 10,
		weapon
	};
}

export function init(): ExtendedGameState {
	const usedWeapons = new Set<string>();
	return {
		player: createFighter(usedWeapons),
		enemy: createFighter(usedWeapons),
		round: 1,
		isGameOver: false,
		winner: null,
		playerWeaponChanges: 0,
		usedWeapons
	};
}

export function newRound(gameState: ExtendedGameState): ExtendedGameState {
	if (!gameState) {
		throw new Error('Game not initialized');
	}

	const newPlayerWeapon = getRandomUnusedWeapon(gameState.usedWeapons);
	const newEnemyWeapon = getRandomUnusedWeapon(gameState.usedWeapons);

	gameState.usedWeapons.add(newPlayerWeapon.name);
	gameState.usedWeapons.add(newEnemyWeapon.name);

	return {
		...gameState,
		player: { ...gameState.player, weapon: newPlayerWeapon },
		enemy: { ...gameState.enemy, weapon: newEnemyWeapon },
		round: gameState.round + 1,
		playerWeaponChanges: 0
	};
}

function calculateDamage(weapon: Weapon): number {
	return typeof weapon.damage === 'function' ? weapon.damage() : weapon.damage;
}

export function fight(gameState: ExtendedGameState): ExtendedGameState {
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
		winner,
		playerWeaponChanges: gameState.playerWeaponChanges,
		usedWeapons: gameState.usedWeapons
	};
}
