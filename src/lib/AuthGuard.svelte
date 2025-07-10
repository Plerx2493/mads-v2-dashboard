<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore } from '$lib';
  import { fetchUser } from '$lib/fetchUser';
  import { redirectToLogin } from '$lib/redirectToLogin';
  import { PUBLIC_API_URL } from '$env/static/public';

  const { children }: { children: any } = $props();

  let isLoading = $state(true);
  let hasRedirected = $state(false);

  onMount(async () => {
    // Check if user is already in store (from previous auth)
    if ($userStore) {
      isLoading = false;
      return;
    }

    try {
      // Try to fetch user from server
      console.log('Fetching user...');
      const success = await fetchUser();
      console.log('Fetch user result:', success);

      if (!success && !hasRedirected) {
        // User not authenticated, redirect to login
        hasRedirected = true;
        console.log(
          'Redirecting to login...',
          `${PUBLIC_API_URL}/api/user/login?ReturnUrl=${window.location.href}`
        );
        redirectToLogin();
        return;
      }

      isLoading = false;
    } catch (error) {
      console.error('Auth check failed:', error);
      if (!hasRedirected) {
        hasRedirected = true;
        redirectToLogin();
      }
    }
  });
</script>

{#if isLoading}
  <div class="auth-loading">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Authenticating...</p>
    </div>
  </div>
{:else}
  {@render children()}
{/if}

<style>
  .auth-loading {
    min-height: 100vh;
    background: var(--color-background, #181a20);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    color: var(--color-on-surface, #f5f6fa);
  }

  .loading-spinner {
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid rgba(88, 101, 242, 0.3);
    border-top: 3px solid var(--color-primary, #5865f2);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-container p {
    margin: 0;
    color: #b5bac1;
    font-size: 1rem;
  }
</style>
