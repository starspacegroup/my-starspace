<script>
  import { page } from '$app/state';
  import { SignOut } from '@auth/sveltekit/components'

  const userCompletedSignup = false;
  const userSignedIn = page.data.session;
  
  // Add these variables to track your conditions
  let usernameRegistered = false;
  let hasAcceptedTOS = false;
  let isNewDiscordUser = true;
  let canRegisterUsername = true;
</script>

<main class="max-w-4xl mx-auto p-6  rounded-lg shadow-md text-white bg-black">
  <h1 class="text-3xl font-bold text-white">User Dashboard</h1>
  {#if userSignedIn && userSignedIn.user?.image}
    <div class="flex items-center gap-3">
      <img 
        src={userSignedIn.user.image} 
        alt={`${userSignedIn.user.username}'s avatar`}
        class="w-10 h-10 rounded-full border-2 border-blue-500"
      />
      <SignOut provider="discord" signOutPage="user-auth/logout" options={{redirect: false, redirectTo: "/"}}>
        <div slot="submitButton" class="flex space-x-2 items-center">
          <span>Logout</span>
        </div>
      </SignOut>
    </div>
  {/if}

  {#if userSignedIn && !userCompletedSignup}
    <div class=" p-6 rounded-lg mb-6">
      <div class="mb-4">
        <span class="text-red-500 font-black text-4xl">THIS DOES NOT WORK YET</span>
        <h2 class="text-xl font-semibold mb-2">Account Information</h2>
        <p class="text-white">Signed in as <span class="font-medium">{userSignedIn.user?.name ?? 'Unknown User'}</span></p>
        <p class={userSignedIn.user?.discriminator === '0' ? 'text-green-600' : 'text-red-700'}>
          {userSignedIn.user?.discriminator === '0' ? 'You can register your username (discriminator == 0).' : 'You can not register your username (discriminator != 0)'}
        </p>
        <p class="text-white mb-2">
          <span class="font-medium">Discord ID:</span> 
          {userSignedIn.user?.username ?? 'N/A'}#{userSignedIn.user?.discriminator ?? 'N/A'}
        </p>
        <p>
          <strong>usernameRegistered:</strong> {usernameRegistered}
        </p>
        <p>
          <strong>isNewDiscordUser:</strong> {isNewDiscordUser}
        </p>
        <p>
          <strong>hasAcceptedTOS:</strong> {hasAcceptedTOS}
        </p>
      </div>

      {#if isNewDiscordUser}
        {#if !usernameRegistered}
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <p class="text-blue-700">Your username isn't registered yet.</p>
          </div>
          
          {#if !hasAcceptedTOS}
            <div class="border rounded-lg p-4 mb-6">
              <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p class="text-yellow-700">Please accept the Terms of Service to continue.</p>
              </div>
              
              <div class="mb-4">
                <label class="flex items-start gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    bind:checked={hasAcceptedTOS} 
                    on:change={() => hasAcceptedTOS = !hasAcceptedTOS}
                    class="mt-1"
                  />
                  <span>
                    I accept the 
                    <a href="/terms-of-service" target="_blank" class="text-blue-600 hover:underline">Terms of Service</a> 
                    and 
                    <a href="/privacy-policy" target="_blank" class="text-blue-600 hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>
            </div>
          {:else}
            <div class="border rounded-lg p-6 ">
              <h3 class="text-lg font-medium mb-3">Register Your Username</h3>
              <p class="mb-3">Would you like to register this Discord username as your personal My *Space address?</p>
              <div class=" p-3 rounded mb-4 font-mono text-sm">
                https://my.starspace.group/{userSignedIn.user?.username}
              </div>
              <button 
                on:click={() => {canRegisterUsername = false; usernameRegistered = true;}}
                disabled={!canRegisterUsername}
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Register Username
              </button>
            </div>
          {/if}
        {:else}
          <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <p class="text-green-700">
              Username successfully registered! Your personal URL is:
            </p>
            <div class=" p-3 rounded mt-2 font-mono text-sm">
              https://my.starspace.group/{userSignedIn.user?.username}
            </div>
          </div>
        {/if}
      {:else}
        <div class="border rounded-lg p-6 ">
          <h3 class="text-lg font-medium mb-3">Register Your Username</h3>
          <p class="mb-3">Would you like to register this Discord username as your personal My *Space address?</p>
          <div class=" p-3 rounded mb-4 font-mono text-sm">
            https://my.starspace.group/{userSignedIn.user?.username}
          </div>
          <button 
            on:click={() => {canRegisterUsername = !canRegisterUsername}}
            disabled={!canRegisterUsername}
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Register Username
          </button>
        </div>
      {/if}
    </div>
  {:else if !userSignedIn}
    <div class="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
      Please sign in to access your dashboard.
    </div>
  {:else if userCompletedSignup}
    <div class="flex justify-center items-center p-10">
      <div class="text-center">
        <p class="mb-4">Redirecting to full dashboard...</p>
        <div class="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  {/if}
</main>