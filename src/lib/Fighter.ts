export default class Fighter {
	public currentHealth: number;
	public maxHealth: number;
	public weapon: string;
	public damage: number;

	constructor(maxHealth: number) {
		this.maxHealth = maxHealth;
		this.currentHealth = maxHealth;
		this.weapon = '';
		this.damage = 0;
	}

	getCurrentHealth(): number {
		return this.currentHealth;
	}

	setCurrentHealth(health: number): void {
		this.currentHealth = health;
	}

	getMaxHealth(): number {
		return this.maxHealth;
	}

	setMaxHealth(health: number): void {
		this.maxHealth = health;
	}

	getWeapon(): string {
		return this.weapon;
	}

	setWeapon(weapon: string): void {
		this.weapon = weapon;
	}

	getDamage(): number {
		return this.damage;
	}

	setDamage(damage: number): void {
		this.damage = damage;
	}
}
