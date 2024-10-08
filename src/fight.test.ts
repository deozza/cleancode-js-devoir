import { beforeAll, describe, expect, test } from 'vitest';
import { init, newRound, fight, weaponList } from './lib/index.js';
import weapons from './lib/weaponList.json';

const mockWeapons = [
    { name: 'sword' },
    { name: 'knife' },
    { name: 'bow' },
    { name: 'dagger' }
];

beforeAll(() => {
    weaponList.push(...weapons);
});

describe('Game Functions', () => {
    test('init should initialize the game correctly', () => {
        const state = init();
        
        expect(state.playerMaxHealth).toBe(10);
        expect(state.playerCurrentHealth).toBe(10);
        expect(state.enemyMaxHealth).toBe(10);
        expect(state.enemyCurrentHealth).toBe(10);
        expect(state.playerWeapon).toBeDefined();
        expect(state.enemyWeapon).toBeNull();
        expect(state.gameStatus).toBe('initialized');
    });

    test('newRound should provide a new player weapon and set game status to round_started', () => {
        init();
        const roundState = newRound();
        
        expect(roundState.playerWeapon).toBeDefined();
        expect(roundState.enemyWeapon).toBeNull();
        expect(roundState.gameStatus).toBe('round_started');
    });

    test('fight should return updated health and weapon information', () => {
        const initialState = init();
        const playerWeapon = initialState.playerWeapon;

        const { enemyHealth, playerHealth } = fight(
            initialState.playerCurrentHealth,
            initialState.enemyCurrentHealth,
            playerWeapon
        );

        expect(playerHealth).toBeLessThanOrEqual(10);
        expect(enemyHealth).toBeLessThanOrEqual(10);
    });

    test('fight should correctly set hasWon and hasLost flags', () => {
        const state = init();
        const playerWeapon = state.playerWeapon;

        const fightResult = fight(0, 0, playerWeapon);
        
        expect(fightResult.hasWon).toBe(true);
        expect(fightResult.hasLost).toBe(true);
    });
});
