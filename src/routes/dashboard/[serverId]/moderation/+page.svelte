<script lang="ts">
  import type { ModerationData } from '../../../../types/serverModule';

  // Mock moderation data - replace with actual API call
  const moderationData: ModerationData = {
    activeBans: [
      {
        id: '1',
        userId: '123456789',
        username: 'BadUser#1234',
        moderator: 'Admin#9999',
        reason: 'Spam and harassment',
        timestamp: '2024-01-10T15:30:00Z',
        expiresAt: '2024-01-17T15:30:00Z',
        active: true
      },
      {
        id: '2',
        userId: '987654321',
        username: 'ToxicPlayer#5678',
        moderator: 'Moderator#0001',
        reason: 'Toxic behavior',
        timestamp: '2024-01-09T10:15:00Z',
        active: true
      }
    ],
    recentWarnings: [
      {
        id: '1',
        userId: '555555555',
        username: 'NewUser#1111',
        moderator: 'AutoMod',
        reason: 'Inappropriate language',
        timestamp: '2024-01-10T14:20:00Z',
        severity: 'medium'
      },
      {
        id: '2',
        userId: '666666666',
        username: 'Member#2222',
        moderator: 'Helper#7777',
        reason: 'Off-topic posting',
        timestamp: '2024-01-10T12:45:00Z',
        severity: 'low'
      }
    ],
    moderationStats: {
      totalBans: 45,
      totalKicks: 123,
      totalWarnings: 287,
      autoModActions: 1432
    },
    autoModRules: [
      {
        id: '1',
        name: 'Spam Detection',
        type: 'spam',
        enabled: true,
        severity: 'mute',
        threshold: 5,
        channels: ['general', 'off-topic']
      },
      {
        id: '2',
        name: 'Toxicity Filter',
        type: 'toxicity',
        enabled: true,
        severity: 'warn',
        threshold: 3
      }
    ]
  };

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getSeverityColor(severity: string): string {
    switch (severity) {
      case 'low': return '#f1c40f';
      case 'medium': return '#f39c12';
      case 'high': return '#e74c3c';
      default: return '#b5bac1';
    }
  }

  function handleUnban(banId: string) {
    console.log('Unbanning user:', banId);
    // TODO: Implement actual unban functionality
  }

  function handleToggleRule(ruleId: string) {
    console.log('Toggling auto-mod rule:', ruleId);
    // TODO: Implement actual rule toggle
  }
</script>

<svelte:head>
  <title>Server Moderation</title>
</svelte:head>

