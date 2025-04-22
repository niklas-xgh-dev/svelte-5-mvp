<script>
  import Counter from './Counter.svelte';
  import Chat from './Chat.svelte';

  let name = $state("world");
  let apiKey = '';
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Welcome to your minimal Svelte application</p>

  <section style="margin:2rem 0;">
    <h2>Chat with GPT</h2>
    <Chat {apiKey} />
  </section>

  <div class="input-group">
    <label for="name-input">Change name:</label>
    <input id="name-input" bind:value={name} />
  </div>

  <Counter />
</main>

  <style>
    main {
      max-width: 600px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 2rem;
      text-align: center;
    }
    
    h1 {
      color: #ff3e00;
    }
    
    .input-group {
      margin: 1rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
    }
    
    input {
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  </style>