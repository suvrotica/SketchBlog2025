// src/routes/blog/[slug]/+page.server.ts
import { error, fail } from '@sveltejs/kit';
import { loadPost, saveSketch } from '$lib/server/posts';
import type { Sketch } from '$lib/types';

export async function load({ params }) {
  const post = await loadPost(params.slug);
  return { post };
}

export const actions = {
  saveSketch: async ({ request, locals }) => {
    // Check authentication
    const session = await locals.getSession();
    if (!session?.user) {
      return fail(401, { message: 'Unauthorized' });
    }

    const data = await request.formData();
    const postSlug = data.get('postSlug')?.toString();
    const previousId = data.get('previousId')?.toString();
    const svgContent = data.get('svgContent')?.toString();
    
    if (!postSlug || !svgContent) {
      error(400, 'Missing required fields');
    }
    
    let newId: string;
    if (previousId) {
      const prevNum = parseFloat(previousId.replace('sketch-', ''));
      newId = `sketch-${prevNum + 0.5}`;
    } else {
      const post = await loadPost(postSlug);
      const lastSketch = post.sketches[post.sketches.length - 1];
      const lastNum = lastSketch ? 
        Math.ceil(parseFloat(lastSketch.id.replace('sketch-', ''))) : 
        0;
      newId = `sketch-${(lastNum + 1).toString().padStart(3, '0')}`;
    }
    
    const sketch: Sketch = {
      id: newId,
      data: svgContent
    };
    
    await saveSketch(postSlug, sketch);
    
    return { success: true };
  }
};