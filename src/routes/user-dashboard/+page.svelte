<script>
  import { page } from '$app/state';
  import { SignOut } from '@auth/sveltekit/components'

</script>


<main>
  <h1>User Dashboard</h1>
  {#if page.data.session}
    <p>Signed in as {page.data.session.user?.name}</p>
    <p>User id: {page.data.session.user?.id}</p>
    <img src={page.data.session.user?.image} alt="">
    <SignOut signOutPage="user-auth/logout" options={{redirectTo: "/"}} />
  {/if}
</main>