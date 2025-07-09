<script lang="ts">
  const { 
    title, 
    value, 
    subtitle = '', 
    icon = '', 
    trend = 'neutral', 
    trendValue = '' 
  }: { 
    title: string; 
    value: string | number; 
    subtitle?: string; 
    icon?: string; 
    trend?: 'up' | 'down' | 'neutral'; 
    trendValue?: string; 
  } = $props();
</script>

<div class="stats-card">
  <div class="stats-header">
    <h3>{title}</h3>
    {#if icon}
      <div class="stats-icon">
        {@html icon}
      </div>
    {/if}
  </div>
  
  <div class="stats-value">
    {typeof value === 'number' ? value.toLocaleString() : value}
  </div>
  
  {#if subtitle}
    <div class="stats-subtitle">{subtitle}</div>
  {/if}
  
  {#if trendValue}
    <div class="stats-trend {trend}">
      {#if trend === 'up'}
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M2 8l4-4 4 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {:else if trend === 'down'}
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {/if}
      {trendValue}
    </div>
  {/if}
</div>

<style>
  .stats-card {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .stats-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  }

  .stats-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .stats-header h3 {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #b5bac1;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stats-icon {
    width: 24px;
    height: 24px;
    opacity: 0.7;
  }

  .stats-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-on-surface, #f5f6fa);
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .stats-subtitle {
    font-size: 0.9rem;
    color: #b5bac1;
    margin-bottom: 0.5rem;
  }

  .stats-trend {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .stats-trend.up {
    color: #27ae60;
  }

  .stats-trend.down {
    color: #e74c3c;
  }

  .stats-trend.neutral {
    color: #b5bac1;
  }
</style>