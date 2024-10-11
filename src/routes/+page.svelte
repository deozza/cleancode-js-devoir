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
        rerender();
    }

    function triggerNewRound() {
        game?.newRound();
        rerender();
    }

    function triggerFight() {
        try {        
            game?.fight(game.player.weapon!);
        } catch (error) {
            console.error(error);
        } finally {
            rerender();
        }
    }

</script>

{#key rerenderKey}
    <section id="player" class="w-1/3">
        {#if isGameReady()}
            <div class="flex flex-row items-center justify-between flex-wrap w-full">
                <div class="flex flex-col items-center justify-center w-full">
                    <h1 class="text-2xl font-bold">Player</h1>
                    <p class="text-lg">Health: {game?.player.health} / {game?.player.maxHealth}</p>
                    <p class="text-lg">Weapon name: {game?.player.weapon?.name}</p>
                    <p class="text-lg">Weapon description: {game?.player.weapon?.description}</p>
                </div>
            </div>
        {/if}
    </section>

    <section id="action">
        {#if !isGameReady()}
            <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Start</button>
        {:else}
            {#if (game?.hasRound === true && game?.hasFought === true && game?.playerWon === false && game?.playerLost === false)}
                <button class="btn btn-xl variant-filled-warning" on:click={triggerNewRound}>Next Round</button>
            {/if}

            {#if (game?.hasRound === true && game?.hasFought === false && game?.playerWon === false && game?.playerLost === false)}
                <button class="btn btn-xl variant-filled-error" on:click={triggerFight}>Fight</button>
            {/if}

            {#if (game?.hasRound === true && game?.hasFought === true && game?.playerWon === true && game?.playerLost === false)}
                <p class="p">You won !</p>
                <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
            {/if}

            {#if (game?.hasRound === true && game?.hasFought === true && game?.playerWon === false && game?.playerLost === true)}
                <p class="p">You lost ...</p>
                <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
            {/if}
        {/if}
    </section>

    <section id="enemy" class="w-1/3">
        {#if isGameReady()}
            <div class="flex flex-row items-center justify-between flex-wrap w-full">
                <div class="flex flex-col items-center justify-center w-full">
                    <h1 class="text-2xl font-bold">Enemy</h1>
                    <p class="text-lg">Health: {game?.enemy.health} / {game?.enemy.maxHealth}</p>
                    {#if game?.enemy.weapon !== null}
                        <p class="text-lg">Weapon name: {game?.enemy.weapon?.name}</p>
                        <p class="text-lg">Weapon description: {game?.enemy.weapon?.description}</p>
                    {/if}
                </div>
            </div>
        {/if}
    </section>
{/key}
