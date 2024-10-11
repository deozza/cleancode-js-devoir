import type { Weapon } from "./gameType";

export const WEAPONS: { [key: string]: Weapon } = {
	hatchet: { name: 'Hatchet', damage: 1 },
	knife: { name: 'Knife', damage: 1 },
	spear: { name: 'Spear', damage: 1 },
	sword: { name: 'Sword', damage: 5 },
	halberd: { name: 'Halberd', damage: 5 },
	bow: { name: 'Bow', damage: () => Math.floor(Math.random() * 5) + 1 },
	crossbow: { name: 'Crossbow', damage: () => Math.floor(Math.random() * 5) + 2 },
	darts: { name: 'Darts', damage: () => Math.floor(Math.random() * 3) + 1 },
	dagger: { name: 'Dagger', damage: 3 }
};
