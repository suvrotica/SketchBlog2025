<!-- src/routes/blog/new/+page.svelte -->
<script>
    import { enhance } from '$app/forms';
  </script>
  
  <div class="max-w-2xl mx-auto py-8">
    <h1 class="text-3xl font-bold mb-8">Create Newer Blog Post</h1>
  
    <form
      method="POST"
      use:enhance
      class="space-y-4"
    >
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
  
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Post
      </button>
    </form>
  </div>