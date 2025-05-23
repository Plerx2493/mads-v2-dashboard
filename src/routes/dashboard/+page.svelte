<script lang="ts">
  import { fade } from 'svelte/transition';
  import { fetchUser } from '$lib/fetchUser';
  import { onMount } from 'svelte';
  import { redirectToLogin } from '$lib/redirectToLogin';
  import { serverStore, userStore } from '$lib';
  import { fetchServers } from '$lib/fetchServers';
  import ServerCard from '$lib/ServerCard.svelte';
  import UserBanner from '$lib/UserBanner.svelte';
  import ServerListSkeleton from '$lib/ServerListSkeleton.svelte';
  import ErrorMessage from '$lib/ErrorMessage.svelte';

  let isLoadingUser = $state(true);
  let isLoadingServers = $state(true);
  let wasLoading = $state(true);
  let userLoadError = $state<string | null>(null);
  let serverLoadError = $state<string | null>(null);

  async function logout() {
    // Simple logout: clear userStore and reload (replace with real logic as needed)
    $userStore = null;
    location.reload();
  }

  onMount(async () => {
    if ($userStore !== null && $userStore !== undefined) {
      isLoadingUser = false;
      wasLoading = false;
    } else {
      try {
        let user = await fetchUser();
        if (!user) redirectToLogin();
      } catch {
        userLoadError = "We can reach our backend. This should be a temporary issue. Please try again later.";
      } finally {
        isLoadingUser = false;
      }
    }

    if ($serverStore.length === 0) {
      try {
        await fetchServers();
      } catch {
        serverLoadError = "We can reach our backend. This should be a temporary issue. Please try again later.";
      }
    }
    isLoadingServers = false;
  });

</script>

<svelte:head>
  <title>Mads Dashboard</title>
</svelte:head>

<main>
  {#if userLoadError}
    <ErrorMessage message={userLoadError} showBackButton={true} />
  {:else if !isLoadingUser}
    <div in:fade={{ duration: wasLoading ?  350 : 0  }} out:fade={{ duration: 200 }}>
      <UserBanner
        username={$userStore?.username ?? ''}
        avatarUrl={$userStore?.avatarUrl ?? ''}
        onLogout={logout}
      />
      <div class="overview">
        {#if serverLoadError}
          <ErrorMessage message={serverLoadError} showBackButton={true} />
        {:else if isLoadingServers}
          <ServerListSkeleton />
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
</style>

