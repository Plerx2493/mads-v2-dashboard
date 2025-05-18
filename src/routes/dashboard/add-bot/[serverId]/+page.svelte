<script lang="ts">
  // This is a placeholder for the "Add Bot" page
  import { page } from '$app/stores';
  let serverId = $page.params.serverId;
</script>

<svelte:head>
  <title>Add Bot to Server</title>
</svelte:head>

<div class="add-bot-page">
  <h1>Add Bot to Server</h1>
  <p>To add the bot to your server, click the button below:</p>
  <a class="add-bot-btn" href={`https://discord.com/oauth2/authorize?client_id=YOUR_BOT_CLIENT_ID&scope=bot&permissions=8&guild_id=${serverId}`} target="_blank" rel="noopener noreferrer">Add Bot to Server</a>
</div>

<style>
  .add-bot-page {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background: var(--color-surface, #23272f);
    border-radius: 1rem;
    color: var(--color-on-surface, #f5f6fa);
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    text-align: center;
  }
  .add-bot-btn {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.75rem 2rem;
    border-radius: 2rem;
    background: #e74c3c;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s;
  }
  .add-bot-btn:hover {
    background: #c0392b;
  }
</style>

