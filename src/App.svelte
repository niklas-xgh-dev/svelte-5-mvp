<script>
    import Counter from './components/Counter.svelte';
    import TodoList from './components/TodoList.svelte';
    import ThemeToggle from './components/ThemeToggle.svelte';
    
    // Simple routing with runes
    let page = $state('home');
    
    // Update URL without full page reload
    function navigate(newPage) {
      page = newPage;
      window.history.pushState({ page: newPage }, '', `#${newPage}`);
    }
    
    // Handle browser back/forward navigation
    $effect(() => {
      const handlePopState = (event) => {
        page = event.state?.page || 'home';
      };
      
      window.addEventListener('popstate', handlePopState);
      
      // Check for hash on initial load
      const hash = window.location.hash.slice(1);
      if (hash) {
        page = hash;
      }
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    });
  </script>
  
  <main>
    <header>
      <h1>Svelte 5 MVP</h1>
      <nav>
        <button 
          class:active={page === 'home'} 
          onclick={() => navigate('home')}
        >
          Home
        </button>
        <button 
          class:active={page === 'todos'} 
          onclick={() => navigate('todos')}
        >
          Todos
        </button>
      </nav>
      <ThemeToggle />
    </header>
  
    <div class="content">
      {#if page === 'home'}
        <div class="page">
          <h2>Welcome to Svelte 5</h2>
          <p>This minimal app demonstrates the power of Svelte 5's runes system.</p>
          <Counter />
        </div>
      {:else if page === 'todos'}
        <div class="page">
          <TodoList />
        </div>
      {/if}
    </div>
    
    <footer>
      <p>Built with Svelte 5 - The minimal viable implementation</p>
    </footer>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
    }
    
    nav {
      display: flex;
      gap: 1rem;
    }
    
    nav button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      color: var(--text-color);
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    
    nav button:hover, nav button.active {
      opacity: 1;
      text-decoration: underline;
    }
    
    .content {
      flex: 1;
      padding: 2rem 0;
    }
    
    .page {
      max-width: 800px;
      margin: 0 auto;
    }
    
    footer {
      text-align: center;
      padding: 1rem 0;
      border-top: 1px solid #eee;
      font-size: 0.8rem;
      opacity: 0.7;
    }
  </style>