import { rerollWeapon } from '$lib';
import { describe, expect, test } from 'vitest';

const weaponListMock = [
    { name: 'sword' },
    { name: 'axe' },
    { name: 'spear' }
];

describe('Test du reroll', () => {
    test('Changement de l arme qui n est pas la même que celle d avant', () => {
        const initialWeapon = { name: 'sword' }; 
        const usedWeapons = new Set([initialWeapon.name]); 
        console.log(initialWeapon)        
        const newWeapon = rerollWeapon(usedWeapons);
        expect(newWeapon?.name).not.toBe(initialWeapon.name);
    });

    test('Verifie que l arme nest pas dans la liste de celle dejà utilisé', () => {
        const initialWeapon = { name: 'sword' }; 
        const usedWeapons = new Set([initialWeapon.name]); 
        console.log(initialWeapon)        
        const newWeapon = rerollWeapon(usedWeapons);
        expect(usedWeapons.has(newWeapon?.name)).toBe(false);
    });

    test('Non autorisation du reroll si arme déjà utilisée', () => {
        const usedWeapons = new Set(weaponListMock.map(weapon => weapon.name));
        const newWeapon = rerollWeapon(usedWeapons);
        expect(newWeapon).toBeNull();
    });
});
