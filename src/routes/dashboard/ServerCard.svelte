<script lang="ts">
  import type { Server } from '../../types/server';
  export let server: Server;
</script>

<div class="server-card {server.isBotInGuild ? 'online' : 'offline'}">
  {#if server.iconUrl}
    <img src={server.iconUrl} alt="{server.name} icon" class="server-icon" />
  {:else}
    <div class="server-icon placeholder">{server.name.charAt(0)}</div>
  {/if}
  <div class="server-info">
    <h3>{server.name}</h3>
    {#if server.isBotInGuild}
      <a class="server-action-btn" href={`/dashboard/${server.id}`}>Open Dashboard</a>
    {:else}
      <a class="server-action-btn add-bot" href={`/dashboard/add-bot/${server.id}`}>Add Bot</a>
    {/if}
  </div>
</div>

<style>
  .server-card {
    background: var(--color-surface, #23272f);
    color: var(--color-on-surface, #f5f6fa);
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    padding: 1.5rem 2rem;
    min-width: 220px;
    flex: 1 1 220px;
    transition: box-shadow 0.2s;
    border-left: 6px solid var(--color-primary);
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .server-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    object-fit: cover;
    background: #181a20;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    font-weight: bold;
    color: #888;
  }
  .server-icon.placeholder {
    background: #181a20;
    color: #888;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .server-info {
    flex: 1;
    min-width: 0;
  }
  .server-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
    color: var(--color-on-surface, #f5f6fa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    min-width: 0;
  }
  .server-card.online {
    border-left-color: #27ae60;
  }
  .server-card.offline {
    border-left-color: #3498db;
    opacity: 1;
  }
  .server-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
    color: var(--color-on-surface, #f5f6fa);
  }
  .server-action-btn {
    display: inline-block;
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem 1.2rem;
    border-radius: 1.5rem;
    background: #3498db;
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    font-size: 1rem;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    border: none;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .server-action-btn:hover {
    background: #217dbb;
    color: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.13);
    text-decoration: none;
  }
  .server-action-btn:not(.add-bot) {
    background: #27ae60;
  }
  .server-action-btn:not(.add-bot):hover {
    background: #219150;
  }
  .server-action-btn.add-bot {
    /* No longer needed, both buttons are blue */
  }
  .server-action-btn.add-bot:hover {
    /* No longer needed, both buttons are blue */
  }
</style>

