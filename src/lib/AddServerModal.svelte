<script lang="ts">
  import { serverStore } from '$lib';
  import { goto } from '$app/navigation';
  import type { Server } from '../types/server';

  const { isOpen = false, onClose }: { isOpen?: boolean; onClose: () => void } = $props();

  let activeTab: 'select' | 'invite' = $state('select');
  let inviteLink: string = $state('');
  let selectedServerId: string = $state('');
  let isProcessing: boolean = $state(false);

  // Get servers where bot is NOT active
  const availableServers = $derived($serverStore.filter(server => !server.isBotInGuild));

  function handleTabChange(tab: 'select' | 'invite') {
    activeTab = tab;
    // Reset form data when switching tabs
    inviteLink = '';
    selectedServerId = '';
  }

  function handleSelectServer(serverId: string) {
    selectedServerId = serverId;
  }

  async function handleAddFromSelection() {
    if (!selectedServerId) return;
    
    isProcessing = true;
    try {
      // TODO: Replace with actual API call to add bot to server
      console.log('Adding bot to server:', selectedServerId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the server page
      goto(`/dashboard/add-bot/${selectedServerId}`);
      onClose();
    } catch (error) {
      console.error('Failed to add bot to server:', error);
    } finally {
      isProcessing = false;
    }
  }

  async function handleAddFromInvite() {
    if (!inviteLink.trim()) return;
    
    isProcessing = true;
    try {
      // TODO: Replace with actual API call to process invite link
      console.log('Processing invite link:', inviteLink);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - in real implementation, this would come from the API
      const mockServerId = 'invite-server-123';
      
      // Navigate to add bot page for the invite server
      goto(`/dashboard/add-bot/${mockServerId}`);
      onClose();
    } catch (error) {
      console.error('Failed to process invite link:', error);
    } finally {
      isProcessing = false;
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

{#if isOpen}
  <!-- Modal backdrop -->
  <div 
    class="modal-backdrop" 
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Add Server</h2>
        <button class="close-btn" on:click={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <div class="modal-tabs">
        <button 
          class="tab-btn {activeTab === 'select' ? 'active' : ''}"
          on:click={() => handleTabChange('select')}
        >
          Select Server
        </button>
        <button 
          class="tab-btn {activeTab === 'invite' ? 'active' : ''}"
          on:click={() => handleTabChange('invite')}
        >
          Invite Link
        </button>
      </div>

      <div class="modal-body">
        {#if activeTab === 'select'}
          <div class="tab-content">
            <p class="tab-description">Choose from your servers where the bot isn't active yet:</p>
            
            {#if availableServers.length > 0}
              <div class="server-selection">
                {#each availableServers as server (server.id)}
                  <button
                    class="selectable-server {selectedServerId === server.id ? 'selected' : ''}"
                    on:click={() => handleSelectServer(server.id)}
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
                    <div class="server-details">
                      <span class="server-name">{server.name}</span>
                      <span class="server-members">
                        {server.approximateMemberCount ? `${server.approximateMemberCount.toLocaleString()} members` : 'Members unknown'}
                      </span>
                    </div>
                    {#if selectedServerId === server.id}
                      <div class="selected-indicator">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                      </div>
                    {/if}
                  </button>
                {/each}
              </div>
              
            {:else}
              <div class="empty-state">
                <p>All your servers already have the bot active!</p>
                <p class="empty-subtitle">Try the invite link option to add the bot to a new server.</p>
              </div>
            {/if}
          </div>
        {:else}
          <div class="tab-content">
            <p class="tab-description">Paste a Discord server invite link to add the bot:</p>
            
            <div class="invite-input-group">
              <input
                type="text"
                placeholder="https://discord.gg/example or discord.gg/example"
                bind:value={inviteLink}
                class="invite-input"
              />
            </div>
            
          </div>
        {/if}
      </div>

      <!-- Sticky action buttons -->
      <div class="modal-actions">
        <button class="cancel-btn" on:click={onClose}>Cancel</button>
        {#if activeTab === 'select'}
          <button 
            class="primary-btn" 
            disabled={!selectedServerId || isProcessing}
            on:click={handleAddFromSelection}
          >
            {isProcessing ? 'Adding...' : 'Add Bot'}
          </button>
        {:else}
          <button 
            class="primary-btn" 
            disabled={!inviteLink.trim() || isProcessing}
            on:click={handleAddFromInvite}
          >
            {isProcessing ? 'Processing...' : 'Add Bot'}
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.15s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.2s ease-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
  }

  .close-btn {
    background: none;
    border: none;
    color: #b5bac1;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-on-surface, #f5f6fa);
  }

  .modal-tabs {
    display: flex;
    background: rgba(255, 255, 255, 0.05);
  }

  .tab-btn {
    flex: 1;
    padding: 1rem;
    background: none;
    border: none;
    color: #b5bac1;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
  }

  .tab-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-on-surface, #f5f6fa);
  }

  .tab-btn.active {
    color: var(--color-primary, #5865f2);
    border-bottom-color: var(--color-primary, #5865f2);
    background: rgba(88, 101, 242, 0.1);
  }

  .modal-body {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .tab-description {
    margin: 0 0 1.5rem 0;
    color: #b5bac1;
    font-size: 0.9rem;
  }

  .tab-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
  }

  .server-selection {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1.5rem;
  }

  .selectable-server {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;
  }

  .selectable-server:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(88, 101, 242, 0.3);
  }

  .selectable-server.selected {
    background: rgba(88, 101, 242, 0.1);
    border-color: var(--color-primary, #5865f2);
  }

  .server-icon-container {
    flex-shrink: 0;
  }

  .server-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    object-fit: cover;
    background: var(--color-background, #181a20);
  }

  .server-icon.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: bold;
    color: #888;
    background: var(--color-background, #181a20);
  }

  .server-details {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .server-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .server-members {
    font-size: 0.85rem;
    color: #b5bac1;
  }

  .selected-indicator {
    color: var(--color-primary, #5865f2);
  }

  .invite-input-group {
    margin-bottom: 1.5rem;
  }

  .invite-input {
    width: 100%;
    padding: 0.875rem;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: var(--color-on-surface, #f5f6fa);
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  .invite-input:focus {
    outline: none;
    border-color: var(--color-primary, #5865f2);
    background: rgba(255, 255, 255, 0.1);
  }

  .invite-input::placeholder {
    color: #b5bac1;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: var(--color-surface, #23272f);
    position: sticky;
    bottom: 0;
    margin-top: auto;
  }

  .cancel-btn, .primary-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .cancel-btn {
    background: rgba(255, 255, 255, 0.1);
    color: #b5bac1;
  }

  .cancel-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--color-on-surface, #f5f6fa);
  }

  .primary-btn {
    background: var(--color-primary, #5865f2);
    color: white;
  }

  .primary-btn:hover:not(:disabled) {
    background: #4752c4;
  }

  .primary-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .empty-state {
    text-align: center;
    padding: 2rem 0;
    color: #b5bac1;
  }

  .empty-subtitle {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
</style>