import { describe, it, expect } from 'vitest';
import {fight, rerollWeapon} from './index';


describe('fight', () => {
    it('should resolve the combat round correctly', () => {
        const playerHealth = 10;
        const enemyHealth = 10;
        const playerWeapon = { name: 'sword' };
        const weaponList = [{ name: 'sword' }, { name: 'bow' }, { name: 'dagger' }];
        const usedWeapons: Set<string> = new Set();
        const rerollCount = 0;

        const result = fight(
            playerHealth,
            enemyHealth,
            playerWeapon,
            true, 
            true, 
            false, 
            weaponList,
            usedWeapons,
            rerollCount
        );

        expect(result.roundContinues).toBe(true); 
        expect(result.playerHealth).toBeGreaterThanOrEqual(0);
        console.log(result.playerHealth);
        console.log(result.enemyHealth);
        expect(result.enemyHealth).toBeGreaterThanOrEqual(0);
    });

    it('should throw an error if the game is not initialized', () => {
        expect(() => fight(
            10, 10, { name: 'sword' }, false, true, false, [], new Set(), 0
        )).toThrow('La partie n\'est pas initialisée');
    });

    it('should throw an error if the round is not initialized', () => {
        expect(() => fight(
            10, 10, { name: 'sword' }, true, false, false, [], new Set(), 0
        )).toThrow('Le round n\'est pas initialisé');
    });

    it('should throw an error if the round has already been played', () => {
        expect(() => fight(
            10, 10, { name: 'sword' }, true, true, true, [], new Set(), 0
        )).toThrow('Le round a déjà été joué');
    });
    it('should allow rerolling a weapon and update the count', () => {
        const currentWeapon = { name: 'sword' };
        const weaponList = [{ name: 'sword' }, { name: 'bow' }, { name: 'dagger' }];
        const usedWeapons = new Set(['sword']);
        const rerollCount = 0;

        const result = rerollWeapon(currentWeapon, weaponList, usedWeapons, rerollCount);
        console.log('arme', result.newWeapon.name);
        expect(result.newWeapon.name).not.toBe('sword');
        expect(result.updatedRerollCount).toBe(1); 
    });

    it('should not allow selecting the same weapon again during reroll', () => {
        const currentWeapon = { name: 'sword' };
        const weaponList = [{ name: 'sword' }, { name: 'bow' }, { name: 'dagger' }];
        const usedWeapons = new Set(['sword', 'bow']);
        const rerollCount = 1;

        const result = rerollWeapon(currentWeapon, weaponList, usedWeapons, rerollCount);

        expect(result.newWeapon.name).not.toBe('sword');
        expect(result.newWeapon.name).not.toBe('bow');
        console.log('compteur relance',result.updatedRerollCount);
        expect(result.updatedRerollCount).toBe(2); 
    });

    it('should throw an error when max reroll is reached', () => {
        const currentWeapon = { name: 'sword' };
        const weaponList = [{ name: 'sword' }, { name: 'bow' }];
        const usedWeapons = new Set(['sword']);
        const rerollCount = 2; 

        expect(() => rerollWeapon(currentWeapon, weaponList, usedWeapons, rerollCount))
            .toThrow('Nombre maximum de relances atteint');
    });

    it('should throw an error if no weapons are available for reroll', () => {
        const currentWeapon = { name: 'sword' };
        const weaponList = [{ name: 'sword' }];
        const usedWeapons = new Set(['sword']);
        const rerollCount = 0;

        expect(() => rerollWeapon(currentWeapon, weaponList, usedWeapons, rerollCount))
            .toThrow('Plus d\'armes disponibles pour la relance');
    });
});


