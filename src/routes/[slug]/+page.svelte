<script>
  import { page } from '$app/stores';
  const user = $page.params.slug;
</script>


<section class="flex flex-col items-center justify-center min-h-screen text-center px-6">
  <div class="max-w-2xl">
    <h1 class="text-4xl font-bold  sm:text-6xl">Hello {user}!</h1>
</section>