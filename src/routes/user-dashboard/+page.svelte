<script>
  import { page } from '$app/state';
  import { SignOut } from '@auth/sveltekit/components';

  import Icon from '@iconify/svelte'

  const userCompletedSignup = false;
  const userSignedIn = page.data.session?.user || false;
</script>

<main class="min-h-screen flex items-center min-w-xs">
  <div class="w-full max-w-7xl mx-auto p-6 text-white bg-[#2b2d31] rounded-md shadow-lg">
    <div class="flex justify-between mb-7">

      <h1 class="text-2xl font-bold mb-4">My *Space Settings</h1>
      
      <div class="text-right">
        <SignOut provider="discord" signOutPage="user-auth/logout" options={{redirect: false, redirectTo: "/"}}>
          <div slot="submitButton" class="flex space-x-2 items-center">
            <span>Logout</span>
          </div>  
        </SignOut>
      </div>
      
    </div>
    
    {#if userSignedIn}
    <div class="flex items-center gap-4 bg-[#313338] p-4 rounded-md mb-6">
      <img 
      src={userSignedIn.image} 
      alt={`${userSignedIn.username}'s avatar`} 
      class="w-24 h-24 rounded-full border border-gray-600"
      />
      <div class="w-full">
        <h3>Current Discord Info</h3>
        <ul class="list-disc ml-3">
          <li class="text-md font-light"><strong class="font-bold">Name:</strong> {userSignedIn.name}</li>
          <li class="text-md font-light"><strong class="font-bold">Username:</strong> {userSignedIn.username}</li>
          <li class="text-md font-light"><strong class="font-bold">ID:</strong> {userSignedIn.id?.toString()}</li>
          <li class="text-md font-light"><strong class="font-bold">Email:</strong> {userSignedIn.email}</li>
        </ul>
      </div>
    </div>
    {/if}
    
    {#if userSignedIn && !userCompletedSignup}
    <div class="bg-[#313338] p-6 rounded-md mb-6">
      <h2 class="text-xl font-semibold mb-4">Create Your My *Space Page</h2>
      
      <div class="my-6">
        <label class="block mb-2 text-sm font-medium text-gray-300" for="username_text">Choose a url slug:</label>
        <div class="flex items-center bg-[#1e1f22] rounded-md">
          <span class="text-gray-400 italic pl-3">my.starspace.group/</span>
          <input type="text" value={userSignedIn.username ?? 'username'} placeholder="Username" class="bg-transparent text-white ml-2 flex-1 ring-green-500 ring-1 rounded focus:ring-0 p-1 w-12" id="username_text" />
        </div>
      </div>
        
      <div class="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-md flex items-center space-x-2">
        <Icon icon="typcn:info" class="text-yellow-500 min-w-5" />
        <p class="text-yellow-400">By registering you are agreeing to the My *Space <a href="/terms-of-service" target="_blank" class="text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy-policy" target="_blank" class="text-blue-400 hover:underline">Privacy Policy</a>.</p>
      </div>
      <div class="text-center">
        <button class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md">Register Slug</button>
      </div>
    </div>
    {:else if userSignedIn && userCompletedSignup}
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-300" for="username_text">Change your url slug:</label>
      <div class="flex items-center bg-[#1e1f22] p-2 rounded-md">
        <span class="text-gray-400 italic">my.starspace.group/</span>
        <input type="text" value={userSignedIn.username ?? 'username'} placeholder="Username" class="bg-transparent text-white ml-2 flex-1 ring-1 rounded focus:ring-0 p-1" id="username_text" />
      </div>
      <div class="text-center">
        <button class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md">Update Slug</button>
      </div>
    </div>
    {:else if !userSignedIn}
    <div class="bg-red-500/10 border-l-4 border-red-500 p-4 text-red-400 rounded-md">
      Please sign in to access your dashboard.
    </div>
    {/if}
  </div>
</main>
  