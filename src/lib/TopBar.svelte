<script lang="ts">
  import { userStore } from '$lib';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let dropdownOpen = $state(false);
  let dropdownElement: HTMLDivElement;

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function handleLogout() {
    // Add logout logic here
    console.log('Logout clicked');
    goto('/login');
  }

  function handleProfile() {
    console.log('Profile clicked');
    dropdownOpen = false;
  }

  function handleSettings() {
    console.log('Settings clicked');
    dropdownOpen = false;
  }

  function handleDashboard() {
    goto('/dashboard');
  }

  // Close dropdown when clicking outside
  onMount(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        dropdownOpen = false;
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<header class="topbar">
  <div class="topbar-content">
    <div class="nav-section">
      <button class="dashboard-btn" on:click={handleDashboard}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
          />
        </svg>
        Dashboard
      </button>
    </div>

    <div class="user-section" bind:this={dropdownElement}>
      <button class="user-button" on:click={toggleDropdown}>
        {#if $userStore?.avatarUrl}
          <img src={$userStore.avatarUrl} alt="User avatar" class="user-avatar" />
        {:else}
          <div class="user-avatar placeholder">
            {$userStore?.username?.charAt(0) || 'U'}
          </div>
        {/if}
        <span class="username">{$userStore?.username || 'User'}</span>
        <svg
          class="dropdown-icon {dropdownOpen ? 'open' : ''}"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      {#if dropdownOpen}
        <div class="dropdown-menu">
          <button class="dropdown-item" on:click={handleProfile}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 9a5 5 0 0 0-5 5h10a5 5 0 0 0-5-5z"
                fill="currentColor"
              />
            </svg>
            Profile
          </button>
          <button class="dropdown-item" on:click={handleSettings}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                fill="currentColor"
              />
              <path
                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.292-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.292c.415.764-.42 1.6-1.185 1.184l-.292-.159a1.873 1.873 0 0 0-2.692 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.693-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.292A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                fill="currentColor"
              />
            </svg>
            Settings
          </button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item danger" on:click={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                fill="currentColor"
              />
              <path
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                fill="currentColor"
              />
            </svg>
            Logout
          </button>
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
  .topbar {
    position: fixed;
    top: 0;
    left: 280px;
    right: 0;
    height: 60px;
    background: var(--color-surface, #23272f);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 200;
    display: flex;
    align-items: center;
  }

  .topbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 1.5rem;
  }

  .nav-section {
    display: flex;
    align-items: center;
  }

  .dashboard-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background: transparent;
    color: var(--color-on-surface, #f5f6fa);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .dashboard-btn:hover {
    background: rgba(88, 101, 242, 0.1);
    color: var(--color-primary, #5865f2);
  }

  .dashboard-btn svg {
    width: 20px;
    height: 20px;
  }

  .user-section {
    position: relative;
  }

  .user-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background: transparent;
    color: var(--color-on-surface, #f5f6fa);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .user-button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-avatar.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary, #5865f2);
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .username {
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown-icon {
    transition: transform 0.2s ease;
  }

  .dropdown-icon.open {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: var(--color-surface, #23272f);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 180px;
    z-index: 1000;
    animation: dropdownFade 0.15s ease-out;
  }

  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: transparent;
    color: var(--color-on-surface, #f5f6fa);
    cursor: pointer;
    transition: background 0.2s ease;
    font-size: 0.9rem;
    text-align: left;
  }

  .dropdown-item:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .dropdown-item:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .dropdown-item.danger {
    color: var(--color-danger, #e74c3c);
  }

  .dropdown-item.danger:hover {
    background: rgba(231, 76, 60, 0.1);
  }

  .dropdown-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0.5rem 0;
  }

  .dropdown-item svg {
    width: 16px;
    height: 16px;
    opacity: 0.8;
  }
</style>
