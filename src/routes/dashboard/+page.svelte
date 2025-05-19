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
          <div class="servers-list-skeleton">
            {#each [1,2,3] as i (i)}
              <div class="server-card-skeleton">
                <div class="skeleton-avatar shimmer"></div>
                <div class="skeleton-lines">
                  <div class="skeleton-line shimmer" style="width: 60%"></div>
                  <div class="skeleton-line shimmer" style="width: 40%"></div>
                </div>
              </div>
            {/each}
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
    <div class="user-banner-skeleton centered">
      <div class="skeleton-avatar shimmer large"></div>
      <div class="skeleton-line shimmer" style="width: 200px; height: 2.5rem; margin-top: 1.5rem;"></div>
      <div class="skeleton-line shimmer" style="width: 150px; height: 1.2rem; margin-top: 0.5rem;"></div>
    </div>
  {/if}
</main>

<style>
  .banner {
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(90deg, var(--color-primary) 60%, var(--color-secondary) 100%);
    color: white;
    padding: 2rem 0;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    overflow-x: hidden;
  }
  .banner-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    gap: 2rem;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .greeting {
    flex: 1 1 200px;
    min-width: 0;
  }
  .greeting h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
    word-break: break-word;
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
    flex-shrink: 0;
    order: 2;
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
    order: 3;
    flex-basis: 100%;
    margin-top: 1rem;
    align-self: flex-end;
    max-width: 200px;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .servers-list-skeleton {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .server-card-skeleton {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem 2rem;
    min-width: 220px;
    flex: 1 1 220px;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .skeleton-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    background: #333a44;
  }
  .skeleton-avatar.large {
    width: 6rem;
    height: 6rem;
  }
  .skeleton-lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  .skeleton-line {
    height: 1.2rem;
    border-radius: 0.5rem;
    background: #333a44;
  }
  .user-banner-skeleton.centered {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadein 0.3s;
  }
  .shimmer {
    position: relative;
    overflow: hidden;
  }
  .shimmer::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    animation: shimmer 1.2s infinite;
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @media (max-width: 700px) {
    .banner-content {
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .avatar {
      width: 4rem;
      height: 4rem;
      margin: 0 0 1rem auto;
    }
    .greeting h1 {
      font-size: 1.6rem;
    }
    .greeting p {
      font-size: 1rem;
    }
    .logout {
      width: 100%;
      padding: 0.75rem 0;
      font-size: 1rem;
      margin-top: 0.5rem;
      align-self: flex-end;
      max-width: none;
    }
  }
</style>

