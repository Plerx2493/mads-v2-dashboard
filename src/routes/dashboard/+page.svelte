<script lang="ts">
  import { fade } from 'svelte/transition';
  import { fetchUser } from '$lib/fetchUser';
  import { onMount } from 'svelte';
  import { redirectToLogin } from '$lib/redirectToLogin';
  import { serverStore, userStore } from '$lib';
  import { fetchServers } from '$lib/fetchServers';
  import ServerCard from './ServerCard.svelte';

  let isLoadingUser = $state(true);
  let isLoadingServers = $state(true);
  let wasLoading = $state(true);

  async function logout() {
    // Simple logout: clear userStore and reload (replace with real logic as needed)
    $userStore = null;
    location.reload();
  }

  onMount(async () => {
    if ($userStore !== null && $userStore !== undefined) {
      isLoadingUser = false;
      wasLoading = false;
    }
    else {
      let user = await fetchUser();
      if (!user) redirectToLogin();
      isLoadingUser = false;
    }

    if ($serverStore.length === 0)
      await fetchServers();

    isLoadingServers = false;
  });

</script>

<svelte:head>
  <title>Mads Dashboard</title>
</svelte:head>

<main>
  {#if !isLoadingUser}
    <div in:fade={{ duration: wasLoading ?  350 : 0  }} out:fade={{ duration: 200 }}>
      <div class="banner">
        <div class="banner-content">
          <div class="greeting">
            <h1>Hello, {$userStore?.username}!</h1>
            <p>Welcome back to your dashboard.</p>
          </div>
          <img src={$userStore?.avatarUrl} alt="User avatar" class="avatar" />
          <button class="logout" onclick={logout}>Logout</button>
        </div>
      </div>
      <div class="overview">
        {#if isLoadingServers}
          <div class="servers-list-loading" in:fade out:fade>
            <div class="spinner"></div>
            <span>Loading servers...</span>
          </div>
        {:else if $serverStore.length > 0}
          <div class="servers-list">
            {#each $serverStore as server (server)}
              <ServerCard {server} />
            {/each}
          </div>
        {:else}
          <p in:fade>You don't manage any servers yet.</p>
        {/if}
      </div>
    </div>
  {:else}
    <div class="user-loading centered" in:fade={{ duration: 350 }} out:fade={{ duration: 200 }}>
      <div class="spinner"></div>
      <span>Loading user...</span>
    </div>
  {/if}
</main>

<style>
  .banner {
    width: 100vw;
    background: linear-gradient(90deg, var(--color-primary) 60%, var(--color-secondary) 100%);
    color: white;
    padding: 2rem 0;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .banner-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  .greeting h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }
  .greeting p {
    margin: 0.5rem 0 0 0;
    font-size: 1.2rem;
  }
  .avatar {
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    margin: 0 2rem;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .logout {
    background: var(--color-danger, #e74c3c);
    color: white;
    border: none;
    border-radius: 2rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .logout:hover {
    background: #c0392b;
  }
  .overview {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }
  .servers-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1rem;
  }
  .servers-list-loading, .user-loading {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.2rem;
    color: var(--color-on-surface, #f5f6fa);
    min-height: 4rem;
  }
  .user-loading.centered {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: var(--color-on-surface, #f5f6fa);
    animation: fadein 0.3s;
  }
  .spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid #444;
    border-top: 3px solid var(--color-primary, #6cf);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
