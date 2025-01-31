import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, ALLOWED_USER } from "$env/static/private";
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

// Create the auth handler
const auth = SvelteKitAuth({
  providers: [
    GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })
  ],
  callbacks: {
    async signIn({ user }) {
      return user.email === ALLOWED_USER;
    }
  }
});

// Create the authorization handler
const authorization: Handle = async ({ event, resolve }) => {
  if (
    event.url.pathname.startsWith('/blog/new') || 
    event.request.method === 'POST'
  ) {
    const session = await event.locals.getSession();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }
  }
  
  return resolve(event);
};

// Combine the handlers using sequence
export const handle: Handle = sequence(auth.handle, authorization);