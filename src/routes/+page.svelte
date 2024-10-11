<script lang="ts">

    import { Game } from "$lib/game";

    let game: Game | undefined;
    let rerenderKey = true;
    let error: string | undefined;

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
            if (error instanceof Error) {
                error = error.message;
            }
            console.error(error);
        }
        rerender();
    }

    function triggerRerollPlayerWeapon() {
        try {
            game?.player.rerollWeapon();
        } catch (error) {
            if (error instanceof Error) {
                error = error.message;
            }
            console.error(error);
        }
        rerender();
    }

</script>

{#key rerenderKey}
    {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Error:</strong>
            <span class="block sm:inline">{error}</span>
        </div>
    {/if}

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
                    <p class="text-lg text-center"><strong>Health:</strong> {game?.enemy.health} / {game?.enemy.maxHealth}</p>
                    {#if game?.enemy.weapon !== null}
                        <p class="text-lg text-center"><strong>Weapon name:</strong> {game?.enemy.weapon?.name}</p>
                        <p class="text-lg text-center"><strong>Weapon description:</strong> {game?.enemy.weapon?.description}</p>
                    {/if}
                </div>
            </div>
        {/if}
    </section>
{/key}
