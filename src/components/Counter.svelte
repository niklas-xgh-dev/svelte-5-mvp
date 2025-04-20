<script>
    import { store, doubledCount } from '../lib/store.js';
    
    // Local state with runes (component-specific)
    let hovered = $state(false);
    let clickCount = $state(0);
    let lastClicked = $state('none');
    
    // Track all button clicks for analytics demo
    function trackClick(button) {
      clickCount++;
      lastClicked = button;
    }
  </script>
  
  <div class="counter-container" class:hovered role="region" aria-label="Counter"
    onmouseenter={() => hovered = true}
    onmouseleave={() => hovered = false}
  >
    <h2>Counter: {store.state.count}</h2>
    <p>Doubled: {doubledCount}</p>
    
    <div class="buttons">
      <button 
        onclick={() => {
          store.decrementCount();
          trackClick('decrement');
        }}
      >
        -
      </button>
      
      <button 
        onclick={() => {
          store.resetCount();
          trackClick('reset');
        }}
      >
        Reset
      </button>
      
      <button 
        onclick={() => {
          store.incrementCount();
          trackClick('increment');
        }}
      >
        +
      </button>
    </div>
    
    {#if clickCount > 0}
      <div class="analytics">
        <p>You've clicked {clickCount} times (last: {lastClicked})</p>
      </div>
    {/if}
  </div>
  
  <style>
    .counter-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .hovered {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
    
    .buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin: 1rem 0;
    }
    
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: var(--accent-color, #1976d2);
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
    }
    
    button:hover {
      background-color: color-mix(in srgb, var(--accent-color, #1976d2) 80%, white);
    }
    
    button:active {
      transform: scale(0.95);
    }
    
    .analytics {
      margin-top: 1rem;
      font-size: 0.85rem;
      color: #666;
    }
  </style>