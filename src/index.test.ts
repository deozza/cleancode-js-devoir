import { describe, it, expect } from 'vitest';

import { rerollWeapon } from './lib/index';

describe('rerollWeapon', () => {
    it('doit retourner une nouvelle arme et incrémenter le compteur de réinitialisation lorsque le joueur n\'a pas encore réinitialisé deux fois', () => {
        const playerWeapon = { name: 'épée' };
        const playerWeaponRerolls = 0;
        const hasInit = true;
        const hasRound = true;
        const result = rerollWeapon(playerWeapon, playerWeaponRerolls, hasInit, hasRound);
        expect(result.playerWeapon).not.toBe(playerWeapon);
        expect(result.playerWeaponRerolls).toBe(1);
    });

    it('doit lancer une erreur lorsque le joueur a déjà réinitialisé deux fois', () => {
        const playerWeapon = { name: 'épée' };
        const playerWeaponRerolls = 2;
        const hasInit = true;
        const hasRound = true;
        expect(() => rerollWeapon(playerWeapon, playerWeaponRerolls, hasInit, hasRound)).toThrow(
            'Vous avez déjà réinitialisé votre arme deux fois ce tour.'
        );
    });

    it('doit lancer une erreur lorsque le jeu n\'est pas initialisé', () => {
        const playerWeapon = { name: 'épée' };
        const playerWeaponRerolls = 0;
        const hasInit = false;
        const hasRound = true;
        expect(() => rerollWeapon(playerWeapon, playerWeaponRerolls, hasInit, hasRound)).toThrow(
            'Vous ne pouvez pas réinitialiser votre arme maintenant.'
        );
    });

    it('doit lancer une erreur lorsque le tour n\'a pas commencé', () => {
        const playerWeapon = { name: 'épée' };
        const playerWeaponRerolls = 0;
        const hasInit = true;
        const hasRound = false;
        expect(() => rerollWeapon(playerWeapon, playerWeaponRerolls, hasInit, hasRound)).toThrow(
            'Vous ne pouvez pas réinitialiser votre arme maintenant.'
        );
    });

    it('doit retourner une nouvelle arme qui est différente de l\'arme originale', () => {
        const playerWeapon = { name: 'épée' };
        const playerWeaponRerolls = 0;
        const hasInit = true;
        const hasRound = true;
        const result = rerollWeapon(playerWeapon, playerWeaponRerolls, hasInit, hasRound);
        expect(result.playerWeapon.name).not.toBe(playerWeapon.name);
    });
});

