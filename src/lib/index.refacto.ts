import weaponsData from './weaponList.json';

interface weapon {
    name: string;
    rarity: string;
    description: string;
    damage: number;
    type: "melee" | "ranged";
}

export let weaponList: weapon[] = [];

class Player {
    public name: string = "";
    public maxHealth: number = 10;
    public health: number = 10;
    public weapon: weapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    public alive: boolean = true;
    constructor(playerName: string) {
        this.RenamePlayer(playerName);
    }
    RenamePlayer(name: string) {
        this.name = name;
    }
}

export function InitPlayers() {
    weaponList = weaponsData as weapon[];
    const player = new Player("Garen");
    const enemy = new Player("Darius");
    const hasRound = true;
    const hasInit = true;
    const hasFought = false;
    return {
        player,
        enemy,
        hasInit,
        hasRound,
        hasFought,
    }
}

export function dealDamage(player: Player, enemy: Player) {
    if (player.weapon.type === "ranged") {
        enemy.health -= Math.floor(player.weapon.damage * Math.random());
        return enemy.health;
    }
    enemy.health -= player.weapon.damage;
}

export function comparePlayersWeapons(player: Player, enemy: Player) {
    if (player.weapon.damage === enemy.weapon.damage) {
        return
    }
    if (player.weapon.damage > enemy.weapon.damage) {
        return player;
    }
    if (player.weapon.damage < enemy.weapon.damage) {
        return enemy;
    }
}

export function CheckDeath(player: Player): Player {
    if (player.health! >= 0) {
        return player;
    }
    player.alive = false;
    return player;
}


export function switchPlayerWeapon(player: Player) {
    player.weapon = weaponList[Math.floor(Math.random() * weaponList.length)];
}

export function newRound(hasInit: boolean) {
    if (!hasInit) {
        throw new Error('Game not initialized');
    }
    return {
        hasRound: true,
        hasFought: false
    }
}

export function fight(player: Player, enemy: Player, hasInit: boolean, hasRound: boolean, hasFought: boolean): Array<number | weapon | boolean> {
    if (!hasInit) {
        throw new Error('Game not initialized');
    }
    if (!hasRound) {
        throw new Error('Round not initialized');
    }
    if (hasFought) {
        throw new Error('Round already played');
    }
    switchPlayerWeapon(player);
    switchPlayerWeapon(enemy);
    const RoundWinner = comparePlayersWeapons(player, enemy);
    if (!RoundWinner) {
        return [player.health, enemy.health, player.weapon, hasInit, hasRound, hasFought];
    }
    if (RoundWinner === player) {
        dealDamage(player, enemy);
        if (!CheckDeath(enemy)) {
            return [player.health, enemy.health, player.weapon, hasInit, hasRound, hasFought];
        }
        return [player.health, enemy.health, player.weapon, hasInit, hasRound, hasFought];
    }
    if (RoundWinner === enemy) {
        dealDamage(enemy, player);
        if (!CheckDeath(player)) {
            return [player.health, enemy.health, player.weapon, hasInit, hasRound, hasFought];
        }
        return [player.health, enemy.health, player.weapon, hasInit, hasRound, hasFought];
    }
    return [player.health, enemy.health, player.weapon, hasInit, hasRound, hasFought];
}

