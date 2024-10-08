<script lang="ts">
    import { init, newRound, fight, rerollWeapon } from "$lib";

    let game = init();
    let playerWeaponRerolls = 0;

    function triggerNewRound() {
        const newRoundResult = newRound(true);
        game.playerWeapon = newRoundResult.playerWeapon;
        game.enemyWeapon = newRoundResult.enemyWeapon;
        game.hasRound = newRoundResult.hasRound;
        game.hasFought = newRoundResult.hasFought;
        playerWeaponRerolls = newRoundResult.playerWeaponRerolls;
    }

    function triggerFight() {
        const result = fight(
            game.playerCurrentHealth,
            game.enemyCurrentHealth,
            game.playerWeapon,
            true,
            true,
            false,
            playerWeaponRerolls
        );
        game.playerCurrentHealth = result[0];
        game.enemyCurrentHealth = result[1];
        game.enemyWeapon = result[2];
        game.hasFought = result[3];
        game.playerWon = result[4];
        game.playerLost = result[5];
        playerWeaponRerolls = result[6];
    }

    function triggerRerollWeapon() {
        const result = rerollWeapon(game.playerWeapon, playerWeaponRerolls, true, true);
        game.playerWeapon = result.playerWeapon;
        playerWeaponRerolls = result.playerWeaponRerolls;
    }
</script>

<section id="player">
    {#if game.hasInit === true}
        <div class="flex flex-row items-center justify-between flex-wrap w-full">
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-2xl font-bold">Player</h1>
                <p class="text-lg">Health: {game.playerCurrentHealth} / {game.playerMaxHealth}</p>
                <p class="text-lg">Weapon name: {game.playerWeapon.name}</p>
                <p class="text-lg">Weapon description: {game.playerWeapon.description}</p>
            </div>
        </div>
    {/if}
</section>

<section id="action">
    {#if game.hasInit === false}
        <button class="btn btn-xl variant-filled-primary" on:click={init}>Start</button>
    {:else}
        {#if (game.hasRound === true && game.hasFought === true && game.playerWon === false && game.playerLost === false)}
            <button class="btn btn-xl variant-filled-warning" on:click={triggerNewRound}>Next Round</button>
        {/if}

        {#if (game.hasRound === true && game.hasFought === false && game.playerWon === false && game.playerLost === false)}
        <button class="btn btn-xl variant-filled-error" on:click={triggerFight}>Fight</button>
    {/if}

    {#if (game.hasRound === true && game.hasFought === true && game.playerWon === true && game.playerLost === false)}
        <p class="p">Vous avez gagné !</p>
        <button class="btn btn-xl variant-filled-primary" on:click={init}>Rejouer</button>
    {/if}

    {#if (game.hasRound === true && game.hasFought === true && game.playerWon === false && game.playerLost === true)}
        <p class="p">Vous avez perdu...</p>
        <button class="btn btn-xl variant-filled-primary" on:click={init}>Rejouer</button>
    {/if}

    {#if (game.hasRound === true && game.hasFought === false && game.playerWon === false && game.playerLost === false)}
        <button class="btn btn-xl variant-filled-warning" on:click={triggerRerollWeapon}>Réinitialiser l'arme</button>
    {/if}
{/if}
</section>

<section id="enemy">
{#if game.hasInit === true}
    <div class="flex flex-row items-center justify-between flex-wrap w-full">
        <div class="flex flex-col items-center justify-center w-full">
            <h1 class="text-2xl font-bold">Enemy</h1>
            <p class="text-lg">Health: {game.enemyCurrentHealth} / {game.enemyMaxHealth}</p>
            {#if game.enemyWeapon !== null}
                <p class="text-lg">Weapon name: {game.enemyWeapon.name}</p>
                <p class="text-lg">Weapon description: {game.enemyWeapon.description}</p>
            {/if}
        </div>
    </div>
{/if}
</section>