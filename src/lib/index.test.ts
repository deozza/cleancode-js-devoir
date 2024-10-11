import { describe, expect, it } from 'vitest';
import { init, newRound, fight } from './index';  
import weapons from './weaponList.json'; 

describe('Combat Game', () => {

    it('should initialize the game correctly', () => {
        const gameState = init();

        expect(gameState.playerMaxHealth).toBe(10);
        expect(gameState.enemyMaxHealth).toBe(10);
        expect(gameState.playerCurrentHealth).toBe(10);
        expect(gameState.enemyCurrentHealth).toBe(10);
        expect(weapons).toContainEqual(gameState.playerWeapon);
        expect(gameState.hasInit).toBe(true);
        expect(gameState.hasRound).toBe(true);
        expect(gameState.hasFought).toBe(false);
        expect(gameState.playerWon).toBe(false);
        expect(gameState.playerLost).toBe(false);
    });

    it('should start a new round correctly', () => {
        const gameState = init();  // Initialize game

        const roundState = newRound(gameState.hasInit);

        expect(weapons).toContainEqual(roundState.playerWeapon);
        expect(roundState.enemyWeapon).toBe(null);
        expect(roundState.hasRound).toBe(true);
        expect(roundState.hasFought).toBe(false);
    });

    it('should throw an error if starting a new round without initializing the game', () => {
        expect(() => newRound(false)).toThrow('Game not initialized');
    });

    it('should correctly calculate fight outcomes', () => {
        const gameState = init();
        const playerHealth = gameState.playerCurrentHealth;
        const enemyHealth = gameState.enemyCurrentHealth;
        const playerWeapon = gameState.playerWeapon;

        const [updatedPlayerHealth, updatedEnemyHealth, enemyWeapon, hasFought, playerWon, playerLost] = fight(
            playerHealth, 
            enemyHealth, 
            playerWeapon, 
            gameState.hasInit, 
            gameState.hasRound, 
            false  
        );

        expect(updatedPlayerHealth).toBeGreaterThanOrEqual(0);
        expect(updatedEnemyHealth).toBeGreaterThanOrEqual(0);
        expect(weapons).toContainEqual(enemyWeapon);
        expect(hasFought).toBe(true);

        if (updatedEnemyHealth === 0) {
            expect(playerWon).toBe(true);
            expect(playerLost).toBe(false);
        }

        if (updatedPlayerHealth === 0) {
            expect(playerWon).toBe(false);
            expect(playerLost).toBe(true);
        }
    });

    it('should throw an error if fighting without initialization', () => {
        const playerWeapon = weapons[0]; 

        expect(() => fight(10, 10, playerWeapon, false, true, false)).toThrow('Game not initialized');
    });

    it('should throw an error if round has already been played', () => {
        const gameState = init();

        const playerHealth = gameState.playerCurrentHealth;
        const enemyHealth = gameState.enemyCurrentHealth;
        const playerWeapon = gameState.playerWeapon;

        // Simulate first fight
        fight(playerHealth, enemyHealth, playerWeapon, gameState.hasInit, gameState.hasRound, false);

        // Attempt to fight again
        expect(() => fight(playerHealth, enemyHealth, playerWeapon, gameState.hasInit, gameState.hasRound, true))
            .toThrow('Round already played');
    });
});
