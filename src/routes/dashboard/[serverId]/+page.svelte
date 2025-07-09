<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { serverStore } from '$lib';
  import { fetchServers } from '$lib/fetchServers';
  import ServerSidebar from '$lib/ServerSidebar.svelte';
  import TopBar from '$lib/TopBar.svelte';
  import type { Server } from '../../../types/server';

  let serverId: string = $state(page.params.serverId);
  let server: Server | null = $state(null);

  $effect(() => {
    serverId = page.params.serverId;
  });

  $effect(() => {
    server = $serverStore.find((s) => s.id === serverId) || null;
  });

  // Fetch servers if not loaded
  if ($serverStore.length === 0) {
    fetchServers();
  }
</script>

<svelte:head>
  <title>Server Dashboard</title>
</svelte:head>

<ServerSidebar activeServerId={serverId} />
<TopBar />

<main>
  {#if server}
    <div class="server-dashboard-card {server.isBotInGuild ? 'online' : 'offline'}">
      {#if server.iconUrl}
        <img
          class="server-icon"
          src={server.iconUrl.replaceAll('.gif', '.png')}
          alt="{server.name} icon"
        />
      {:else}
        <div class="server-icon placeholder">{server.name.charAt(0)}</div>
      {/if}
      <div class="server-info">
        <h1>{server.name}</h1>
        <p class="server-id">ID: {server.id}</p>
        <p class="server-members">Members: {server.approximateMemberCount ?? 'N/A'}</p>
        <button onclick={() => goto('/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  {:else}
    <div class="server-dashboard-loading">
      <span>Loading server...</span>
    </div>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
    background: var(--color-background, #181a20);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: calc(60px + 3rem);
    margin-left: 280px;
  }
  .server-dashboard-card {
    background: var(--color-surface, #23272f);
    color: var(--color-on-surface, #f5f6fa);
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    padding: 2rem 2.5rem;
    min-width: 320px;
    max-width: 420px;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    border-left: 6px solid var(--color-primary, #5865f2);
  }
  .server-dashboard-card.offline {
    opacity: 0.7;
    border-left: 6px solid #888;
  }
  .server-icon {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 0.75rem;
    object-fit: cover;
    background: #181a20;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: #888;
  }
  .server-icon.placeholder {
    background: #23272f;
    color: #888;
  }
  .server-info {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.2rem 0;
    color: inherit;
    text-align: left;
  }
  .server-id,
  .server-members {
    color: #b5bac1;
    margin: 0.1rem 0;
    font-size: 1.05rem;
    text-align: left;
  }
  button {
    margin-top: 1.2rem;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    background: var(--color-primary, #5865f2);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.2s,
      transform 0.1s;
  }
  button:hover {
    background: #4752c4;
    transform: translateY(-2px) scale(1.03);
  }
  .server-dashboard-loading {
    margin-top: 4rem;
    color: #5865f2;
    font-size: 1.2rem;
    font-weight: 500;
  }
</style>
