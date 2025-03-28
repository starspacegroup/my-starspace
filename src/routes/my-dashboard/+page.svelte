<script lang="ts">
  import { page } from '$app/state';
  import { SignOut } from '@auth/sveltekit/components';

  import Icon from '@iconify/svelte'

  // list of servers the My *Space bot is in:
  const botJoinedServers: string[] = [
    "1009583217948491928", // *Space
  ];

  const userCompletedSignup = false;
  const userSignedIn = page.data.session?.user || false;

  if (!userSignedIn) {
    throw new Error("User not signed in.");
  }

  const discordId = userSignedIn.id;
  const discordUsername = userSignedIn.username;
  const discordName = userSignedIn.name;
  const discordDiscriminator = userSignedIn.discriminator;
  const discordImage = userSignedIn.image;
  const discordEmailPartial =  userSignedIn.email?.substring(0, 3) + '...' + getStringFromAtToEnd(userSignedIn.email?.toString() || '');
  const discordServerIds = userSignedIn.server_ids || [];

  // userSharesServerWithBot = true if discordServerIds includes any of the servers in botJoinedServers:
  const userSharesServerWithBot = discordServerIds.some((serverId) => botJoinedServers.includes(serverId));

  function getStringFromAtToEnd(str: String): String {
  const atIndex = str.indexOf('@');
  if (atIndex !== -1) {
    return str.substring(atIndex);
  }
  return ''; // Or handle the case where "@" is not found as needed
}

</script>

<main class="min-h-screen flex items-center min-w-xs">
  <div class="w-full max-w-7xl mx-auto p-6 text-white bg-[#2b2d31] rounded-md shadow-lg">
    <div class="flex justify-between mb-7">

      <h1 class="text-2xl font-bold mb-4">My *Space Settings</h1>
      
      <div class="text-right">
        <SignOut provider="discord" signOutPage="user-auth/logout" options={{redirect: false, redirectTo: "/"}}>
          <div slot="submitButton" class="flex space-x-2 items-center">
            <Icon icon="material-symbols:logout" />
            <span>Logout</span>
          </div>  
        </SignOut>
      </div>
      
    </div>
    
    {#if userSignedIn}
    <div class="items-center gap-4 bg-[#313338] p-4 rounded-md mb-6">
      <div class="w-full">
        <h3 class="font-medium">Current Discord Info:</h3>
        <div class="flex-1 w-32 my-3">
          <img 
          src={discordImage} 
          alt={`${discordUsername}'s avatar`} 
          class="mx-auto w-24 h-24 rounded-full border border-gray-600"
          />
          <p class="text-center font-bold">
            {discordName}
          </p>
        </div>
        <ul class="list-disc ml-3">
          <li class="text-md font-light"><strong class="font-bold">Username:</strong> {discordUsername}#{discordDiscriminator}</li>
          <li class="text-md font-light"><strong class="font-bold">ID:</strong> {discordId}</li>
          <li class="text-md font-light"><strong class="font-bold">Email:</strong> {discordEmailPartial}</li>

        </ul>
      </div>
    </div>
    {/if}
    
    {#if !userCompletedSignup}
    <div class="bg-[#313338] p-6 rounded-md mb-6">
      <h2 class="text-xl font-semibold mb-4">Create Your My *Space Page</h2>
      {#if !userSharesServerWithBot}
        <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-md flex items-center space-x-2">
          <Icon icon="typcn:info" class="text-red-500 min-w-5" />
            <p class="text-red-400 font-bold text-xl">
              In order to interact with the My *Space bot you must be in at least one shared server.
            </p>
        </div>
        <div class="text-center">
          <button class="mx-auto px-4 py-2 mt-5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md ">
              <a href="https://discord.gg/6JXhPBAUWU" target="_blank" class="flex items-center space-x-3">
              <Icon icon="material-symbols:tv-signin" />
              <span>Join *Space?</span>
            </a>
            </button>
        </div>
      {/if}
      <div class={`${!userSharesServerWithBot ? 'opacity-25' : ''}`}>
        <div class="my-6">
          <label class="block mb-2 text-sm font-medium text-gray-300" for="username_text">Choose a url slug:</label>
          <div class="flex items-center bg-[#1e1f22] rounded-md">
            <span class="text-gray-400 italic pl-3">my.starspace.group/</span>
            <input type="text" value={discordUsername ?? 'username'} placeholder="Username" class="bg-transparent text-white ml-2 flex-1 ring-green-500 ring-1 rounded focus:ring-0 p-1 w-12 disabled:cursor-not-allowed disabled:ring-red-500 disabled:text-red-300" id="username_text" disabled={!userSharesServerWithBot}/>
          </div>
        </div>
        
        <div class="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-md flex items-center space-x-2">
          <Icon icon="typcn:info" class="text-yellow-500 min-w-5" />
          <p class="text-yellow-400">By creating a page you are agreeing to the My *Space <a href="/terms-of-service" target="_blank" class="text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy-policy" target="_blank" class="text-blue-400 hover:underline">Privacy Policy</a>.</p>
        </div>
        <div class="mt-4">
          <button class="mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center space-x-3 disabled:bg-blue-600/20 disabled:cursor-not-allowed" disabled={!userSharesServerWithBot}>
            <Icon icon="material-symbols:tv-signin" />
            <span>Create Page</span>
          </button>
        </div>
      </div>
    </div>
    {:else if userCompletedSignup}
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-300" for="username_text">Change your url slug:</label>
      <div class="flex items-center bg-[#1e1f22] p-2 rounded-md">
        <span class="text-gray-400 italic">my.starspace.group/</span>
        <input type="text" value={discordUsername ?? 'username'} placeholder="Username" class="bg-transparent text-white ml-2 flex-1 ring-1 rounded focus:ring-0 p-1" id="username_text" />
      </div>
      <div class="mt-4">
        <button class="mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center space-x-3">
          <Icon icon="material-symbols:tv-signin" />
          <span>Update Slug</span>
        </button>
      </div>
    </div>
    {/if}
  </div>
</main>