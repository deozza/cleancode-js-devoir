import { describe, expect, test } from 'vitest';
import { init, rerollWeapon } from './index';

describe('Reroll Weapon', () => {
    test('should reroll weapon correctly', () => {
        let state = init();
        const initialWeapon = state.playerWeapon;
        state = rerollWeapon(state);
        expect(state.playerWeapon).not.toBe(initialWeapon);
        expect(state.rerollsLeft).toBe(1);
        expect(state.pickedWeapons).toContain(state.playerWeapon);
    });

    test('should throw error if no rerolls left', () => {
        let state = init();
        state = rerollWeapon(state);
        state = rerollWeapon(state);
        expect(() => rerollWeapon(state)).toThrow('No rerolls left');
    });
});