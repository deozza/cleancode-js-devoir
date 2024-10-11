import { describe, it, expect } from 'vitest';
import { init, changePlayerWeapon, newRound } from './lib/index';

describe('Game Logic', () => {
describe('init', () => {
	it('should initialize the game state correctly', () => {
		const gameState = init();
		expect(gameState.round).toBe(1);
		expect(gameState.isGameOver).toBe(false);
		expect(gameState.winner).toBeNull();
		expect(gameState.playerWeaponChanges).toBe(0);
		expect(gameState.player.maxHealth).toBe(10);
		expect(gameState.player.currentHealth).toBe(10);
		expect(gameState.enemy.maxHealth).toBe(10);
		expect(gameState.enemy.currentHealth).toBe(10);
		expect(gameState.usedWeapons.size).toBe(2);
	});
});

	describe('changePlayerWeapon', () => {
		it('should change the player weapon and increment weapon changes', () => {
			let gameState = init();
			const initialWeapon = gameState.player.weapon;
			gameState = changePlayerWeapon(gameState);
			expect(gameState.player.weapon).not.toEqual(initialWeapon);
			expect(gameState.playerWeaponChanges).toBe(1);
			expect(gameState.usedWeapons.size).toBe(3);
		});

		it('should throw an error if maximum weapon changes are reached', () => {
			let gameState = init();
			gameState = changePlayerWeapon(gameState);
			gameState = changePlayerWeapon(gameState);
			expect(() => changePlayerWeapon(gameState)).toThrow(
				'Maximum number of weapon changes reached'
			);
		});
	});

	describe('newRound', () => {
		it('should start a new round with new weapons for both players', () => {
			let gameState = init();
			const initialPlayerWeapon = gameState.player.weapon;
			const initialEnemyWeapon = gameState.enemy.weapon;
			gameState = newRound(gameState);
			expect(gameState.round).toBe(2);
			expect(gameState.player.weapon).not.toEqual(initialPlayerWeapon);
			expect(gameState.enemy.weapon).not.toEqual(initialEnemyWeapon);
			expect(gameState.playerWeaponChanges).toBe(0);
			expect(gameState.usedWeapons.size).toBe(4);
		});
	});
});