import { describe, it, expect, beforeEach } from 'vitest';
import { GAME_CONSTANTS, init, rerollWeapon } from './lib';
import type { State } from './lib/IGame';

describe('Reroll Weapon', () => {
	let initialState: State;

	beforeEach(() => {
		initialState = init();
	});

	it('should return a new state with a different weapon', () => {
		const oldWeapon = initialState.playerWeapon;
		const newState = rerollWeapon(initialState);

		expect(newState.playerWeapon).toBeTruthy();
		expect(newState.playerWeapon).not.toEqual(oldWeapon);
	});

	it('should decrease rerollsLeft by 1', () => {
		const oldRerolls = initialState.rerollsLeft;
		const newState = rerollWeapon(initialState);

		expect(newState.rerollsLeft).toBe(oldRerolls! - 1);
	});

	it('should add the new weapon to pickedWeapons', () => {
		const newState = rerollWeapon(initialState);

		expect(newState.pickedWeapons).toContain(newState.playerWeapon);
	});

	it('should throw error when no rerolls left', () => {
		let currentState = initialState;

		for (let i = 0; i < GAME_CONSTANTS.MAX_REROLLS; i++) {
			currentState = rerollWeapon(currentState);
		}

		expect(() => rerollWeapon(currentState)).toThrow('No rerolls left');
	});
});