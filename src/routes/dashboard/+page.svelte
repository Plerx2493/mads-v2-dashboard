<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getUser } from '$lib/getUser';
	import { onMount } from 'svelte';
	import { userStore } from '$lib';

	function redirectToLogin() {
		window.location.href = `https://devenv.plerx.dev/api/user/login?ReturnUrl=` + window.location.href;
	}

	let isLoaded = false;

	onMount(async () => {
		let user = await getUser();

		if (user === null)
			redirectToLogin();

		isLoaded = true;
		userStore.set(user);
	});

</script>

<svelte:head>
	<title>Mads Dashboard</title>
</svelte:head>

<main in:fade>
	{#if isLoaded}
		<h1>Hello, {$userStore?.username}</h1>
		{:else }
		<h1>Loading...</h1>
	{/if}
</main>

<style>
	h1 {
		text-align: center;
		margin-top: 20vh;
	}
</style>