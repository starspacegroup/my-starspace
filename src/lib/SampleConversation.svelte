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

  const botAvatar = 'https://cdn.discordapp.com/app-icons/1234640000239276053/c2157496a58f0c63c7de8bd1785cd11c.png';
  const userAvatar = 'https://cdn.discordapp.com/avatars/293484886726279168/056525646c5d0a955f276c80e8700815.webp?size=80';

  const conversation = [
  { user: `My *Space`, messageBody: `Starting 25-minute timebox: "Creating a Software Feature".`, bot: true, time: `<t:1741961887:R>` },  
  { user: `David`, messageBody: `Here's the mockup image for my idea:`, time: `<t:1741962007:R>` },
    { user: `David`, messageBody: `<img src="/sample-screenshot.png" alt="" class="">`, time: `<t:1741962247:R>` },
      { user: `David`, messageBody: `For styling, I'll set up Tailwind CSS because it makes things easier to style quickly.`, time: `<t:1741962127:R>` },
  { user: `David`, messageBody: `Now I'll add a basic page with a form for user input.`, time: `<t:1741962187:R>` },
  { user: `David`, messageBody: `Time to test things out in development mode: \`npm run dev\`.`, time: `<t:1741962307:R>` },
  { user: `David`, messageBody: `Looks good so far. I'm going to push this to GitHub so I have a backup.`, time: `<t:1741962367:R>` },
  { user: `My *Space`, messageBody: `Time's up! 25-minute session completed. Take a short break.`, bot: true, time: `<t:1741962427:R>` }
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
    }, 222);
  }

  onMount(() => {
    startSimulation();
  });
</script>

<style lang="postcss">
  @reference "tailwindcss";

  .chat-container {
    @apply max-w-5xl mx-auto;
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
    @apply border-1 border-gray-500;
    text-align: right;
  }
</style>

<div class="chat-container text-left">
  <div class="relative flex items-center mb-5">
    <hr class="flex-grow border-t border-gray-600">
    <span class="absolute left-1/2 -translate-x-1/2 bg-gray-800 text-gray-400 px-2 py-0.5 rounded text-xs font-semibold">
      March 14, 2025
    </span>
  </div>
  
  {#each messages as msg}
    <div class="message {msg.bot ? 'bot' : 'user'}">
      <div class="flex">
        <div class="w-20 min-w-20">
          <img src={msg.bot ? botAvatar : userAvatar} alt="" class="avatar w-20 rounded-full" />
        </div>
        <div class="text-left">
          <div class="timestamp">
            <strong>{msg.user}</strong>
            <span class="font-extralight text-foreground/50">
              {formatDiscordTimestamp(msg.time)}
            </span>
          </div>
          <div>
            {@html msg.messageBody}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
