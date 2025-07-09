<script lang="ts">
  import type { ActivityItem } from '../types/dashboard';
  
  const { activities }: { activities: ActivityItem[] } = $props();
  
  function getActivityIcon(type: ActivityItem['type']): string {
    switch (type) {
      case 'server_join':
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 9a5 5 0 0 0-5 5h10a5 5 0 0 0-5-5z"/>
        </svg>`;
      case 'command_used':
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          <path d="M7.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM7.5 9a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3z"/>
        </svg>`;
      case 'bot_added':
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zM3.5 6a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-9z"/>
        </svg>`;
      case 'error':
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>`;
      default:
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>`;
    }
  }
  
  function getActivityColor(type: ActivityItem['type']): string {
    switch (type) {
      case 'server_join':
        return '#27ae60';
      case 'command_used':
        return '#3498db';
      case 'bot_added':
        return '#5865f2';
      case 'error':
        return '#e74c3c';
      default:
        return '#b5bac1';
    }
  }
</script>

<div class="activity-feed">
  <div class="activity-header">
    <h3>Recent Activity</h3>
  </div>
  
  <div class="activity-list">
    {#each activities as activity (activity.id)}
      <div class="activity-item">
        <div class="activity-icon" style="color: {getActivityColor(activity.type)}">
          {@html getActivityIcon(activity.type)}
        </div>
        <div class="activity-content">
          <div class="activity-description">{activity.description}</div>
          <div class="activity-meta">
            <span class="server-name">{activity.serverName}</span>
            <span class="timestamp">{activity.timestamp}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .activity-feed {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    height: fit-content;
  }

  .activity-header {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .activity-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .activity-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .activity-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .activity-content {
    flex: 1;
    min-width: 0;
  }

  .activity-description {
    color: var(--color-on-surface, #f5f6fa);
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .activity-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #b5bac1;
  }

  .server-name {
    font-weight: 500;
  }

  .timestamp {
    opacity: 0.7;
  }

  .activity-meta::before {
    content: '•';
    margin: 0 0.25rem;
  }

  .activity-meta > :first-child::before {
    display: none;
  }
</style>