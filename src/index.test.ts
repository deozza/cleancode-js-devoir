import { describe, it, expect} from 'vitest';
import { chooseWeapon, init, reloadWeapon, weaponList } from '$lib';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

describe('choose weapon test', () => {
	it('should return no weapon if the weaponList is empty', () => {

		expect(() => chooseWeapon()).toThrow('No weapons available');
	});
	it('should return a weapon from the weaponList', () => {
		init()
		expect(weaponList).toContain(chooseWeapon());
	});
	it('should not change the weaponList', () => {
		init()
		const weaponListCopy = [...weaponList];
		chooseWeapon();
		expect(weaponList).toEqual(weaponListCopy);
	});
	it('should return mutiple weapons from the weaponList', () => {
		init()
		let setWeapons = [];
		for (let i = 0; i < 100; i++) {
			setWeapons.push(chooseWeapon());
		}
		expect(setWeapons.length).toBeGreaterThan(1);
	});
});

describe('reload weapon test', () => {
	it('should not return the same weapon as the userWeapon', () => {
		init()
		let userWeapon = chooseWeapon();
		let newWeapon = reloadWeapon(userWeapon);
		expect(newWeapon).not.toEqual(userWeapon);
	});
	it('should return a weapon from the weaponList', () => {
		init()
		let userWeapon = chooseWeapon();
		expect(weaponList).toContain(reloadWeapon(userWeapon));
	});
	it('should return no weapon if the weaponList is empty', () => {
		init()
		let userWeapon = chooseWeapon();
		weaponList.length = 0;
		expect(() => reloadWeapon(userWeapon)).toThrow('No weapons available');
	});
});