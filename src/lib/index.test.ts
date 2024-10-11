import { expect, test } from 'vitest'
import { rerollWeapon } from './index';
import weapons from './weaponList.json';


const maxRerolls = 2;

const weaponList = weapons;

test ('rerolling weapon', () => {
    const rerollUserCount = 0;
    const currentWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    
    const weaponLength = weaponList.length;
    
    const { newWeapon, rerollCount } = rerollWeapon(rerollUserCount, maxRerolls, currentWeapon);

    expect(newWeapon).not.toBe(currentWeapon);
    expect(rerollCount).toBe(1);
    expect(weaponList.length).not.toBe(weaponLength);
})