<div class="moderation-content">
  <!-- Stats Overview -->
  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-value">{moderationData.moderationStats.totalBans}</div>
      <div class="stat-label">Total Bans</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{moderationData.moderationStats.totalKicks}</div>
      <div class="stat-label">Total Kicks</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{moderationData.moderationStats.totalWarnings}</div>
      <div class="stat-label">Total Warnings</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{moderationData.moderationStats.autoModActions}</div>
      <div class="stat-label">Auto-Mod Actions</div>
    </div>
  </div>

  <!-- Content Grid -->
  <div class="content-grid">
    <!-- Active Bans -->
    <div class="content-section">
      <div class="section-header">
        <h3>Active Bans ({moderationData.activeBans.length})</h3>
        <button class="action-btn secondary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
          </svg>
          New Ban
        </button>
      </div>
      
      <div class="ban-list">
        {#each moderationData.activeBans as ban (ban.id)}
          <div class="ban-item">
            <div class="ban-info">
              <div class="ban-user">{ban.username}</div>
              <div class="ban-reason">{ban.reason}</div>
              <div class="ban-meta">
                By {ban.moderator} • {formatDate(ban.timestamp)}
                {#if ban.expiresAt}
                  • Expires {formatDate(ban.expiresAt)}
                {/if}
              </div>
            </div>
            <button class="unban-btn" on:click={() => handleUnban(ban.id)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.354 4.646a.5.5 0 00-.708 0l-6 6a.5.5 0 00.708.708l6-6a.5.5 0 000-.708z"/>
              </svg>
              Unban
            </button>
          </div>
        {/each}
      </div>
    </div>

    <!-- Recent Warnings -->
    <div class="content-section">
      <div class="section-header">
        <h3>Recent Warnings</h3>
        <button class="action-btn secondary">View All</button>
      </div>
      
      <div class="warning-list">
        {#each moderationData.recentWarnings as warning (warning.id)}
          <div class="warning-item">
            <div class="warning-severity" style="background-color: {getSeverityColor(warning.severity)}"></div>
            <div class="warning-info">
              <div class="warning-user">{warning.username}</div>
              <div class="warning-reason">{warning.reason}</div>
              <div class="warning-meta">
                By {warning.moderator} • {formatDate(warning.timestamp)}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Auto-Mod Rules -->
    <div class="content-section full-width">
      <div class="section-header">
        <h3>Auto-Moderation Rules</h3>
        <button class="action-btn primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
          </svg>
          Add Rule
        </button>
      </div>
      
      <div class="rules-grid">
        {#each moderationData.autoModRules as rule (rule.id)}
          <div class="rule-card">
            <div class="rule-header">
              <div class="rule-name">{rule.name}</div>
              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={rule.enabled}
                  on:change={() => handleToggleRule(rule.id)}
                />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="rule-details">
              <div class="rule-type">Type: {rule.type}</div>
              <div class="rule-action">Action: {rule.severity}</div>
              {#if rule.threshold}
                <div class="rule-threshold">Threshold: {rule.threshold}</div>
              {/if}
              {#if rule.channels}
                <div class="rule-channels">Channels: {rule.channels.length} selected</div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .moderation-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .stat-card {
    background: var(--color-surface, #23272f);
    border-radius: 0.75rem;
    padding: 1.25rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-on-surface, #f5f6fa);
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.85rem;
    color: #b5bac1;
    font-weight: 500;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .content-section {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .content-section.full-width {
    grid-column: 1 / -1;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .section-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-btn.primary {
    background: var(--color-primary, #5865f2);
    color: white;
  }

  .action-btn.primary:hover {
    background: #4752c4;
  }

  .action-btn.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-on-surface, #f5f6fa);
  }

  .action-btn.secondary:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .ban-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .ban-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    border-left: 3px solid #e74c3c;
  }

  .ban-info {
    flex: 1;
    min-width: 0;
  }

  .ban-user {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
    margin-bottom: 0.25rem;
  }

  .ban-reason {
    font-size: 0.9rem;
    color: #b5bac1;
    margin-bottom: 0.25rem;
  }

  .ban-meta {
    font-size: 0.8rem;
    color: #888;
  }

  .unban-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(231, 76, 60, 0.1);
    border: 1px solid rgba(231, 76, 60, 0.3);
    border-radius: 0.5rem;
    color: #e74c3c;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .unban-btn:hover {
    background: rgba(231, 76, 60, 0.2);
    border-color: rgba(231, 76, 60, 0.5);
  }

  .warning-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .warning-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
  }

  .warning-severity {
    width: 4px;
    height: 100%;
    min-height: 2.5rem;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .warning-info {
    flex: 1;
    min-width: 0;
  }

  .warning-user {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
    margin-bottom: 0.25rem;
  }

  .warning-reason {
    font-size: 0.85rem;
    color: #b5bac1;
    margin-bottom: 0.25rem;
  }

  .warning-meta {
    font-size: 0.75rem;
    color: #888;
  }

  .rules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .rule-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .rule-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .rule-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
  }

  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.2s;
    border-radius: 24px;
  }

  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.2s;
    border-radius: 50%;
  }

  input:checked + .toggle-slider {
    background-color: var(--color-primary, #5865f2);
  }

  input:checked + .toggle-slider:before {
    transform: translateX(20px);
  }

  .rule-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .rule-details > div {
    font-size: 0.85rem;
    color: #b5bac1;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr;
    }

    .stats-row {
      grid-template-columns: repeat(2, 1fr);
    }

    .ban-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .rules-grid {
      grid-template-columns: 1fr;
    }
  }
</style>