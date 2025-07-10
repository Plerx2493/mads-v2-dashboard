<script lang="ts">
  import { goto } from '$app/navigation';
  import type { ServerModule } from '../types/serverModule';

  const { serverId, activeModule = 'overview', modules }: { 
    serverId: string; 
    activeModule?: string; 
    modules: ServerModule[] 
  } = $props();

  function handleModuleClick(moduleId: string) {
    if (moduleId === 'overview') {
      goto(`/dashboard/${serverId}`);
    } else {
      goto(`/dashboard/${serverId}/${moduleId}`);
    }
  }

  const defaultModules: ServerModule[] = [
    {
      id: 'overview',
      name: 'Overview',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
      </svg>`,
      description: 'Server statistics and quick actions',
      path: 'overview',
      enabled: true
    },
    {
      id: 'moderation',
      name: 'Moderation',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`,
      description: 'Bans, kicks, warnings, and auto-moderation',
      path: 'moderation',
      enabled: true,
      badge: 3
    },
    {
      id: 'tags',
      name: 'Tags',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.707 9.293l-5-5A.997.997 0 0012 4H2a2 2 0 00-2 2v8a2 2 0 002 2h10a.997.997 0 00.707-.293l5-5a.999.999 0 000-1.414zM13 13H3V7h10l4 3-4 3z"/>
      </svg>`,
      description: 'Custom commands and tag management',
      path: 'tags',
      enabled: true
    },
    {
      id: 'logging',
      name: 'Logging',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
      </svg>`,
      description: 'Audit logs and message history',
      path: 'logging',
      enabled: true
    },
    {
      id: 'roles',
      name: 'Roles',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
      </svg>`,
      description: 'Role management and permissions',
      path: 'roles',
      enabled: true
    },
    {
      id: 'channels',
      name: 'Channels',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5zM15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
      </svg>`,
      description: 'Channel settings and permissions',
      path: 'channels',
      enabled: true
    },
    {
      id: 'automod',
      name: 'Auto-Mod',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2L3 7v11c0 5.55 3.84 9.74 9 9 5.16.74 9-3.45 9-9V7l-7-5z"/>
        <path d="M8 11l2 2 4-4" stroke="white" stroke-width="1.5" fill="none"/>
      </svg>`,
      description: 'Automatic moderation rules and triggers',
      path: 'automod',
      enabled: true
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
      </svg>`,
      description: 'Server configuration and integrations',
      path: 'settings',
      enabled: true
    }
  ];

  const moduleList = modules.length > 0 ? modules : defaultModules;
</script>

<nav class="module-nav">
  <div class="nav-container">
    {#each moduleList as module (module.id)}
      <button
        class="module-tab {module.id === activeModule ? 'active' : ''} {!module.enabled ? 'disabled' : ''}"
        on:click={() => handleModuleClick(module.id)}
        disabled={!module.enabled}
        title={module.description}
      >
        <div class="module-icon">
          {@html module.icon}
        </div>
        <span class="module-name">{module.name}</span>
        {#if module.badge && module.badge > 0}
          <div class="module-badge">{module.badge}</div>
        {/if}
      </button>
    {/each}
  </div>
</nav>

<style>
  .module-nav {
    background: var(--color-surface, #23272f);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    overflow-x: auto;
    position: sticky;
    top: 60px; /* Account for TopBar height */
    z-index: 50;
  }

  .nav-container {
    display: flex;
    min-width: max-content;
    padding: 0 1rem;
  }

  .module-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.25rem;
    border: none;
    background: transparent;
    color: #b5bac1;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 3px solid transparent;
    white-space: nowrap;
    position: relative;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .module-tab:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-on-surface, #f5f6fa);
  }

  .module-tab.active {
    color: var(--color-primary, #5865f2);
    border-bottom-color: var(--color-primary, #5865f2);
    background: rgba(88, 101, 242, 0.1);
  }

  .module-tab.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .module-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .module-name {
    font-weight: 500;
  }

  .module-badge {
    background: #e74c3c;
    color: white;
    border-radius: 50%;
    min-width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: 0.25rem;
  }

  /* Scrollbar styling for horizontal scroll */
  .module-nav::-webkit-scrollbar {
    height: 3px;
  }

  .module-nav::-webkit-scrollbar-track {
    background: transparent;
  }

  .module-nav::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .module-nav::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .module-tab {
      padding: 0.875rem 1rem;
      font-size: 0.85rem;
    }
    
    .module-name {
      display: none;
    }
    
    .module-tab {
      flex-direction: column;
      gap: 0.25rem;
      min-width: 60px;
    }
  }
</style>