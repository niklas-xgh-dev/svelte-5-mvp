// Minimal store implementation using Svelte 5 runes
// The entire app-wide state management in just a few lines

// Singleton instance pattern
const data = $state({
    count: 0,
    theme: 'light',
    todos: []
  });
  
  // Computed values example
  export const doubledCount = $derived(data.count * 2);
  export const remainingTodos = $derived(data.todos.filter(t => !t.done).length);
  
  // Exported store with methods
  export const store = {
    get state() { return data; },
    incrementCount: () => data.count++,
    decrementCount: () => data.count--,
    resetCount: () => data.count = 0,
    toggleTheme: () => data.theme = data.theme === 'light' ? 'dark' : 'light',
    addTodo: (text) => {
      if (text.trim()) {
        data.todos = [...data.todos, { text, done: false, id: Date.now() }];
        return true;
      }
      return false;
    },
    toggleTodo: (id) => {
      data.todos = data.todos.map(todo => 
        todo.id === id ? {...todo, done: !todo.done} : todo
      );
    }
  };
  
  // Initialize theme from localStorage if available
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      data.theme = savedTheme;
    }
    
    // Set up effect to save theme changes
    $effect(() => {
      localStorage.setItem('theme', data.theme);
      document.documentElement.setAttribute('data-theme', data.theme);
    });
  }