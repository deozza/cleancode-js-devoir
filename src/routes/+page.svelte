<script lang="ts">
    import { fight, init, newRound, changePlayerWeapon } from "../lib/index";
    import type { ExtendedGameState } from "../types/extendedGameState";

    let gameState: ExtendedGameState = init();

    function triggerInit() {
        gameState = init();
    }

    function triggerNewRound() {
        gameState = newRound(gameState);
    }

    function triggerFight() {
        gameState = fight(gameState);
    }

    function triggerChangeWeapon() {
        try {
            gameState = changePlayerWeapon(gameState);
        } catch (error) {
            console.error(error);
        }
    }
</script>

<div class="flex justify-center items-center min-h-screen w-full text-white">
    {#if gameState.isGameOver}
        <div class="text-center">
            {#if gameState.winner === 'player'}
                <p class="text-2xl mb-4">You won!</p>
            {:else if gameState.winner === 'enemy'}
                <p class="text-2xl mb-4">You lost...</p>
            {/if}
            <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
        </div>
    {:else}
        <div class="flex justify-center items-center w-full">
            <section id="player" class="w-1/3 text-center">
                <div class="flex flex-col items-center justify-center w-full">
                    <h1 class="text-2xl font-bold">Player</h1>
                    <p class="text-lg">Health: {gameState.player.currentHealth} / {gameState.player.maxHealth}</p>
                    <p class="text-lg">Weapon name: {gameState.player.weapon.name}</p>
                    <p class="text-lg">Weapon description: {gameState.player.weapon.description}</p>
                </div>
            </section>

            <section id="action" class="flex flex-col items-center justify-center">
                <div class="flex flex-col items-center space-y-4">
                    <button class="btn btn-xl variant-filled-error" on:click={triggerFight}>Fight</button>
                    {#if gameState.round > 1}
                        <button class="btn btn-xl variant-filled-warning" on:click={triggerNewRound}>Next Round</button>
                    {/if}
                    {#if gameState.playerWeaponChanges < 2}
                        <button class="btn btn-xl variant-filled-secondary" on:click={triggerChangeWeapon}>
                            Change Weapon ({2 - gameState.playerWeaponChanges} left)
                        </button>
                    {/if}
                </div>
            </section>

            <section id="enemy" class="w-1/3 text-center">
                <div class="flex flex-col items-center justify-center w-full">
                    <h1 class="text-2xl font-bold">Enemy</h1>
                    <p class="text-lg">Health: {gameState.enemy.currentHealth} / {gameState.enemy.maxHealth}</p>
                    <p class="text-lg">Weapon name: {gameState.enemy.weapon.name}</p>
                    <p class="text-lg">Weapon description: {gameState.enemy.weapon.description}</p>
                </div>
            </section>
        </div>
    {/if}
</div>