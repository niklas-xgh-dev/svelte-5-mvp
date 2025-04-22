<!-- src/Chat.svelte -->
<script lang="ts">
    // declare our prop via $props()
    interface Props { apiKey: string }
    let { apiKey }: Props = $props();
  
    // chat state
    let messages = $state([
      { role: 'system', content: 'You are a helpful assistant.' }
    ]);
    let input = $state('');
  
    async function send() {
      if (!input.trim()) return;
  
      messages.push({ role: 'user', content: input });
      const userText = input;
      input = '';
  
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages
        })
      });
  
      const { choices } = await res.json();
      messages.push({
        role: 'assistant',
        content: choices[0].message.content
      });
    }
  </script>
  
  <style>
    .chat { max-width:600px; margin:2rem auto; display:flex; flex-direction:column; }
    .messages { flex:1; overflow:auto; padding:0.5rem; border:1px solid #ddd; border-radius:4px; }
    .message { margin:0.5rem 0; }
    .message.user      { text-align:right; }
    .message.assistant { text-align:left; color:#555; }
    .input { display:flex; gap:0.5rem; margin-top:0.5rem; }
    input { flex:1; padding:0.5rem; border:1px solid #ccc; border-radius:4px; }
    button { padding:0.5rem 1rem; background:#ff3e00; color:white; border:none; border-radius:4px; cursor:pointer; }
  </style>
  
  <div class="chat">
    <div class="messages">
      {#each messages as { role, content }}
        <div class="message {role}">{content}</div>
      {/each}
    </div>
    <div class="input">
      <input
        placeholder="Type a message…"
        bind:value={input}
        on:keydown={(e) => e.key === 'Enter' && send()}
      />
      <button on:click={send}>Send</button>
    </div>
  </div>
  