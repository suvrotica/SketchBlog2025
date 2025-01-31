// src/routes/blog/new/+page.server.ts
import { error, redirect } from '@sveltejs/kit';
import { createPost } from '$lib/server/posts';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const title = data.get('title')?.toString();
    
    if (!title) {
      error(400, 'Title is required');
    }

    // Create URL-friendly slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    await createPost(slug, title);
    
    redirect(303, `/blog/${slug}`);
  }
};