<script lang="ts">

    import { fight, init, newRound, rerollWeapon } from "$lib";
    	import type { Game } from "$lib/gameState";

    let state: Game.State = initializeState();

    function initializeState(): Game.State {
        return {
            playerMaxHealth: null,
            playerCurrentHealth: null,
            enemyMaxHealth: null,
            enemyCurrentHealth: null,
            playerWeapon: null,
            enemyWeapon: null,
            hasInit: false,
            hasRound: false,
            hasFought: false,
            playerWon: false,
            playerLost: false,
            rerollsLeft: null,
            pickedWeapons: []
        };
    }

    function triggerInit() {
        state = init();
    }



    function triggerNewRound() {
        try {
            const response = newRound(state.hasInit);
            
            if(response !== null) {
                state.playerWeapon = response.playerWeapon;
                state.enemyWeapon = response.enemyWeapon;
                state.hasRound = response.hasRound;
                state.hasFought = response.hasFought;
            }

        } catch (error) {
            console.error('Error in triggerNewRound:', error);
        }
    }

    function triggerFight() {
        try {
            const response = fight(state.playerCurrentHealth ?? 0, state.enemyCurrentHealth ?? 0, state.playerWeapon, state.hasInit, state.hasRound, state.hasFought);

            if(response !== null) {
                state.playerCurrentHealth = response.playerHealth;
                state.enemyCurrentHealth = response.enemyHealth;
                state.enemyWeapon = response.enemyWeapon;
                state.hasFought = response.hasFought;
                state.playerWon = response.playerWon;
                state.playerLost = response.playerLost;
            }
            
        } catch (error) {
            console.error('Error in triggerFight:', error);
        }
    }

    function triggerRerollWeapon() {
        try {
            const response = rerollWeapon(state);

            if(response !== null) {
                state.playerWeapon = response.playerWeapon;
                state.rerollsLeft = response.rerollsLeft;
                state.pickedWeapons = response.pickedWeapons;
            }
        } catch (error) {
            console.error('Error in triggerRerollWeapon:', error);
        }
    }

</script>


<section id="player" class="w-1/3">
    {#if state.hasInit === true}
        <div class="flex flex-row items-center justify-between flex-wrap w-full">
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-2xl font-bold">Player</h1>
                <p class="text-lg">Health: {state.playerCurrentHealth} / {state.playerMaxHealth}</p>
                {#if state.playerWeapon !== null}
                    <p class="text-lg">Weapon name: {state.playerWeapon.name}</p>
                    <p class="text-lg">Weapon description: {state.playerWeapon.description}</p>
                {/if}
                <button class="btn btn-xl variant-filled-primary" on:click={triggerRerollWeapon}>
                    {#if state.rerollsLeft === 0 || state.rerollsLeft === null}
                        No rerolls left
                    {:else}
                        Reroll weapon
                    {/if}
                </button>
            </div>
        </div>
    {/if}
</section>

<section id="action">
    {#if state.hasInit === false}
        <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Start</button>
    {:else}
        {#if (state.hasRound === true && state.hasFought === true && state.playerWon === false && state.playerLost === false)}
            <button class="btn btn-xl variant-filled-warning" on:click={triggerNewRound}>Next Round</button>
        {/if}

        {#if (state.hasRound === true && state.hasFought === false && state.playerWon === false && state.playerLost === false)}
            <button class="btn btn-xl variant-filled-error" on:click={triggerFight}>Fight</button>
        {/if}

        {#if (state.hasRound === true && state.hasFought === true && state.playerWon === true && state.playerLost === false)}
            <p class="p">You won !</p>
            <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
        {/if}

        {#if (state.hasRound === true && state.hasFought === true && state.playerWon === false && state.playerLost === true)}
            <p class="p">You lost ...</p>
            <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
        {/if}
    {/if}
</section>

<section id="enemy" class="w-1/3">
    {#if state.hasInit === true}
        <div class="flex flex-row items-center justify-between flex-wrap w-full">
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-2xl font-bold">Enemy</h1>
                <p class="text-lg">Health: {state.enemyCurrentHealth} / {state.enemyMaxHealth}</p>
                {#if state.enemyWeapon !== null}
                    <p class="text-lg">Weapon name: {state.enemyWeapon.name}</p>
                    <p class="text-lg">Weapon description: {state.enemyWeapon.description}</p>
                {/if}
            </div>
        </div>
    {/if}
</section>
