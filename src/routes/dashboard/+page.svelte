<script lang="ts">
  import { fade } from 'svelte/transition';
  import { fetchUser } from '$lib/fetchUser';
  import { onMount } from 'svelte';
  import { redirectToLogin } from '$lib/redirectToLogin';
  import { serverStore, userStore } from '$lib';
  import { fetchServers } from '$lib/fetchServers';
  import { fetchDashboardStats } from '$lib/fetchDashboardStats';
  import ServerSidebar from '$lib/ServerSidebar.svelte';
  import TopBar from '$lib/TopBar.svelte';
  import StatsCard from '$lib/StatsCard.svelte';
  import StatsCardSkeleton from '$lib/StatsCardSkeleton.svelte';
  import ActivityFeed from '$lib/ActivityFeed.svelte';
  import DashboardContentSkeleton from '$lib/DashboardContentSkeleton.svelte';
  import ErrorMessage from '$lib/ErrorMessage.svelte';
  import type { DashboardStats } from '../types/dashboard';

  let isLoadingUser = $state(true);
  let isLoadingServers = $state(true);
  let isLoadingStats = $state(true);
  let wasLoading = $state(true);
  let userLoadError = $state<string | null>(null);
  let serverLoadError = $state<string | null>(null);
  let statsLoadError = $state<string | null>(null);
  let dashboardStats = $state<DashboardStats | null>(null);

  async function logout() {
    // Simple logout: clear userStore and reload (replace with real logic as needed)
    $userStore = null;
    location.reload();
  }

  onMount(async () => {
    if ($userStore !== null && $userStore !== undefined) {
      isLoadingUser = false;
      wasLoading = false;
    } else {
      try {
        let user = await fetchUser();
        if (!user) redirectToLogin();
      } catch {
        userLoadError = "We can not reach our backend. This should be a temporary issue. Please try again later.";
      } finally {
        isLoadingUser = false;
      }
    }

    if ($serverStore.length === 0) {
      try {
        await fetchServers();
      } catch {
        serverLoadError = "We can not reach our backend. This should be a temporary issue. Please try again later.";
      }
    }
    isLoadingServers = false;

    // Fetch dashboard statistics
    try {
      dashboardStats = await fetchDashboardStats();
    } catch {
      statsLoadError = "We can not reach our backend. This should be a temporary issue. Please try again later.";
    }
    isLoadingStats = false;
  });

</script>

<svelte:head>
  <title>Mads Dashboard</title>
</svelte:head>

<ServerSidebar activeServerId="" />
<TopBar />

