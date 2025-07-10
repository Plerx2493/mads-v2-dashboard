<script lang="ts">
  import type { OverviewData } from '../../../types/serverModule';

  // Mock overview data - replace with actual API call
  const overviewData: OverviewData = {
    stats: {
      totalMembers: 1247,
      onlineMembers: 432,
      totalChannels: 23,
      totalRoles: 15,
      messagesLast24h: 1834,
      commandsUsed: 342
    },
    recentActions: [
      {
        id: '1',
        type: 'ban',
        user: 'BadUser#1234',
        moderator: 'ModeratorBot#0001',
        reason: 'Spam',
        timestamp: '2 hours ago'
      },
      {
        id: '2',
        type: 'role_update',
        user: 'NewMember#5678',
        moderator: 'Admin#9999',
        reason: 'Role assigned: Member',
        timestamp: '3 hours ago'
      },
      {
        id: '3',
        type: 'channel_update',
        user: 'System',
        moderator: 'Admin#9999',
        reason: 'Created #new-announcements',
        timestamp: '5 hours ago'
      }
    ],
    quickActions: [
      {
        id: 'refresh',
        name: 'Refresh Data',
        icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1.5 8a6.5 6.5 0 0113 0A.5.5 0 0114.5 8a.5.5 0 01-.5.5H9.207l2.146 2.147a.5.5 0 01-.708.708L8 8.707 5.354 11.354a.5.5 0 11-.708-.708L6.793 8.5H2.5A.5.5 0 012 8z"/>
        </svg>`,
        action: 'refresh'
      },
      {
        id: 'emergency',
        name: 'Emergency Lock',
        icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a2 2 0 012 2v4H6V3a2 2 0 012-2zM6 9V3a3 3 0 116 0v6a1 1 0 01-1 1v1a2 2 0 11-4 0v-1a1 1 0 01-1-1z"/>
        </svg>`,
        action: 'emergency_lock',
        dangerous: true
      },
      {
        id: 'backup',
        name: 'Create Backup',
        icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5.5 7a.5.5 0 000 1h5a.5.5 0 000-1h-5zM5 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z"/>
          <path d="M9.5 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0011 4.5h2V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1h5.5z"/>
        </svg>`,
        action: 'create_backup'
      }
    ]
  };

  function handleQuickAction(actionId: string) {
    console.log('Quick action triggered:', actionId);
    // TODO: Implement actual quick actions
  }

  function getActionTypeColor(type: string): string {
    switch (type) {
      case 'ban': return '#e74c3c';
      case 'kick': return '#f39c12';
      case 'warn': return '#f1c40f';
      case 'mute': return '#9b59b6';
      case 'role_update': return '#3498db';
      case 'channel_update': return '#27ae60';
      default: return '#b5bac1';
    }
  }

  function getActionTypeIcon(type: string): string {
    switch (type) {
      case 'ban':
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
        </svg>`;
      case 'role_update':
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>`;
      case 'channel_update':
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9l-3 3v-3H4a2 2 0 0 1-2-2V5z"/>
        </svg>`;
      default:
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>`;
    }
  }
</script>

<svelte:head>
  <title>Server Overview</title>
</svelte:head>

<div class="overview-content">
  <!-- Stats Grid -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H17c-.8 0-1.5.7-1.5 1.5v6c0 .8.7 1.5 1.5 1.5h1v6h2z"/>
        </svg>
      </div>
      <div class="stat-info">
        <div class="stat-value">{overviewData.stats.totalMembers.toLocaleString()}</div>
        <div class="stat-label">Total Members</div>
        <div class="stat-sub">{overviewData.stats.onlineMembers} online</div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9l-3 3v-3H4a2 2 0 0 1-2-2V5z"/>
        </svg>
      </div>
      <div class="stat-info">
        <div class="stat-value">{overviewData.stats.totalChannels}</div>
        <div class="stat-label">Channels</div>
        <div class="stat-sub">{overviewData.stats.totalRoles} roles</div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </div>
      <div class="stat-info">
        <div class="stat-value">{overviewData.stats.messagesLast24h.toLocaleString()}</div>
        <div class="stat-label">Messages</div>
        <div class="stat-sub">Last 24 hours</div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      </div>
      <div class="stat-info">
        <div class="stat-value">{overviewData.stats.commandsUsed}</div>
        <div class="stat-label">Commands</div>
        <div class="stat-sub">Today</div>
      </div>
    </div>
  </div>

  <!-- Content Grid -->
  <div class="content-grid">
    <!-- Recent Actions -->
    <div class="content-card">
      <h3>Recent Actions</h3>
      <div class="actions-list">
        {#each overviewData.recentActions as action (action.id)}
          <div class="action-item">
            <div class="action-icon" style="color: {getActionTypeColor(action.type)}">
              {@html getActionTypeIcon(action.type)}
            </div>
            <div class="action-content">
              <div class="action-description">
                <strong>{action.user}</strong> {action.reason}
              </div>
              <div class="action-meta">
                By {action.moderator} • {action.timestamp}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="content-card">
      <h3>Quick Actions</h3>
      <div class="quick-actions">
        {#each overviewData.quickActions as action (action.id)}
          <button 
            class="quick-action-btn {action.dangerous ? 'dangerous' : ''}"
            on:click={() => handleQuickAction(action.id)}
          >
            <div class="action-icon">
              {@html action.icon}
            </div>
            <span>{action.name}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .overview-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.2s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
  }

  .stat-icon {
    width: 3rem;
    height: 3rem;
    background: rgba(88, 101, 242, 0.1);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary, #5865f2);
    flex-shrink: 0;
  }

  .stat-info {
    flex: 1;
    min-width: 0;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-on-surface, #f5f6fa);
    line-height: 1;
  }

  .stat-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #b5bac1;
    margin-top: 0.25rem;
  }

  .stat-sub {
    font-size: 0.8rem;
    color: #888;
    margin-top: 0.125rem;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .content-card {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .content-card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
  }

  .actions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .action-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .action-icon {
    width: 2rem;
    height: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .action-content {
    flex: 1;
    min-width: 0;
  }

  .action-description {
    color: var(--color-on-surface, #f5f6fa);
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .action-meta {
    color: #b5bac1;
    font-size: 0.8rem;
  }

  .quick-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .quick-action-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: var(--color-on-surface, #f5f6fa);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: left;
    width: 100%;
  }

  .quick-action-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .quick-action-btn.dangerous {
    border-color: rgba(231, 76, 60, 0.3);
    color: #e74c3c;
  }

  .quick-action-btn.dangerous:hover {
    background: rgba(231, 76, 60, 0.1);
    border-color: rgba(231, 76, 60, 0.5);
  }

  .quick-action-btn .action-icon {
    width: 1.5rem;
    height: 1.5rem;
    background: transparent;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .content-grid {
      grid-template-columns: 1fr;
    }

    .stat-card {
      padding: 1rem;
    }

    .content-card {
      padding: 1rem;
    }
  }
</style>