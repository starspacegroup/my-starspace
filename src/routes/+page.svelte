<script>
  import SampleConversation from "$lib/SampleConversation.svelte"
  import Icon from "@iconify/svelte";

  export let title = "My *Space";
  export let subtitle = "Productivity through public accountability.";
</script>

<section class="flex flex-col items-center justify-center min-h-screen text-center px-6">
  <div class="max-w-2xl">
    <h1 class="text-4xl font-bold  sm:text-6xl">{title}</h1>
    <p class="mt-4 text-lg  sm:text-xl">{subtitle}</p>
    <div class="mt-6">
      <button class="flex items-center justify-center space-x-2 mx-auto" disabled>
        <Icon icon="logos:discord-icon" />
        <span>Login</span>
      </button>
    </div>
    <SampleConversation />
  </div>
</section>
