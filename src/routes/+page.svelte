<script lang="ts">
    import { fight, init, newRound } from "$lib";

    let state: any = {
        player: null,
        enemy: null,
        rerollCount: 0,
        gameState: "notStarted",
        hasFought: false
    };

    function triggerInit() {
        const { player, enemy, rerollCount, hasFought } = init();
        state.player = player;
        state.enemy = enemy;
        state.rerollCount = rerollCount;
        state.hasFought = hasFought;
        state.gameState = "initialized";
    }

    function triggerNewRound() {
        let response = null;
        try {
            response = newRound(state);
        } catch (error) {
            console.error(error);
        }

        if (response !== null) {
            state.player.weapon = response.playerWeapon;
            state.enemy.weapon = response.enemyWeapon;
            state.gameState = "roundInProgress"; 
        }
    }

    function triggerFight() {
        let response = null;

        try {
            response = fight(state.player, state.enemy, state.hasFought);
        } catch (error) {
            console.error(error);
        }

        if (response !== null) {
            state.player = response.updatedPlayer;
            state.enemy = response.updatedEnemy;
            state.gameState = response.fightOutcome.playerWon ? "won" : (response.fightOutcome.playerLost ? "lost" : "fightInProgress");
        }
    }
</script>

<section id="player" class="w-1/3">
    {#if state.gameState !== "notStarted"}
        <div class="flex flex-row items-center justify-between flex-wrap w-full">
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-2xl font-bold">Player</h1>
                <p class="text-lg">Health: {state.player.currentHealth} / {state.player.maxHealth}</p>
                {#if state.player.weapon}
                    <p class="text-lg">Weapon name: {state.player.weapon.name}</p>
                    <p class="text-lg">Weapon description: {state.player.weapon.description}</p>
                {/if}
            </div>
        </div>
    {/if}
</section>

<section id="action">
    {#if state.gameState === "notStarted"}
        <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Start</button>
    {:else if state.gameState === "roundInProgress"}
        <button class="btn btn-xl variant-filled-error" on:click={triggerFight}>Fight</button>
    {:else if state.gameState === "fightInProgress"}
        <button class="btn btn-xl variant-filled-warning" on:click={triggerNewRound}>Next Round</button>
    {:else if state.gameState === "won"}
        <p class="p">You won!</p>
        <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
    {:else if state.gameState === "lost"}
        <p class="p">You lost...</p>
        <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
    {/if}
</section>

<section id="enemy" class="w-1/3">
    {#if state.gameState !== "notStarted"}
        <div class="flex flex-row items-center justify-between flex-wrap w-full">
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-2xl font-bold">Enemy</h1>
                <p class="text-lg">Health: {state.enemy.currentHealth} / {state.enemy.maxHealth}</p>
                {#if state.enemy.weapon}
                    <p class="text-lg">Weapon name: {state.enemy.weapon.name}</p>
                    <p class="text-lg">Weapon description: {state.enemy.weapon.description}</p>
                {/if}
            </div>
        </div>
    {/if}
</section>
