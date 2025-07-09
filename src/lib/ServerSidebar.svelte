<script lang="ts">
  import { serverStore } from '$lib';
  import { goto } from '$app/navigation';
  import AddServerModal from '$lib/AddServerModal.svelte';

  const { activeServerId }: { activeServerId: string } = $props();

  const servers = serverStore;
  let showAddServerModal = $state(false);

  // Filter to only show servers where bot is active
  const activeServers = $derived($servers.filter((server) => server.isBotInGuild));

  function handleServerClick(id: string) {
    console.log('Server clicked:', id, 'Active:', activeServerId);
    if (id !== activeServerId) {
      console.log('Navigating to:', `/dashboard/${id}`);
      goto(`/dashboard/${id}`);
    }
  }

  function handleAddServerClick() {
    showAddServerModal = true;
  }

  function closeAddServerModal() {
    showAddServerModal = false;
  }
</script>

<aside class="server-sidebar">
  <div class="sidebar-header">
    <h3>Servers</h3>
  </div>
  <div class="server-list">
    {#if $servers.length === 0}
      <!-- Loading skeletons -->
      {#each Array(3) as _, i}
        <div class="server-skeleton">
          <div class="skeleton-icon shimmer"></div>
          <div class="skeleton-info">
            <div class="skeleton-name shimmer"></div>
            <div class="skeleton-status shimmer"></div>
          </div>
        </div>
      {/each}
    {:else}
      {#each activeServers as server (server.id)}
        <button
          class="server-item {server.id === activeServerId ? 'active' : ''}"
          on:click={() => handleServerClick(server.id)}
        >
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
          <div class="server-info">
            <span class="server-name">{server.name}</span>
            <span class="server-status online">Bot Active</span>
          </div>
        </button>
      {/each}

      <button class="add-server-btn" on:click={handleAddServerClick}>
        <div class="add-server-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            />
          </svg>
        </div>
        <span>Add Server</span>
      </button>
    {/if}
  </div>
</aside>

<AddServerModal isOpen={showAddServerModal} onClose={closeAddServerModal} />

<style>
  .server-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 280px;
    height: 100vh;
    background: var(--color-surface, #23272f);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 100;
    display: flex;
    flex-direction: column;
  }

  .sidebar-header {
    position: sticky;
    top: 0;
    background: var(--color-surface, #23272f);
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 101;
  }

  .sidebar-header h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
  }

  .server-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
  }

  .server-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;
  }

  .server-item:hover {
    background: rgba(88, 101, 242, 0.1);
    transform: translateX(4px);
  }

  .server-item.active {
    background: rgba(88, 101, 242, 0.2);
    border-left: 3px solid var(--color-primary, #5865f2);
    transform: translateX(4px);
  }

  .server-icon-container {
    flex-shrink: 0;
  }

  .server-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    object-fit: cover;
    background: var(--color-background, #181a20);
  }

  .server-icon.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: #888;
    background: var(--color-background, #181a20);
  }

  .server-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .server-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .server-status {
    font-size: 0.8rem;
    font-weight: 500;
  }

  .server-status.online {
    color: #27ae60;
  }

  .server-status.offline {
    color: #3498db;
  }

  .add-server-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    margin-top: 1rem;
    border: 2px dashed rgba(88, 101, 242, 0.5);
    border-radius: 0.5rem;
    background: transparent;
    color: var(--color-primary, #5865f2);
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .add-server-btn:hover {
    background: rgba(88, 101, 242, 0.1);
    border-color: var(--color-primary, #5865f2);
  }

  .add-server-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background: rgba(88, 101, 242, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .server-skeleton {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
  }

  .skeleton-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background: #333a44;
    flex-shrink: 0;
  }

  .skeleton-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .skeleton-name {
    height: 1rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 70%;
  }

  .skeleton-status {
    height: 0.8rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 50%;
  }

  .shimmer {
    position: relative;
    overflow: hidden;
  }

  .shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    animation: shimmer 1.2s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  /* Scrollbar styling */
  .server-list::-webkit-scrollbar {
    width: 6px;
  }

  .server-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .server-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .server-list::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
</style>
