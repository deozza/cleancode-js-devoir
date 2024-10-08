<script lang="ts">
    import { fight, init, newRound } from "$lib";

    enum GameState {
        NOT_INITIATED = 'not_initiated',
        INITIALIZED = 'initialized',
        ROUND_STARTED = 'round_started',
        ROUND_PLAYED = 'round_played',
        PLAYER_WON = 'player_won',
        PLAYER_LOST = 'player_lost'
    }

    let state = {
        playerMaxHealth: null,
        playerCurrentHealth: null,
        enemyMaxHealth: null,
        enemyCurrentHealth: null,
        playerWeapon: null,
        enemyWeapon: null,
        gameStatus: GameState.NOT_INITIATED
    };

    function triggerInit() {
        const initialState = init();
        state = {
            ...initialState,
            gameStatus: GameState.INITIALIZED
        };
    }

    function triggerNewRound() {
        const response = newRound();
        state = {
            ...state,
            playerWeapon: response.playerWeapon,
            enemyWeapon: response.enemyWeapon,
            gameStatus: GameState.ROUND_STARTED
        };
    }

    function triggerFight() {
        const response = fight(
            state.playerCurrentHealth,
            state.enemyCurrentHealth,
            state.playerWeapon
        );
        
        state = {
            ...state,
            playerCurrentHealth: response.playerHealth,
            enemyCurrentHealth: response.enemyHealth,
            enemyWeapon: response.enemyWeapon
        };

        if (response.hasWon) {
            state.gameStatus = GameState.PLAYER_WON;
        } else if (response.hasLost) {
            state.gameStatus = GameState.PLAYER_LOST;
        } else {
            state.gameStatus = GameState.ROUND_PLAYED;
        }
    }
</script>

<!-- Player Section -->
<section id="player" class="w-1/3">
    {#if state.gameStatus === GameState.INITIALIZED || state.gameStatus === GameState.ROUND_STARTED || state.gameStatus === GameState.ROUND_PLAYED}
        <div class="flex flex-row items-center justify-between flex-wrap w-full">
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-2xl font-bold">Player</h1>
                <p class="text-lg">Health: {state.playerCurrentHealth} / {state.playerMaxHealth}</p>
                <p class="text-lg">Weapon name: {state.playerWeapon.name}</p>
                <p class="text-lg">Weapon description: {state.playerWeapon.description}</p>
            </div>
        </div>
    {/if}
</section>

<!-- Action Section -->
<section id="action">
    {#if state.gameStatus === GameState.NOT_INITIATED}
        <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Start</button>
    {:else if state.gameStatus === GameState.INITIALIZED}
        <button class="btn btn-xl variant-filled-error" on:click={triggerFight}>Fight</button>
    {:else if state.gameStatus === GameState.ROUND_PLAYED}
        <button class="btn btn-xl variant-filled-warning" on:click={triggerNewRound}>Next Round</button>
    {:else if state.gameStatus === GameState.PLAYER_WON}
        <p class="p">You won!</p>
        <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
    {:else if state.gameStatus === GameState.PLAYER_LOST}
        <p class="p">You lost ...</p>
        <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
    {/if}
</section>

<!-- Enemy Section -->
<section id="enemy" class="w-1/3">
    {#if state.gameStatus === GameState.INITIALIZED || state.gameStatus === GameState.ROUND_STARTED || state.gameStatus === GameState.ROUND_PLAYED}
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
