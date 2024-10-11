export interface Weapon {
	name: string;
	damage: number | (() => number);
	rarity: string;
	description: string;
}

export interface Fighter {
	maxHealth: number;
	currentHealth: number;
	weapon: Weapon;
}

export interface GameState {
	player: Fighter;
	enemy: Fighter;
	round: number;
	isGameOver: boolean;
	winner: 'player' | 'enemy' | null;
}