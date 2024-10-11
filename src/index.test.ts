import { Game } from '$lib';
import { describe, it, expect, beforeEach } from 'vitest';

let game: Game = null!;

beforeEach(() => {
	game = new Game();
	game.newRound();
})

describe('game test', () => {
	describe('fight', () => {
		it('should allow fight', () => {
			expect(() => game.fight()).not.toThrow();
		});

		it('should forbid fighting if round not initialized', () => {
			game.hasRound = false;
			expect(() => game.fight()).toThrowError('Round not initialized');
		});

		it('should forbid fighting if round already played', () => {
			game.hasFought = true;
			expect(() => game.fight()).toThrowError('Round already played');
		});

		it('should forbid fighting if player weapon not initialized', () => {
			game.player.weapon = null!;
			expect(() => game.fight()).toThrowError('Player or enemy weapon not initialized');
		});

		it('should forbid fighting if enemy weapon not initialized', () => {
			game.enemy.weapon = null!;
			expect(() => game.fight()).toThrowError('Player or enemy weapon not initialized');
		});
	});

	describe('damages', () => {
		it('should inflict damage to the enemy if player damages are higher', () => {
			game.player.weapon = { getDamage: () => 5 } as never;
			game.enemy.weapon = { getDamage: () => 2 } as never;

			game.fight();

			expect(game.enemy.health).toBeLessThan(10);
			expect(game.player.health).toBe(10);
		});

		it('should inflict damage to the player if enemy damages are higher', () => {
			game.player.weapon = { getDamage: () => 2 } as never;
			game.enemy.weapon = { getDamage: () => 5 } as never;

			game.fight();

			expect(game.player.health).toBeLessThan(10);
			expect(game.enemy.health).toBe(10);
		});

		it('should not inflict damage if damages are equal', () => {
			game.player.weapon = { getDamage: () => 5 } as never;
			game.enemy.weapon = { getDamage: () => 5 } as never;

			game.fight();

			expect(game.player.health).toBe(10);
			expect(game.enemy.health).toBe(10);
		});
	});

	describe('winner', () => {
		it('should declare player as winner if enemy health reaches zero', () => {
			game.player.weapon = { getDamage: () => game.enemy.maxHealth } as never;
			game.enemy.weapon = { getDamage: () => 0 } as never;

			game.fight();

			expect(game.playerWon).toBe(true);
			expect(game.playerLost).toBe(false);
		});

		it('should declare player as loser if player health reaches zero', () => {
			game.player.weapon = { getDamage: () => 0 } as never;
			game.enemy.weapon = { getDamage: () => game.player.maxHealth } as never;

			game.fight();

			expect(game.playerWon).toBe(false);
			expect(game.playerLost).toBe(true);
		});
	});

	describe('reroll weapon', () => {
		it('should not be able to reroll more than 3 times', () => {
			game.player.rerollWeapon();
			game.player.rerollWeapon();
			expect(() => game.player.rerollWeapon()).toThrowError('Cannot reroll weapon');
		});

		it('should have a different weapon after reroll', () => {
			const weapon = game.player.weapon;
			game.player.rerollWeapon();
			expect(game.player.weapon).toBeDefined();
			expect(game.player.weapon!.name).not.toBe(weapon!.name);
		});
	});
});
