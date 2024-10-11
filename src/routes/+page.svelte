<script lang="ts">
	import { fight, init, newRound, rerollWeapon } from '$lib';
	import type { State } from '$lib/IGame';

	let state: State = initializeState();

	function initializeState(): State {
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
			const stateAfterNewRound = newRound(state);
			if (stateAfterNewRound !== null) {
				state = stateAfterNewRound;
			}
		} catch (error) {
			console.error('Error in triggerNewRound:', error);
		}
	}

	function triggerFight() {
		try {
			const stateAfterFight = fight(state);
			if (stateAfterFight !== null) {
				state = stateAfterFight;
			}
		} catch (error) {
			console.error('Error in triggerFight:', error);
		}
	}

	function triggerRerollWeapon() {
		try {
			const stateAfterRerollWeapon = rerollWeapon(state);
			if (stateAfterRerollWeapon !== null) {
				state = stateAfterRerollWeapon;
			}
		} catch (error) {
			console.error('Error in triggerRerollWeapon:', error);
		}
	}
</script>

<section id="player" class="w-1/3">
	{#if state.hasInit === true}
		<div class="flex w-full flex-row flex-wrap items-center justify-between">
			<div class="flex w-full flex-col items-center justify-center">
				<h1 class="text-2xl font-bold">Player</h1>
				<p class="text-lg">Health: {state.playerCurrentHealth} / {state.playerMaxHealth}</p>
				{#if state.playerWeapon !== null}
					<p class="text-lg">Weapon name: {state.playerWeapon.name}</p>
					<p class="text-lg">Weapon description: {state.playerWeapon.description}</p>
				{/if}
				<button class="variant-filled-primary btn btn-xl" on:click={triggerRerollWeapon}>
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
	{#if !state.hasInit}
		<button class="variant-filled-primary btn btn-xl" on:click={triggerInit}>Start</button>
	{:else if state.hasRound && state.hasFought}
		{#if state.playerWon}
			<p class="p">You won !</p>
			<button class="variant-filled-primary btn btn-xl" on:click={triggerInit}>Play again</button>
		{:else if state.playerLost}
			<p class="p">You lost ...</p>
			<button class="variant-filled-primary btn btn-xl" on:click={triggerInit}>Play again</button>
		{:else}
			<button class="variant-filled-warning btn btn-xl" on:click={triggerNewRound}
				>Next Round</button
			>
		{/if}
	{:else if state.hasRound && !state.hasFought}
		<button class="variant-filled-error btn btn-xl" on:click={triggerFight}>Fight</button>
	{/if}
</section>

<section id="enemy" class="w-1/3">
	{#if state.hasInit === true}
		<div class="flex w-full flex-row flex-wrap items-center justify-between">
			<div class="flex w-full flex-col items-center justify-center">
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