<main>
  {#if userLoadError}
    <ErrorMessage message={userLoadError} showBackButton={true} />
  {:else if !isLoadingUser}
    <div in:fade={{ duration: wasLoading ?  350 : 0  }} out:fade={{ duration: 200 }}>
      <div class="overview">
        <h1>Dashboard</h1>
        
        {#if statsLoadError}
          <ErrorMessage message={statsLoadError} showBackButton={true} />
        {:else if isLoadingStats}
          <div class="stats-grid">
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </div>
          
          <DashboardContentSkeleton />
        {:else if dashboardStats}
          <div class="stats-grid">
            <StatsCard
              title="Total Servers"
              value={dashboardStats.totalServers}
              subtitle="Active: {dashboardStats.activeServers}"
              icon={`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>`}
            />
            
            <StatsCard
              title="Total Members"
              value={dashboardStats.totalMembers}
              subtitle="Across all servers"
              icon={`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H17c-.8 0-1.5.7-1.5 1.5v6c0 .8.7 1.5 1.5 1.5h1v6h2zm-12.5 0v-7.5h-2v7.5h2zm3-8.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1 1.5h-2c-1.1 0-2 .9-2 2v6h6v-6c0-1.1-.9-2-2-2z"/>
              </svg>`}
            />
            
            <StatsCard
              title="Commands Today"
              value={dashboardStats.commandsToday}
              subtitle="Total: {dashboardStats.totalCommands.toLocaleString()}"
              trend="up"
              trendValue="+12.3%"
              icon={`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>`}
            />
            
            <StatsCard
              title="Uptime"
              value={dashboardStats.uptime}
              subtitle="Last 30 days"
              trend="up"
              trendValue="99.8%"
              icon={`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>`}
            />
          </div>

          <div class="dashboard-content">
            <div class="main-content">
              <div class="most-active-card">
                <h3>Most Active Server</h3>
                <div class="server-highlight">
                  <h4>{dashboardStats.mostActiveServer.name}</h4>
                  <div class="server-stats">
                    <span>{dashboardStats.mostActiveServer.memberCount.toLocaleString()} members</span>
                    <span>{dashboardStats.mostActiveServer.commandsToday} commands today</span>
                  </div>
                </div>
              </div>
              
              <div class="command-usage-card">
                <h3>Top Commands</h3>
                <div class="command-list">
                  {#each dashboardStats.commandUsage as command}
                    <div class="command-item">
                      <span class="command-name">{command.command}</span>
                      <div class="command-stats">
                        <span class="usage">{command.usage.toLocaleString()}</span>
                        <span class="change {command.change > 0 ? 'positive' : 'negative'}">
                          {command.change > 0 ? '+' : ''}{command.change}%
                        </span>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
            
            <div class="sidebar-content">
              <ActivityFeed activities={dashboardStats.recentActivity} />
            </div>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="loading-skeleton">
      <div class="skeleton-avatar shimmer large"></div>
      <div class="skeleton-line shimmer" style="width: 200px; height: 2.5rem; margin-top: 1.5rem;"></div>
      <div class="skeleton-line shimmer" style="width: 150px; height: 1.2rem; margin-top: 0.5rem;"></div>
    </div>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
    background: var(--color-background, #181a20);
    padding-top: calc(60px + 2rem);
    margin-left: 280px;
  }

  .overview {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  .overview h1 {
    color: var(--color-on-surface, #f5f6fa);
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 2rem 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }


  .dashboard-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
    margin-top: 2rem;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .most-active-card, .command-usage-card {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .most-active-card h3, .command-usage-card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
  }

  .server-highlight h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
  }

  .server-stats {
    display: flex;
    gap: 1.5rem;
    color: #b5bac1;
    font-size: 0.9rem;
  }

  .command-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .command-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
  }

  .command-name {
    font-weight: 600;
    color: var(--color-on-surface, #f5f6fa);
    font-family: 'Courier New', monospace;
  }

  .command-stats {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .usage {
    color: #b5bac1;
    font-size: 0.9rem;
  }

  .change {
    font-size: 0.85rem;
    font-weight: 600;
  }

  .change.positive {
    color: #27ae60;
  }

  .change.negative {
    color: #e74c3c;
  }

  .sidebar-content {
    display: flex;
    flex-direction: column;
  }

  /* Responsive design */
  @media (max-width: 1200px) {
    .dashboard-content {
      grid-template-columns: 1fr;
    }
    
    .sidebar-content {
      order: -1;
    }
  }

  @media (max-width: 768px) {
    .stats-grid, .stats-skeleton {
      grid-template-columns: 1fr;
    }
    
    .overview {
      padding: 1rem;
    }
  }

  .loading-skeleton {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    animation: fadein 0.3s;
  }

  .skeleton-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    background: #333a44;
  }

  .skeleton-avatar.large {
    width: 6rem;
    height: 6rem;
  }

  .skeleton-line {
    height: 1.2rem;
    border-radius: 0.5rem;
    background: #333a44;
  }

  .shimmer {
    position: relative;
    overflow: hidden;
  }

  .shimmer::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    animation: shimmer 1.2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  p {
    color: var(--color-on-surface, #f5f6fa);
    font-size: 1.1rem;
    text-align: center;
    margin-top: 3rem;
  }
</style>

