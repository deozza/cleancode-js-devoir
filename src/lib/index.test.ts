import { describe, it, expect, beforeEach } from 'vitest';
import { init, newRound, fight, rerollWeapon, getRandomWeapon, GameState } from './index';

let state: any;

beforeEach(() => {
    state = init();
});

describe('init', () => {
    it('should initialize the game state correctly', () => {
        expect(state.playerMaxHealth).toBe(10);
        expect(state.playerCurrentHealth).toBe(10);
        expect(state.enemyMaxHealth).toBe(10);
        expect(state.enemyCurrentHealth).toBe(10);
        expect(state.playerWeapon).toBeDefined();
        expect(state.enemyWeapon).toBeNull();
        expect(state.hasInit).toBe(true);
        expect(state.hasRound).toBe(true);
        expect(state.hasFought).toBe(false);
        expect(state.playerWon).toBe(false);
        expect(state.playerLost).toBe(false);
        expect(state.rerollCount).toBe(0);
        expect(state.MAX_REROLLS).toBe(2);
    });
});

describe('newRound', () => {
    it('should start a new round if the game is initialized', () => {
        const newState = newRound(state.hasInit);
        expect(newState.playerWeapon).toBeDefined();
        expect(newState.enemyWeapon).toBeNull();
        expect(newState.hasRound).toBe(true);
        expect(newState.hasFought).toBe(false);
    });

    it('should throw an error if the game is not initialized', () => {
        expect(() => newRound(false)).toThrow('Game not initialized');
    });
});

describe('fight', () => {
    it('should calculate the fight outcome correctly', () => {
        const result = fight(state.playerCurrentHealth, state.enemyCurrentHealth, state.playerWeapon, state.hasInit, state.hasRound, state.hasFought);
        expect(result.length).toBe(6);
        expect(result[0]).toBeLessThanOrEqual(10);
        expect(result[1]).toBeLessThanOrEqual(10);
        expect(result[2]).toBeDefined();
        expect(result[3]).toBe(true);
    });

    it('should throw an error if the game state is invalid', () => {
        expect(() => fight(state.playerCurrentHealth, state.enemyCurrentHealth, state.playerWeapon, false, state.hasRound, state.hasFought)).toThrow('Game not initialized');
        expect(() => fight(state.playerCurrentHealth, state.enemyCurrentHealth, state.playerWeapon, state.hasInit, false, state.hasFought)).toThrow('Round not initialized');
        expect(() => fight(state.playerCurrentHealth, state.enemyCurrentHealth, state.playerWeapon, state.hasInit, state.hasRound, true)).toThrow('Round already played');
    });
});

describe('rerollWeapon', () => {
    it('should allow rerolling the weapon up to 2 times', () => {

        rerollWeapon(state);
        expect(state.rerollCount).toBe(2);

        expect(() => rerollWeapon(state)).toThrow('Maximum reroll count reached');
    });

    it('should not allow picking the same weapon again in a round', () => {
        state.usedWeapons = new Set();

        let newWeapon = getRandomWeapon();
        while (newWeapon.name === state.playerWeapon.name) {
            newWeapon = getRandomWeapon();
        }

        rerollWeapon(state);
        expect(state.playerWeapon.name).not.toBe(state.usedWeapons.has(newWeapon.name));
    });
});