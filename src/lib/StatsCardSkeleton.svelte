<div class="stats-card-skeleton">
  <div class="skeleton-header">
    <div class="skeleton-title shimmer"></div>
    <div class="skeleton-icon shimmer"></div>
  </div>
  
  <div class="skeleton-value shimmer"></div>
  <div class="skeleton-subtitle shimmer"></div>
  <div class="skeleton-trend shimmer"></div>
</div>

<style>
  .stats-card-skeleton {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .skeleton-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .skeleton-title {
    height: 0.9rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 60%;
  }

  .skeleton-icon {
    width: 24px;
    height: 24px;
    background: #333a44;
    border-radius: 0.25rem;
  }

  .skeleton-value {
    height: 2.5rem;
    background: #333a44;
    border-radius: 0.5rem;
    width: 40%;
  }

  .skeleton-subtitle {
    height: 0.9rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 50%;
  }

  .skeleton-trend {
    height: 0.85rem;
    background: #333a44;
    border-radius: 0.25rem;
    width: 30%;
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
</style>