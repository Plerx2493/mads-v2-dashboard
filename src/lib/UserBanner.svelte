<script lang="ts">
  export let username: string;
  export let avatarUrl: string;
  export let onLogout: () => void;
</script>

<div class="banner">
  <div class="banner-content">
    <div class="greeting">
      <h1>Hello, {username}!</h1>
      <p>Welcome back to your dashboard.</p>
    </div>
    <img src={avatarUrl} alt="User avatar" class="avatar" />
    <button class="logout" on:click={onLogout}>Logout</button>
  </div>
</div>

<style>
  .banner {
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(90deg, var(--color-primary) 60%, var(--color-secondary) 100%);
    color: white;
    padding: 2rem 0;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    overflow-x: hidden;
    border-radius: 1rem;
  }
  .banner-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    gap: 2rem;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .greeting {
    flex: 1 1 200px;
    min-width: 0;
  }
  .greeting h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
    word-break: break-word;
  }
  .greeting p {
    margin: 0.5rem 0 0 0;
    font-size: 1.2rem;
  }
  .avatar {
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    margin: 0 2rem;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    flex-shrink: 0;
    order: 2;
  }
  .logout {
    background: var(--color-danger, #e74c3c);
    color: white;
    border: none;
    border-radius: 2rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
    order: 3;
    flex-basis: 100%;
    margin-top: 1rem;
    align-self: flex-end;
    max-width: 200px;
  }
  .logout:hover {
    background: #c0392b;
  }
</style>
