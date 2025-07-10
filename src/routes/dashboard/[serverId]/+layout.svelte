<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { serverStore, userStore } from '$lib';
  import { fetchServers } from '$lib/fetchServers';
  import AuthGuard from '$lib/AuthGuard.svelte';
  import ServerSidebar from '$lib/ServerSidebar.svelte';
  import TopBar from '$lib/TopBar.svelte';
  import ServerModuleNav from '$lib/ServerModuleNav.svelte';
  import type { Server } from '../../../types/server';

  let serverId: string = $state(page.params.serverId);
  let server: Server | null = $state(null);
  
  $effect(() => {
    serverId = page.params.serverId;
  });
  
  $effect(() => {
    server = $serverStore.find(s => s.id === serverId) || null;
  });

  // Only load servers after authentication
  onMount(async () => {
    const unsubscribe = userStore.subscribe(async (user) => {
      if (user && $serverStore.length === 0) {
        await fetchServers();
        unsubscribe();
      }
    });
  });

  // Get current module from URL
  const currentModule = $derived(() => {
    const pathname = page.url.pathname;
    const segments = pathname.split('/');
    // URL structure: /dashboard/[serverId] or /dashboard/[serverId]/[module]
    if (segments.length === 3) {
      return 'overview'; // Just /dashboard/[serverId]
    } else if (segments.length === 4) {
      return segments[3]; // /dashboard/[serverId]/[module]
    }
    return 'overview';
  });
</script>

<AuthGuard>
  {#snippet children()}
    <ServerSidebar activeServerId={serverId} />
    <TopBar />

    <main class="server-layout">
  {#if server}
    <!-- Server Header -->
    <div class="server-header">
      <div class="server-info">
        <div class="server-icon-container">
          {#if server.iconUrl}
            <img 
              src={server.iconUrl.replaceAll('.gif', '.png')} 
              alt="{server.name} icon" 
              class="server-icon"
            />
          {:else}
            <div class="server-icon placeholder">{server.name.charAt(0)}</div>
          {/if}
        </div>
        <div class="server-details">
          <h1 class="server-name">{server.name}</h1>
          <div class="server-meta">
            <span class="server-status {server.isBotInGuild ? 'online' : 'offline'}">
              {server.isBotInGuild ? 'Bot Active' : 'Bot Inactive'}
            </span>
            {#if server.approximateMemberCount}
              <span class="server-members">{server.approximateMemberCount.toLocaleString()} members</span>
            {/if}
          </div>
        </div>
      </div>
      
      <div class="server-actions">
        <button class="action-btn secondary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1.5 8a6.5 6.5 0 0113 0A.5.5 0 0114.5 8a.5.5 0 01-.5.5H9.207l2.146 2.147a.5.5 0 01-.708.708L8 8.707 5.354 11.354a.5.5 0 11-.708-.708L6.793 8.5H2.5A.5.5 0 012 8z"/>
          </svg>
          Refresh
        </button>
        {#if !server.isBotInGuild}
          <button class="action-btn primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
            </svg>
            Add Bot
          </button>
        {/if}
      </div>
    </div>

    <!-- Module Navigation -->
    <ServerModuleNav serverId={serverId} activeModule={currentModule} modules={[]} />

    <!-- Module Content -->
    <div class="module-content">
      <slot />
    </div>
  {:else}
    <div class="server-loading">
      <div class="loading-spinner"></div>
      <span>Loading server...</span>
    </div>
  {/if}
</main>

<style>
  .server-layout {
    min-height: 100vh;
    background: var(--color-background, #181a20);
    margin-left: 280px;
    padding-top: 60px; /* Account for TopBar */
    display: flex;
    flex-direction: column;
  }

  .server-header {
    background: var(--color-surface, #23272f);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .server-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex: 1;
    min-width: 0;
  }

  .server-icon-container {
    flex-shrink: 0;
  }

  .server-icon {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    object-fit: cover;
    background: var(--color-background, #181a20);
  }

  .server-icon.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: #888;
    background: var(--color-background, #181a20);
  }

  .server-details {
    flex: 1;
    min-width: 0;
  }

  .server-name {
    margin: 0 0 0.5rem 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-on-surface, #f5f6fa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .server-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .server-status {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .server-status.online {
    background: rgba(39, 174, 96, 0.2);
    color: #27ae60;
    border: 1px solid rgba(39, 174, 96, 0.3);
  }

  .server-status.offline {
    background: rgba(231, 76, 60, 0.2);
    color: #e74c3c;
    border: 1px solid rgba(231, 76, 60, 0.3);
  }

  .server-members {
    color: #b5bac1;
    font-size: 0.9rem;
  }

  .server-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-btn.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-on-surface, #f5f6fa);
  }

  .action-btn.secondary:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .action-btn.primary {
    background: var(--color-primary, #5865f2);
    color: white;
  }

  .action-btn.primary:hover {
    background: #4752c4;
  }

  .module-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  .server-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 1rem;
    color: #b5bac1;
  }

  .loading-spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid rgba(88, 101, 242, 0.3);
    border-top: 3px solid var(--color-primary, #5865f2);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .server-layout {
      margin-left: 0;
    }

    .server-header {
      padding: 1rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .server-info {
      width: 100%;
    }

    .server-name {
      font-size: 1.5rem;
    }

    .server-actions {
      width: 100%;
      justify-content: flex-end;
    }

    .module-content {
      padding: 1rem;
    }
  }
</style>
  {/snippet}
</AuthGuard>