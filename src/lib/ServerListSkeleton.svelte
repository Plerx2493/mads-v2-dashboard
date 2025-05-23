<script lang="ts">
// No props needed
</script>

<div class="servers-list-skeleton">
  {#each [1,2,3] as i (i)}
    <div class="server-card-skeleton">
      <div class="skeleton-avatar shimmer"></div>
      <div class="skeleton-lines">
        <div class="skeleton-line shimmer" style="width: 60%"></div>
        <div class="skeleton-line shimmer" style="width: 40%"></div>
      </div>
    </div>
  {/each}
</div>

<style>
  .servers-list-skeleton {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }
  .server-card-skeleton {
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    padding: 1.5rem 2rem;
    min-width: 220px;
    flex: 1 1 220px;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .skeleton-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    background: #181a20;
  }
  .skeleton-lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .skeleton-line {
    height: 1.1rem;
    border-radius: 0.5rem;
    background: #22242a;
  }
  .shimmer {
    animation: shimmer 1.5s infinite linear;
    background: linear-gradient(90deg, #22242a 25%, #2c2f36 50%, #22242a 75%);
    background-size: 200% 100%;
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
</style>
