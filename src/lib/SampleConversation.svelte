<script>
  import { onMount } from 'svelte';
  import { formatDiscordTimestamp } from './formatters';

  /**
   * @type {any[]}
   */
  let messages = [];
  let index = 1;
  /**
   * @type {ReturnType<typeof setTimeout>}
   */
  let interval;

  const conversation = [
  { user: `My *Space`, messageBody: `Starting 25-minute timebox: "Creating a Software Feature".`, bot: true, time: `<t:1741961887:t>` },
  { user: `You`, messageBody: `Here's the mockup image for my idea:`, time: `<t:1741962007:t>` },
    { user: `You`, messageBody: `<img src="/sample-screenshot.png" alt="" class="">`, time: `<t:1741962247:t>` },
      { user: `You`, messageBody: `For styling, I'll set up Tailwind CSS because it makes things easier to style quickly.`, time: `<t:1741962127:t>` },
  { user: `You`, messageBody: `Now I'll add a basic page with a form for user input.`, time: `<t:1741962187:t>` },
  { user: `You`, messageBody: `Time to test things out in development mode: \`npm run dev\`.`, time: `<t:1741962307:t>` },
  { user: `You`, messageBody: `Looks good so far. I'm going to push this to GitHub so I have a backup.`, time: `<t:1741962367:t>` },
  { user: `My *Space`, messageBody: `Time's up! 25-minute session completed. Take a short break.`, bot: true, time: `<t:1741962427:t>` }
];

  function startSimulation() {
    messages = [...messages, conversation[0]];

    interval = setInterval(() => {
      if (index < conversation.length) {
        messages = [...messages, conversation[index]];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 4000);
  }

  onMount(() => {
    startSimulation();
  });
</script>

<style>
  .chat-container {
    max-width: 600px;
    margin: auto;
    background: #2c2f33;
    color: white;
    padding: 20px;
    border-radius: 10px;
    font-family: sans-serif;
  }
  .message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }
  .bot {
    background: #7289da;
    text-align: left;
  }
  .user {
    background: #99aab5;
    text-align: right;
  }
</style>

<div class="chat-container">
  {#each messages as msg}
    <div class="message {msg.bot ? 'bot' : 'user'}">
      <div class="timestamp">
        {formatDiscordTimestamp(msg.time)}
      </div>
      <strong>{msg.user}:</strong> {@html msg.messageBody}
    </div>
  {/each}
</div>
