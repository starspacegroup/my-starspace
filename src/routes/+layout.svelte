<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="w-full">
	{@render children()}
</main>

