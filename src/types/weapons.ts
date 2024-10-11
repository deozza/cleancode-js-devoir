import type { Weapon } from "./gameType";

export const WEAPONS: { [key: string]: Weapon } = {
	hatchet: {
		name: 'Hatchet',
		damage: 1,
		rarity: 'common',
		description: 'Deals 1 damage to the enemy.'
	},
	knife: {
		name: 'Knife',
		damage: 1,
		rarity: 'common',
		description: 'Deals 1 damage to the enemy.'
	},
	spear: {
		name: 'Spear',
		damage: 1,
		rarity: 'common',
		description: 'Deals 1 damage to the enemy.'
	},
	sword: { name: 'Sword', damage: 5, rarity: 'rare', description: "Deals 5 damage to the enemy." },
	halberd: {
		name: 'Halberd',
		damage: 5,
		rarity: 'hatchet',
		description: 'Deals 5 damage to the enemy.'
	},
	bow: {
		name: 'Bow',
		damage: () => Math.floor(Math.random() * 5) + 1,
		rarity: 'bow',
		description: 'Deals 1 damage to the enemy. Hits between 1 and 5 times.'
	},
	crossbow: {
		name: 'Crossbow',
		damage: () => Math.floor(Math.random() * 5) + 2,
		rarity: 'epic',
		description: 'Deals 2 damage to the enemy. Hits between 1 and 5 times.'
	},
	darts: {
		name: 'Darts',
		damage: () => Math.floor(Math.random() * 3) + 1,
		rarity: 'common',
		description: 'Deals 1 damage to the enemy. Hits between 1 and 3 times.'
	},
	dagger: {
		name: 'Dagger',
		damage: 3,
		rarity: 'uncommon',
		description: 'Deals 3 damage to the enemy.'
	}
};
