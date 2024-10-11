<script lang="ts">
    import { fight, init, newRound } from "$lib";
    import type { GameStatus } from "$lib";
    
    let state: any = {
        RoundInit: false,
        RoundActive: false,
        RoundPlayed: false,
        playerMaxHealth: null,
        playerCurrentHealth: null,
        enemyMaxHealth: null,
        enemyCurrentHealth: null,
        playerWeapon: null,
        enemyWeapon: null,
    };
    
    function triggerInit() {
        state = init();
    }
    
    function triggerNewRound() {
        let response = null;
        try {        
            response = newRound(state);
        } catch (error) {
            console.error(error);
        }
    
        if (response !== null) {
            state.playerWeapon = response.playerWeapon;
            state.enemyWeapon = response.enemyWeapon;
            state.RoundActive = true;  // Mise à jour de l'état du round
            state.RoundPlayed = false; // Remet à faux pour le nouveau round
        }
    }
    
    function triggerFight() {
        let response = null;
    
        try {        
            response = fight(state.playerCurrentHealth, state.enemyCurrentHealth, state.playerWeapon, state);
        } catch (error) {
            console.error(error);
        }
    
        if (response !== null) {
            state.playerCurrentHealth = response[0];
            state.enemyCurrentHealth = response[1];
            state.enemyWeapon = response[2];
            state.RoundPlayed = response[3];
            state.roundActive = true; // Le round est toujours actif après le combat
            if (response[4]) {
                // Si le joueur a gagné
                state.roundPlayed = true; // Le round est joué
            }
            if (response[5]) {
                // Si le joueur a perdu
                state.RoundPlayed = true; // Le round est joué
            }
        }
    }
    </script>
    
    <section id="player" class="w-1/3">
        {#if state.RoundInit}
            <div class="flex flex-row items-center justify-between flex-wrap w-full">
                <div class="flex flex-col items-center justify-center w-full">
                    <h1 class="text-2xl font-bold">Player</h1>
                    <p class="text-lg">Health: {state.playerCurrentHealth} / {state.playerMaxHealth}</p>
                    <p class="text-lg">Weapon name: {state.playerWeapon?.name}</p>
                    <p class="text-lg">Weapon description: {state.playerWeapon?.description}</p>
                </div>
            </div>
        {/if}
    </section>
    
    <section id="action">
        {#if !state.RoundInit}
            <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Start</button>
        {:else}
            {#if state.RoundActive && !state.RoundPlayed}
                <button class="btn btn-xl variant-filled-error" on:click={triggerFight}>Fight</button>
            {/if}
    
            {#if state.RoundActive && state.RoundPlayed && !state.playerWon && !state.playerLost}
                <button class="btn btn-xl variant-filled-warning" on:click={triggerNewRound}>Next Round</button>
            {/if}
    
            {#if state.RoundActive && state.RoundPlayed && state.playerWon}
                <p class="p">You won!</p>
                <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
            {/if}
    
            {#if state.RoundActive && state.RoundPlayed && state.playerLost}
                <p class="p">You lost...</p>
                <button class="btn btn-xl variant-filled-primary" on:click={triggerInit}>Play again</button>
            {/if}
        {/if}
    </section>
    
    <section id="enemy" class="w-1/3">
        {#if state.RoundInit}
            <div class="flex flex-row items-center justify-between flex-wrap w-full">
                <div class="flex flex-col items-center justify-center w-full">
                    <h1 class="text-2xl font-bold">Enemy</h1>
                    <p class="text-lg">Health: {state.enemyCurrentHealth} / {state.enemyMaxHealth}</p>
                    {#if state.enemyWeapon}
                        <p class="text-lg">Weapon name: {state.enemyWeapon.name}</p>
                        <p class="text-lg">Weapon description: {state.enemyWeapon.description}</p>
                    {/if}
                </div>
            </div>
        {/if}
    </section>    