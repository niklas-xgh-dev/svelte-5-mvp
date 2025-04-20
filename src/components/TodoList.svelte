<script>
    // State for the todo list
    let todos = $state([
      { id: 1, text: 'Learn Svelte', completed: true },
      { id: 2, text: 'Build an app', completed: false },
      { id: 3, text: 'Deploy to production', completed: false }
    ]);
    
    // State for the new todo input
    let newTodo = $state('');
    
    // Counter for generating unique IDs
    let nextId = $state(4);
    
    // Derived value for incomplete todos count
    let remainingCount = $derived(todos.filter(todo => !todo.completed).length);
    let totalCount = $derived(todos.length);
    
    // Handler for form submission
    function handleSubmit(event) {
      event.preventDefault();
      
      // Don't add empty todos
      if (!newTodo.trim()) return;
      
      // Add the new todo
      todos = [
        ...todos, 
        {
          id: nextId,
          text: newTodo.trim(),
          completed: false
        }
      ];
      
      // Increment ID counter and clear the input
      nextId++;
      newTodo = '';
    }
    
    // Toggle the completed status of a todo
    function toggleTodo(id) {
      todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    }
    
    // Delete a todo
    function deleteTodo(id) {
      todos = todos.filter(todo => todo.id !== id);
    }
    
    // Clear all completed todos
    function clearCompleted() {
      todos = todos.filter(todo => !todo.completed);
    }
  </script>
  
  <div class="todo-list-container">
    <h1>Todo List</h1>
    
    <p class="todo-count">
      {remainingCount} remaining out of {totalCount} tasks
    </p>
    
    <form onsubmit={handleSubmit} class="todo-form">
      <input 
        type="text" 
        bind:value={newTodo}
        placeholder="What needs to be done?"
        aria-label="New todo"
      />
      <button type="submit">Add Todo</button>
    </form>
    
    {#if todos.length > 0}
      <ul class="todo-items">
        {#each todos as todo (todo.id)}
          <li class:completed={todo.completed}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onchange={() => toggleTodo(todo.id)}
              id={`todo-${todo.id}`}
            />
            <label for={`todo-${todo.id}`}>{todo.text}</label>
            <button 
              class="delete-btn"
              onclick={() => deleteTodo(todo.id)}
              aria-label={`Delete ${todo.text}`}
            >
              ×
            </button>
          </li>
        {/each}
      </ul>
      
      {#if todos.some(todo => todo.completed)}
        <button 
          class="clear-completed"
          onclick={clearCompleted}
        >
          Clear completed
        </button>
      {/if}
    {:else}
      <p class="empty-state">No todos yet! Add one above.</p>
    {/if}
  </div>
  
  <style>
    .todo-list-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 1rem;
      font-family: sans-serif;
    }
    
    h1 {
      text-align: center;
      color: #333;
    }
    
    .todo-count {
      text-align: center;
      color: #666;
      font-size: 0.9rem;
    }
    
    .todo-form {
      display: flex;
      margin-bottom: 1rem;
    }
    
    input[type="text"] {
      flex: 1;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    
    button[type="submit"] {
      padding: 0.5rem 1rem;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
    
    button[type="submit"]:hover {
      background-color: #45a049;
    }
    
    .todo-items {
      list-style-type: none;
      padding: 0;
    }
    
    .todo-items li {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      background-color: #f9f9f9;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    
    .todo-items li.completed label {
      text-decoration: line-through;
      color: #888;
    }
    
    .todo-items li label {
      margin-left: 0.5rem;
      flex: 1;
    }
    
    .delete-btn {
      background: none;
      border: none;
      color: #f44336;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0 0.5rem;
    }
    
    .delete-btn:hover {
      color: #d32f2f;
    }
    
    .clear-completed {
      background: none;
      border: 1px solid #ddd;
      color: #888;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin-top: 1rem;
      cursor: pointer;
    }
    
    .clear-completed:hover {
      background-color: #f5f5f5;
    }
    
    .empty-state {
      text-align: center;
      color: #888;
      font-style: italic;
      padding: 1rem;
    }
  </style>