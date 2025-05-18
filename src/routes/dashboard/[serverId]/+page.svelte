<script lang="ts">
  import { getStores } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Server } from '../../../types/server';

  let serverId: string = '';
  let server: Server | null = null;

  let page = getStores().page;

  // Extract serverId from the URL
  page.subscribe(({ params }) => {
    serverId = params.serverId;
  });

  // TODO: Replace with real API call
  onMount(async () => {
    // Simulate loading server data
    server = {
      id: serverId,
      name: 'Mock Server',
      iconUrl: null,
      approximateMemberCount: 42,
      isBotInGuild: true
    };
  });
</script>

<svelte:head>
  <title>Server Dashboard</title>
</svelte:head>

{#if server}
  <div class="server-dashboard">
    <h1>{server.name}</h1>
    <p>Server ID: {server.id}</p>
    <p>Members: {server.approximateMemberCount}</p>
    <button on:click={() => goto('/dashboard')}>Back to Dashboard</button>
  </div>
{:else}
  <div class="server-dashboard-loading">
    <span>Loading server...</span>
  </div>
{/if}

<style>
  .server-dashboard {
    padding: 2rem;
    max-width: 500px;
    margin: 2rem auto;
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    color: var(--color-on-surface, #f5f6fa);
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .server-dashboard-loading {
    text-align: center;
    margin: 4rem 0;
    color: #888;
  }
</style>

