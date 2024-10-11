import { Game } from '$lib';
import { describe, it, expect, beforeEach } from 'vitest';

let game: Game = null!;

beforeEach(() => {
	game = new Game();
	game.newRound();
})

describe('game test', () => {
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
