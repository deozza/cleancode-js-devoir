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

<section id="player" class="w-1/3">
    {#if !gameState.isGameOver}
        <div class="flex flex-row items-center justify-between flex-wrap w-full">
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-2xl font-bold">Player</h1>
                <p class="text-lg">Health: {gameState.player.currentHealth} / {gameState.player.maxHealth}</p>
                <p class="text-lg">Weapon name: {gameState.player.weapon.name}</p>
                <p class="text-lg">Weapon description: {gameState.player.weapon.description}</p>
            </div>
        </div>
    {/if}
</section>

<section id="action">
    {#if gameState.isGameOver}
        {#if gameState.winner === 'player'}
            <p class="p">You won!</p>
        {:else if gameState.winner === 'enemy'}
            <p class="p">You lost...</p>
        {/if}
        <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
    {:else}
        <button class="btn btn-xl variant-filled-error" on:click={triggerFight}>Fight</button>
        {#if gameState.round > 1}
            <button class="btn btn-xl variant-filled-warning" on:click={triggerNewRound}>Next Round</button>
        {/if}
        {#if gameState.playerWeaponChanges < 2}
            <button class="btn btn-xl variant-filled-secondary" on:click={triggerChangeWeapon}>
                Change Weapon ({2 - gameState.playerWeaponChanges} left)
            </button>
        {/if}
    {/if}
</section>

<section id="enemy" class="w-1/3">
    {#if !gameState.isGameOver}
        <div class="flex flex-row items-center justify-between flex-wrap w-full">
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-2xl font-bold">Enemy</h1>
                <p class="text-lg">Health: {gameState.enemy.currentHealth} / {gameState.enemy.maxHealth}</p>
                <p class="text-lg">Weapon name: {gameState.enemy.weapon.name}</p>
                <p class="text-lg">Weapon description: {gameState.enemy.weapon.description}</p>
            </div>
        </div>
    {/if}
</section>