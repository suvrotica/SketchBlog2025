<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
    import SketchPad from '$lib/components/SketchPad.svelte';
    
    /** @type {import('./$types').PageProps} */
    let { data } = $props();
    
    let showNewSketchForm = $state(false);
    let insertAfterIndex = $state(-1);
  </script>
  
  <div class="max-w-4xl mx-auto py-8">
    <h1 class="text-3xl font-bold mb-8">{data.post.title}</h1>
    
    <div class="space-y-8">
      {#each data.post.sketches as sketch, i}
        <div class="relative">
          <svg
            viewBox="0 0 800 200"
            preserveAspectRatio="none"
            class="w-full h-48 border border-gray-200 rounded"
          >
            {@html sketch.data}
          </svg>
          
          <button
            class="absolute top-2 right-2 px-3 py-1 bg-green-500 text-white rounded text-sm"
            onclick={() => insertAfterIndex = i}
          >
            Insert After
          </button>
        </div>
        
        {#if insertAfterIndex === i}
          <SketchPad 
            postSlug={data.post.slug}
            previousId={sketch.id}
          />
        {/if}
      {/each}
    </div>
    
    {#if showNewSketchForm}
      <SketchPad postSlug={data.post.slug} />
    {:else}
      <button
        class="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
        onclick={() => showNewSketchForm = true}
      >
        Add New Sketch
      </button>
    {/if}
  </div>