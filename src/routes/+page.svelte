<script lang="ts">
    import { fight, init, newRound } from "../lib/index";
    import type { GameState } from "../types/gameType"

    let gameState: GameState = init();

    function enableNewRound() {
        gameState = newRound(gameState);
    }

    function enableFight() {
        gameState = fight(gameState);
    }

    function resetGame() {
        gameState = init();
    }
</script>


<section id="player" class="w-1/3">
    <div class="flex flex-row items-center justify-between flex-wrap w-full">
        <div class="flex flex-col items-center justify-center w-full">
            <h1 class="text-2xl font-bold">Player</h1>
            <p class="text-lg">Health: {gameState.player.currentHealth} / {gameState.player.maxHealth}</p>
            <p class="text-lg">Weapon name: {gameState.player.weapon.name}</p>
            <p class="text-lg">Weapon description: {gameState.player.weapon.description}</p>
        </div>
    </div>
</section>

<section id="action">
    {#if gameState.isGameOver}
        {#if gameState.winner === 'player'}
            <p class="p">You won!</p>
        {:else if gameState.winner === 'enemy'}
            <p class="p">You lost...</p>
        {/if}
        <button class="btn btn-xl variant-filled-primary" on:click={resetGame}>Play again</button>
    {:else}
        {#if gameState.round > 1}
            <button class="btn btn-xl variant-filled-warning" on:click={enableNewRound}>Next Round</button>
        {/if}
        <button class="btn btn-xl variant-filled-error" on:click={enableFight}>Fight</button>
    {/if}
</section>

<section id="enemy" class="w-1/3">
    <div class="flex flex-row items-center justify-between flex-wrap w-full">
        <div class="flex flex-col items-center justify-center w-full">
            <h1 class="text-2xl font-bold">Enemy</h1>
            <p class="text-lg">Health: {gameState.enemy.currentHealth} / {gameState.enemy.maxHealth}</p>
            <p class="text-lg">Weapon name: {gameState.enemy.weapon.name}</p>
            <p class="text-lg">Weapon description: {gameState.enemy.weapon.description}</p>
        </div>
    </div>
</section>