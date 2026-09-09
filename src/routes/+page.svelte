<script>
  import SampleConversation from "$lib/SampleConversation.svelte";
  import { page } from "$app/state";
  import { SignIn } from "@auth/sveltekit/components"
  import Icon from "@iconify/svelte"

  const title = "My *Space";
  const subtitle = "Your *Space member dashboard.";
</script>

<main class="sm:flex items-center justify-center min-h-screen text-center px-6">  
  <section class="flex flex-col items-center justify-center min-h-screen text-center px-6 min-w-1/3">
    <div class="max-w-2xl">
      <h1 class="text-4xl font-bold sm:text-6xl">{title}</h1>
      <p class="mt-4 text-lg sm:text-xl">{subtitle}</p>
      <p class="mt-4 text-lg sm:text-xl">
        Exclusive to
        <a href="https://discord.gg/6JXhPBAUWU" class="text-blue-500">*Space</a>
        members.
      </p>
      {#if page.data.session}
        <p>Signed in as {page.data.session.user?.name}</p>
         <a href="/my-dashboard" class="text-blue-500 hover:underline">My Dashboard</a>
      {:else}
        <SignIn provider="discord" signInPage="user-auth/login" options={{redirect: false, redirectTo: "/my-dashboard"}} className="my-3">
          <div slot="submitButton" class="flex space-x-2 items-center">
            <Icon icon="ph:discord-logo-fill" />
            <span>Discord Login</span>
          </div>
        </SignIn>
      {/if}
    </div>
  </section>
  <section class="max-w-2xl mx-auto mt-16">
    <SampleConversation />
  </section>
</main>
