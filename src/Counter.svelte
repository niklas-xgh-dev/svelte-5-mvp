<script>
    let count = $state(0);
    
    function increment() {
      count += 1;
    }
  </script>
  
  <div class="counter">
    <h2>Counter Component</h2>
    <p>Current count: {count}</p>
    <button onclick={increment}>Increment</button>
  </div>
  
  <style>
    .counter {
      border: 1px solid #ff3e00;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 2rem;
    }
    
    button {
      background-color: #ff3e00;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #dd3700;
    }
  </style>