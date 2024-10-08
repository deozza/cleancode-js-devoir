<script lang="ts">
	import { fight, InitPlayers, newRound } from '$lib';

	let state: any = {
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
		playerLost: false
	};
	function triggerInit() {
		state = InitPlayers();
		console.log(state);
	}

	function triggerNewRound() {
		let response = null;
		try {
			response = newRound(state.hasInit);
		} catch (error) {
			console.error(error);
		}

		if (response !== null) {
			state.hasRound = response.hasRound;
			state.hasFought = response.hasFought;
		}
	}

	function triggerFight() {
		let response = null;

		try {
			response = fight(
				state.player.Health,
				state.enemy.Health,
				state.hasInit,
				state.hasRound,
				state.hasFought
			);
		} catch (error) {
			console.error(error);
		}

		if (response !== null) {
			state.player.health = response[0];
			state.enemy.health = response[1];
			state.enemy.weapon = response[2];
			state.hasFought = response[3];
			state.playerWon = response[4];
			state.playerLost = response[5];
		}
	}
</script>

<section id="player" class="w-1/3">
	{#if state.hasInit === true}
		<div class="flex w-full flex-row flex-wrap items-center justify-between">
			<div class="flex w-full flex-col items-center justify-center">
				<h1 class="text-2xl font-bold">Player</h1>
				<p class="text-lg">Health: {state.player.health} / {state.player.maxHealth}</p>
				<p class="text-lg">Weapon name: {state.player.weapon.name}</p>
				<p class="text-lg">Weapon description: {state.player.weapon.description}</p>
			</div>
		</div>
	{/if}
</section>

<section id="action">
	{#if state.hasInit === false}
		<button class="variant-filled-primary btn btn-xl" on:click={triggerInit}>Start</button>
	{:else}
		{#if state.hasRound === true && state.hasFought === true && state.playerWon === false && state.playerLost === false}
			<button class="variant-filled-warning btn btn-xl" on:click={triggerNewRound}
				>Next Round</button
			>
		{/if}

		{#if state.hasRound === true && state.hasFought === false && state.playerWon === false && state.playerLost === false}
			<button class="variant-filled-error btn btn-xl" on:click={triggerFight}>Fight</button>
		{/if}

		{#if state.hasRound === true && state.hasFought === true && state.playerWon === true && state.playerLost === false}
			<p class="p">You won !</p>
			<button class="variant-filled-primary btn btn-xl" on:click={triggerInit}>Play again</button>
		{/if}

		{#if state.hasRound === true && state.hasFought === true && state.playerWon === false && state.playerLost === true}
			<p class="p">You lost ...</p>
			<button class="variant-filled-primary btn btn-xl" on:click={triggerInit}>Play again</button>
		{/if}
	{/if}
</section>

<section id="enemy" class="w-1/3">
	{#if state.hasInit === true}
		<div class="flex w-full flex-row flex-wrap items-center justify-between">
			<div class="flex w-full flex-col items-center justify-center">
				<h1 class="text-2xl font-bold">Enemy</h1>
				<p class="text-lg">Health: {state.enemy.health} / {state.enemy.maxHealth}</p>
				{#if state.enemyWeapon !== null}
					<p class="text-lg">Weapon name: {state.enemy.weapon.name}</p>
					<p class="text-lg">Weapon description: {state.enemy.weapon.description}</p>
				{/if}
			</div>
		</div>
	{/if}
</section>
