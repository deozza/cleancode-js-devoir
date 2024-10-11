import { WEAPONS } from '../types/weapons';
import type { ExtendedGameState } from '../types/extendedGameState';
import type { Weapon, Fighter } from '../types/gameType';

function getRandomWeapon(usedWeapons: Set<string>): Weapon {
	const availableWeapons = Object.values(WEAPONS).filter((weapon) => !usedWeapons.has(weapon.name));
	if (availableWeapons.length === 0) {
		throw new Error('No more unused weapons available');
	}
	return availableWeapons[Math.floor(Math.random() * availableWeapons.length)];
}

export function changePlayerWeapon(gameState: ExtendedGameState): ExtendedGameState {
	if (gameState.playerWeaponChanges >= 2) {
		throw new Error('Maximum number of weapon changes reached');
	}

	return {
		...gameState,
		player: updateFighterWeapon(gameState.player, gameState.usedWeapons),
		playerWeaponChanges: gameState.playerWeaponChanges + 1
	};
}

function createFighter(usedWeapons: Set<string>): Fighter {
	const weapon = getRandomWeapon(usedWeapons);
	usedWeapons.add(weapon.name);
	return {
		maxHealth: 10,
		currentHealth: 10,
		weapon
	};
}

function updateFighterWeapon(fighter: Fighter, usedWeapons: Set<string>): Fighter {
	const newWeapon = getRandomWeapon(usedWeapons);
	usedWeapons.add(newWeapon.name);
	return { ...fighter, weapon: newWeapon };
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

	return {
		...gameState,
		player: updateFighterWeapon(gameState.player, gameState.usedWeapons),
		enemy: updateFighterWeapon(gameState.enemy, gameState.usedWeapons),
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
	const enemyHealth = Math.max(0, gameState.enemy.currentHealth - playerDamage);

	let playerHealth = gameState.player.currentHealth;
	let enemyWeapon = gameState.enemy.weapon;

	if (enemyHealth > 0) {
		enemyWeapon = getRandomWeapon(gameState.usedWeapons);
		gameState.usedWeapons.add(enemyWeapon.name);
		const enemyDamage = calculateDamage(enemyWeapon);
		playerHealth = Math.max(0, playerHealth - enemyDamage);
	}

	const isGameOver = playerHealth === 0 || enemyHealth === 0;
	const winner = playerHealth === 0 ? 'enemy' : enemyHealth === 0 ? 'player' : null;

	return {
		...gameState,
		player: { ...gameState.player, currentHealth: playerHealth },
		enemy: { ...gameState.enemy, currentHealth: enemyHealth, weapon: enemyWeapon },
		isGameOver,
		winner
	};
}