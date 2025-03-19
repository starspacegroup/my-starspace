<script>
  import Icon from "@iconify/svelte";
  import { PUBLIC_DISCORD_CLIENT_ID, PUBLIC_DISCORD_REDIRECT_URI } from '$env/static/public';

  const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=${PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(PUBLIC_DISCORD_REDIRECT_URI)}&response_type=code&scope=identify`;
  import { onMount } from "svelte";

  let buttonDisabled = true;

  onMount(async () => {
    try {
      buttonDisabled = false;

    } catch (error) {
      console.error("Failed to fetch Discord login URL:", error);
    }
  });

</script>

<main>
  <noscript>
    <p>Please enable JavaScript to log in with Discord.</p>
  </noscript>
  <a href={discordOAuthUrl} class="flex items-center justify-center space-x-2 mx-auto" aria-disabled={buttonDisabled}>
    <button disabled={buttonDisabled} class="flex items-center space-x-2 cursor-pointer disabled:cursor:not-allowed">
      <Icon icon="logos:discord-icon" />
      <span>Login</span>
    </button>
  </a>
</main>  
