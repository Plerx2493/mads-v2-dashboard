<div class="dashboard-content-skeleton">
  <div class="main-content-skeleton">
    <!-- Most Active Server Skeleton -->
    <div class="content-card-skeleton">
      <div class="skeleton-header">
        <div class="skeleton-title shimmer"></div>
      </div>
      <div class="skeleton-server-name shimmer"></div>
      <div class="skeleton-server-stats">
        <div class="skeleton-stat shimmer"></div>
        <div class="skeleton-stat shimmer"></div>
      </div>
    </div>
    
    <!-- Top Commands Skeleton -->
    <div class="content-card-skeleton">
      <div class="skeleton-header">
        <div class="skeleton-title shimmer"></div>
      </div>
      <div class="skeleton-command-list">
        {#each Array(5) as _, i}
          <div class="skeleton-command-item">
            <div class="skeleton-command-name shimmer"></div>
            <div class="skeleton-command-stats">
              <div class="skeleton-usage shimmer"></div>
              <div class="skeleton-change shimmer"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Activity Feed Skeleton -->
  <div class="activity-skeleton">
    <div class="content-card-skeleton">
      <div class="skeleton-header">
        <div class="skeleton-title shimmer"></div>
      </div>
      <div class="skeleton-activity-list">
        {#each Array(5) as _, i}
          <div class="skeleton-activity-item">
            <div class="skeleton-activity-icon shimmer"></div>
            <div class="skeleton-activity-content">
              <div class="skeleton-activity-description shimmer"></div>
              <div class="skeleton-activity-meta shimmer"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .dashboard-content-skeleton {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
    margin-top: 2rem;
  }

  .main-content-skeleton {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .content-card-skeleton {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .skeleton-header {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .skeleton-title {
    height: 1.1rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 40%;
  }

  .skeleton-server-name {
    height: 1.3rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 60%;
    margin-bottom: 0.5rem;
  }

  .skeleton-server-stats {
    display: flex;
    gap: 1.5rem;
  }

  .skeleton-stat {
    height: 0.9rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 120px;
  }

  .skeleton-command-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .skeleton-command-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
  }

  .skeleton-command-name {
    height: 1rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 80px;
  }

  .skeleton-command-stats {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .skeleton-usage {
    height: 0.9rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 60px;
  }

  .skeleton-change {
    height: 0.85rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 40px;
  }

  .skeleton-activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .skeleton-activity-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .skeleton-activity-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #333a44;
    flex-shrink: 0;
  }

  .skeleton-activity-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .skeleton-activity-description {
    height: 0.9rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 85%;
  }

  .skeleton-activity-meta {
    height: 0.8rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 60%;
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

  /* Responsive design */
  @media (max-width: 1200px) {
    .dashboard-content-skeleton {
      grid-template-columns: 1fr;
    }
    
    .activity-skeleton {
      order: -1;
    }
  }
</style>