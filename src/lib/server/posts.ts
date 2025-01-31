// src/lib/server/posts.ts
import { readFile, writeFile, readdir } from 'node:fs/promises';
import type { Post, Sketch } from '$lib/types';
import { mkdir } from 'node:fs/promises';



export async function createPost(slug: string, title: string): Promise<Post> {
  const post = {
    slug,
    title,
    sketches: []
  };

  // Create directories
  await mkdir(`src/posts/${slug}/sketches`, { recursive: true });
  
  // Save post.json
  await writeFile(
    `src/posts/${slug}/post.json`,
    JSON.stringify(post, null, 2)
  );

  return post;
}

export async function loadPost(slug: string): Promise<Post> {
  const postData = JSON.parse(
    await readFile(`src/posts/${slug}/post.json`, 'utf-8')
  );
  
  try {
    // Load sketches and sort them by ID
    const sketchesDir = `src/posts/${slug}/sketches`;
    const sketchFiles = (await readdir(sketchesDir))
      .filter((file: string) => file.endsWith('.json'));
    
    const sketches = await Promise.all(
      sketchFiles.map(async (file: string) => {
        const sketch = JSON.parse(
          await readFile(`${sketchesDir}/${file}`, 'utf-8')
        );
        return sketch;
      })
    );

    sketches.sort((a: Sketch, b: Sketch) => {
      // Sort numerically by the numbers in sketch-XXX
      const aNum = parseFloat(a.id.replace('sketch-', ''));
      const bNum = parseFloat(b.id.replace('sketch-', ''));
      return aNum - bNum;
    });

    return {
      ...postData,
      sketches
    };
  } catch (error) {
    // If sketches directory doesn't exist or is empty
    return {
      ...postData,
      sketches: []
    };
  }
}

export async function saveSketch(slug: string, sketch: Sketch): Promise<void> {
  await writeFile(
    `src/posts/${slug}/sketches/${sketch.id}.json`,
    JSON.stringify(sketch, null, 2)
  );
}