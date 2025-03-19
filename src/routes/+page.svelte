<script>
  import LoginButton from "$lib/LoginButton.svelte"
  import SampleConversation from "$lib/SampleConversation.svelte";

  export let title = "My *Space";
  export let subtitle = "Productivity through public accountability.";
</script>

<main class="sm:flex items-center justify-center min-h-screen text-center px-6">  
  <section class="flex flex-col items-center justify-center min-h-screen text-center px-6 min-w-1/3">
    <div class="max-w-2xl">
      <h1 class="text-4xl font-bold sm:text-6xl">{title}</h1>
      <p class="mt-4 text-lg sm:text-xl">{subtitle}</p>
      <div class="mt-6">
        <LoginButton />
      </div>
    </div>
  </section>
  <section class="max-w-2xl mx-auto mt-16">
    <SampleConversation />
  </section>
</main>
