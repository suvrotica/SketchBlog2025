<!-- src/routes/+layout.svelte -->

<script lang="ts">
		import { page } from '$app/state';
		import '../app.css';
		let { children } = $props();
	</script>

  
  <div>
	<header class="bg-white shadow">
	  <div class="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
		<h1 class="text-2xl font-bold">SketchBlog</h1>
		
		<div>
		  {#if page.data.session}
			<a 
			  href="/blog/new"
			  class="text-blue-500 hover:text-blue-600"
			>
			  New Post
			</a>
			<a 
			  href="/auth/signout"
			  class="ml-4 text-red-500 hover:text-red-600"
			>
			  Sign Out
			</a>
		  {:else}
			<a 
			  href="/auth/signin"
			  class="text-blue-500 hover:text-blue-600"
			>
			  Sign In
			</a>
		  {/if}
		</div>
	  </div>
	</header>
  
	
	
	{@render children()}
  </div>