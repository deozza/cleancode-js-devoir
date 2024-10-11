import { describe, it, expect } from 'vitest';
import { chooseWeapon, init, reloadWeapon, weaponList } from '$lib';
import weapons from './lib/weaponList.json';


describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

describe('choose weapon test', () => {
	it('should return a weapon from the weaponList', () => {
		init()
		expect(weaponList).toContain(chooseWeapon());
	});
});

describe('reload weapon test', () => {
	it('should not return the same weapon', () => {
		init()
		const weapon = chooseWeapon();
		expect(reloadWeapon(weapon)).not.toBe(chooseWeapon());
	});
});