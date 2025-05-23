<script lang="ts">
  export let message: string;
  export let showBackButton: boolean = false;
</script>

<div class="error-message centered">
  <span class="icon" aria-hidden="true">&#9888;</span>
  <span class="msg">{message}</span>
  {#if showBackButton}
    <a href="/" class="back-btn">Back to Home</a>
  {/if}
</div>

<style>
  .error-message.centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    color: #fff;
    background: #23272f;
    padding: 2rem 2.5rem;
    border-radius: 1rem;
    margin: 3rem auto;
    max-width: 400px;
    text-align: center;
    font-size: 1.08rem;
    box-shadow: 0 2px 16px rgba(44,62,80,0.10);
    border: 1.5px solid #c0392b33;
  }
  .icon {
    font-size: 2.2rem;
    color: #ffb347;
    margin-bottom: 0.2rem;
  }
  .msg {
    font-weight: 500;
    line-height: 1.5;
    color: #fff;
    word-break: break-word;
  }
  .back-btn {
    margin-top: 0.5rem;
    padding: 0.5rem 1.3rem;
    background: #c0392b;
    color: #fff;
    border-radius: 0.4rem;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: background 0.15s, box-shadow 0.15s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    border: none;
    outline: none;
    cursor: pointer;
    letter-spacing: 0.01em;
  }
  .back-btn:hover {
    background: #a93226;
    box-shadow: 0 2px 8px rgba(192,57,43,0.10);
  }
</style>
