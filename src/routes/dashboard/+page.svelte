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
		<h3>Hello, {$userStore?.username}</h3>
	{/if}
</main>

<style>
</style>