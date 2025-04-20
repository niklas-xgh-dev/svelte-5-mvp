<script>
    import { store } from '../lib/store.js';
  </script>
  
  <button 
    class="theme-toggle" 
    onclick={store.toggleTheme} 
    aria-label="Toggle theme"
  >
    {#if store.state.theme === 'light'}
      🌙
    {:else}
      ☀️
    {/if}
  </button>
  
  <style>
    .theme-toggle {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.2s;
    }
    
    .theme-toggle:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    :global([data-theme='dark']) {
      --bg-color: #121212;
      --text-color: #f0f0f0;
      --accent-color: #90caf9;
    }
    
    :global([data-theme='light']) {
      --bg-color: #ffffff;
      --text-color: #121212;
      --accent-color: #1976d2;
    }
    
    :global(body) {
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: background-color 0.3s, color 0.3s;
    }
    
    :global(a) {
      color: var(--accent-color);
    }
  </style>