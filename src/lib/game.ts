import type { Actor } from './actor';
import { Player } from './player';

export class Game implements Actor {
    player = new Player({ health: 10, maxHealth: 10 });
    enemy = new Player({ health: 10, maxHealth: 10 });
    state: Game.GameState = Game.GameState.INITIALIZED;

    startNewRound() {
        this.state = Game.GameState.ROUND_STARTED;
        this.player.startNewRound();
        this.enemy.startNewRound();
    }

    fight(): void {
        this.assertCanFight();

        const { playerDamages, enemyDamages } = this.getDamages();

        this.state = Game.GameState.ROUND_ENDED;

        if (playerDamages === enemyDamages) {
            return;
        }

        if (playerDamages > enemyDamages) {
            this.enemy.applyDamage(playerDamages - enemyDamages);
        }

        if (playerDamages < enemyDamages) {
            this.player.applyDamage(enemyDamages - playerDamages);
        }

        this.determineWinner();
    }

    private assertCanFight() {
        if (this.state === Game.GameState.ROUND_ENDED) throw new Error('Round already played');
        if (this.state !== Game.GameState.ROUND_STARTED) throw new Error('Round not initialized');
    }

    private getDamages() {
        const playerWeapon = this.player.weapon;
        const enemyWeapon = this.enemy.weapon;

        if (!playerWeapon || !enemyWeapon) {
            throw new Error('Player or enemy weapon not initialized');
        }

        const playerDamages = playerWeapon.getDamage();
        const enemyDamages = enemyWeapon.getDamage();

        return { playerDamages, enemyDamages };
    }

    private determineWinner(): void {
        if (this.player.health === 0) this.state = Game.GameState.PLAYER_LOST;
        if (this.enemy.health === 0) this.state = Game.GameState.PLAYER_WON;
    }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Game {
    export enum GameState {
        INITIALIZED,
        ROUND_STARTED,
        ROUND_ENDED,
        PLAYER_WON,
        PLAYER_LOST,
    }
}
