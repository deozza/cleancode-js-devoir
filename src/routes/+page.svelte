<script lang="ts">

    import { Game } from "$lib";

    let game: Game | undefined;
    let rerenderKey = true;

    function rerender() {
        rerenderKey = !rerenderKey;
    }

    function isGameReady() {
        return game !== undefined;
    }

    function triggerInit() {
        game = new Game();
        game.startNewRound();
        rerender();
    }

    function triggerNewRound() {
        game!.startNewRound();
        rerender();
    }

    function triggerFight() {
        try {
            game!.fight();
        } catch (error) {
            console.error(error);
        }
        rerender();
    }

    function triggerRerollPlayerWeapon() {
        game?.player.rerollWeapon();
        rerender();
    }

</script>

{#key rerenderKey}
    <section id="player" class="w-1/3">
        {#if isGameReady()}
            <div class="flex flex-row items-center justify-between flex-wrap w-full">
                <div class="flex flex-col items-center justify-center w-full">
                    <h1 class="text-2xl font-bold">Player</h1>
                    <p class="text-lg text-center"><strong>Health:</strong> {game?.player.health} / {game?.player.maxHealth}</p>
                    <p class="text-lg text-center"><strong>Weapon name:</strong> {game?.player.weapon?.name}</p>
                    <p class="text-lg text-center"><strong>Weapon description:</strong> {game?.player.weapon?.description}</p>
                </div>
            </div>
        {/if}
    </section>

    <section id="action" class="flex flex-col items-center justify-center gap-4">
        {#if !isGameReady()}
            <button class="btn btn-xl variant-filled-primary w-full" on:click={triggerInit}>Start</button>
        {:else}
             {#if (game?.state === Game.GameState.ROUND_ENDED)}
                <button class="btn btn-xl variant-filled-warning w-full" on:click={triggerNewRound}>Next Round</button>
            {/if}

            {#if (game?.player.canRerollWeapon() && game?.state === Game.GameState.ROUND_STARTED)}
                <button class="btn btn-xl variant-filled-primary w-full" on:click={triggerRerollPlayerWeapon}>Reroll weapon</button>
            {/if}

            {#if (game?.state === Game.GameState.ROUND_STARTED)}
                <button class="btn btn-xl variant-filled-error w-full" on:click={triggerFight}>Fight</button>
            {/if}

            {#if (game?.state === Game.GameState.PLAYER_WON)}
                <p class="p">You won !</p>
                <button class="btn btn-xl variant-filled-primary w-full" on:click={triggerInit}>Play again</button>
            {/if}

            {#if (game?.state === Game.GameState.PLAYER_LOST)}
                <p class="p">You lost ...</p>
                <button class="btn btn-xl variant-filled-primary w-full" on:click={triggerInit}>Play again</button>
            {/if}
        {/if}
    </section>

    <section id="enemy" class="w-1/3">
        {#if isGameReady()}
            <div class="flex flex-row items-center justify-between flex-wrap w-full">
                <div class="flex flex-col items-center justify-center w-full">
                    <h1 class="text-2xl font-bold">Enemy</h1>
                    <p class="text-lg text-center">Health: {game?.enemy.health} / {game?.enemy.maxHealth}</p>
                    {#if game?.enemy.weapon !== null}
                        <p class="text-lg text-center">Weapon name: {game?.enemy.weapon?.name}</p>
                        <p class="text-lg text-center">Weapon description: {game?.enemy.weapon?.description}</p>
                    {/if}
                </div>
            </div>
        {/if}
    </section>
{/key}
