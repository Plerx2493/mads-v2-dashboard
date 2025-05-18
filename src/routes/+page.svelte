<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Mads</title>
</svelte:head>

<main in:fade>
  <section class="hero">
    <h1>Mads</h1>
    <a href="/dashboard" class="button secondary">Dashboard</a>
  </section>
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

  .secondary {
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
  }
</style>
