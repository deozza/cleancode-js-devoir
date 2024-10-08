export namespace Game {
    export interface State {
        playerMaxHealth: number | null;
        playerCurrentHealth: number | null;
        enemyMaxHealth: number | null;
        enemyCurrentHealth: number | null;
        playerWeapon: Weapon | null;
        enemyWeapon: Weapon | null;
        hasInit: boolean;
        hasRound: boolean;
        hasFought: boolean;
        playerWon: boolean;
        playerLost: boolean;
        rerollsLeft: number | null;
        pickedWeapons: Weapon[];
    }

    export interface Weapon {
        name: string;
        description: string;
        rarity: string;
    }
}