<script lang="ts">
	let { data } = $props()
	const discord_session_user = data.data;

</script>

<div>
	<h1 class="text-2xl font-bold mb-4">Hello, {discord_session_user.username}!</h1>
	<img src={`https://cdn.discordapp.com/avatars/${discord_session_user.id}/${discord_session_user.avatar}`} alt="" class="rounded-full w-24 h-24" />
</div>

<!-- For each of the keys in props.data -->
 {#each Object.keys(discord_session_user) as key, value}
	<div>{key}: {JSON.stringify(discord_session_user[key])}</div>
	{/each}