<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getUser } from '$lib/getUser';

	function redirectToLogin() {
		window.location.href = `https://devenv.plerx.dev/api/user/login?ReturnUrl=` + window.location.href;
	}
</script>

<svelte:head>
	<title>Mads</title>
<!--	<meta name="description" content="A powerful Discord bot for your server" />-->
</svelte:head>

<main in:fade>
	<section class="hero">
		<h1>Mads</h1>
<!--		<p class="tagline">Your Ultimate Discord Companion</p>-->
		<div class="cta-buttons">
<!--			<a href="https://discord.com/oauth2/authorize" class="button primary">Add to Discord</a>-->
			<a href="/dashboard" class="button secondary">Dashboard</a>
<!--			{#await getUser()}-->
<!--				<h3>Fetching...</h3>-->
<!--			{:then value}-->
<!--				{#if value !== null}-->
<!--					<h3>Hello, {value?.name}</h3>-->
<!--				{:else}-->
<!--					<a-->
<!--						href="/login"-->
<!--						on:click={(e) => {-->
<!--    					e.preventDefault();-->
<!--    					redirectToLogin();-->
<!--  					}}-->
<!--						class="button secondary"-->
<!--						role="button"-->
<!--					>-->
<!--						Login-->
<!--					</a>-->
<!--				{/if}-->
<!--			{/await}-->
		</div>
	</section>

	<!--	<section id="features" class="features">-->
	<!--		<h2>Features</h2>-->
	<!--		<div class="feature-grid">-->
	<!--			<div class="feature-card">-->
	<!--				<h3>Moderation</h3>-->
	<!--				<p>Keep your server safe with powerful moderation tools</p>-->
	<!--			</div>-->
	<!--			<div class="feature-card">-->
	<!--				<h3>Music</h3>-->
	<!--				<p>High-quality music streaming from multiple sources</p>-->
	<!--			</div>-->
	<!--			<div class="feature-card">-->
	<!--				<h3>Custom Commands</h3>-->
	<!--				<p>Create and manage custom commands easily</p>-->
	<!--			</div>-->
	<!--			<div class="feature-card">-->
	<!--				<h3>Auto Roles</h3>-->
	<!--				<p>Automatically assign roles to new members</p>-->
	<!--			</div>-->
	<!--		</div>-->
	<!--	</section>-->

	<!--	<section class="stats">-->
	<!--		<div class="stat">-->
	<!--			<h3>100K+</h3>-->
	<!--			<p>Servers</p>-->
	<!--		</div>-->
	<!--		<div class="stat">-->
	<!--			<h3>1M+</h3>-->
	<!--			<p>Users</p>-->
	<!--		</div>-->
	<!--		<div class="stat">-->
	<!--			<h3>99.9%</h3>-->
	<!--			<p>Uptime</p>-->
	<!--		</div>-->
	<!--	</section>-->
</main>

<style>
    main {
        padding: 0;
        max-width: 100%;
        margin: 0;
    }

    .hero {
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-primary) 100%);
        color: white;
        padding: 2rem;
    }

    h1 {
        font-size: 4rem;
        margin: 0;
        font-weight: 700;
    }

    .tagline {
        font-size: 1.5rem;
        margin: 1rem 0 2rem;
        opacity: 0.9;
    }

    .cta-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }

    .button {
        padding: 0.8rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        transition: transform 0.2s;
        text-decoration: none;
    }

    .button:hover {
        transform: translateY(-2px);
    }

    .primary {
        background: var(--color-primary);
        color: var(--color-bg);
    }

    .secondary {
        border: 2px solid var(--color-primary);
        color: var(--color-primary);
    }

    .features {
        padding: 4rem 2rem;
        background: var(--color-bg);
        text-align: center;
    }

    h2 {
        font-size: 2.5rem;
        margin-bottom: 3rem;
        color: var(--color-primary);
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .feature-card {
        padding: 2rem;
        background: var(--color-card);
        border-radius: 10px;
        transition: transform 0.2s;
        border: 1px solid var(--color-primary);
    }

    .feature-card:hover {
        transform: translateY(-5px);
    }

    .feature-card h3 {
        color: var(--color-primary);
        margin-bottom: 1rem;
    }

    .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        padding: 4rem 2rem;
        background: var(--color-card);
        text-align: center;
    }

    .stat h3 {
        font-size: 2.5rem;
        color: var(--color-primary);
        margin: 0;
    }

    .stat p {
        margin: 0;
        color: var(--color-text);
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 3rem;
        }

        .tagline {
            font-size: 1.2rem;
        }

        .cta-buttons {
            flex-direction: column;
        }

        .button {
            width: 100%;
        }
    }
</style>