
import { init, rerollWeapon } from '$lib';
import { describe, expect, test, beforeEach } from 'vitest';

describe('Reroll Weapon Functionality', () => {
    let state: any;

    beforeEach(() => {
        // Initialiser l'état avant chaque test
        state = init();
        state.rerolledWeapons = [];
        state.weaponReload = 0;
    });

    test('should reroll a weapon and return a new one', () => {
        const initialWeapon = state.playerWeapon;
        
        // Premier reroll
        const newWeapon = rerollWeapon([initialWeapon], 2, state.weaponReload);
        
        // La nouvelle arme ne doit pas être la même que la premiere
        expect(newWeapon).not.toEqual(initialWeapon);

        state.weaponReload++;
        state.rerolledWeapons.push(newWeapon);
    });

    test('should allow a maximum of 2 rerolls', () => {
        // Simuler deux rerolls successifs
        const firstReroll = rerollWeapon([state.playerWeapon], 2, state.weaponReload);
        state.rerolledWeapons.push(firstReroll);
        state.weaponReload++;

        const secondReroll = rerollWeapon(state.rerolledWeapons, 2, state.weaponReload);
        state.rerolledWeapons.push(secondReroll);
        state.weaponReload++;

        // Vérifier que le deuxième reroll est accepté, mais un troisième doit renvoyé une erreur
        expect(() => rerollWeapon(state.rerolledWeapons, 2, state.weaponReload)).toThrowError('Plus de rerolls disponibles');
    });
});
