<script>
  import SampleConversation from "$lib/SampleConversation.svelte";
  import { signIn, signOut } from "@auth/sveltekit/client"
  import { page } from "$app/stores";
  import { SignIn, SignOut } from "@auth/sveltekit/components"
  import Icon from "@iconify/svelte"

  export let title = "My *Space";
  export let subtitle = "Productivity through public accountability.";
</script>

<main class="sm:flex items-center justify-center min-h-screen text-center px-6">  
  <section class="flex flex-col items-center justify-center min-h-screen text-center px-6 min-w-1/3">
    <div class="max-w-2xl">
      <h1 class="text-4xl font-bold sm:text-6xl">{title}</h1>
      <p class="mt-4 text-lg sm:text-xl">{subtitle}</p>
      {#if $page.data.session}
        <p>Signed in as {$page.data.session.user?.name}</p>
         <a href="/user-dashboard" class="text-blue-500 hover:underline">My Dashboard</a>
      {:else}
        <SignIn provider="discord" signInPage="user-auth/login" options={{redirect: false, redirectTo: "/user-dashboard"}}>
          <div slot="submitButton" class="flex space-x-2 items-center">
            <Icon icon="ph:discord-logo-fill" />
            <span>Login</span>
          </div>  
        </SignIn>
      {/if}
    </div>
  </section>
  <section class="max-w-2xl mx-auto mt-16">
    <SampleConversation />
  </section>
</main>