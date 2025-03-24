import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';

const authorizationHandle: Handle = async ({ event, resolve }) => {
  // Protect any routes under /user-dashboard:
  if (event.url.pathname.startsWith('/user-dashboard')) {
    const session = await event.locals.auth?.();
    if (!session) {
      // Redirect to home page if not logged in:
      throw redirect(303, '/');
    }
  }

  // Otherwise proceed as normal
  return resolve(event);
};

// Authenticate then authorize
export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
