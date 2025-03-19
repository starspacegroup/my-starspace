import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
  try {
    // Clear authentication-related cookies
    cookies.delete('session', { path: '/' });
    cookies.delete('access_token', { path: '/' });

    // Redirect the user to the homepage or login page after logout
    throw redirect(302, '/');
  } catch (error) {
    console.error('Error during sign-out:', error);
    return json({ error: 'Failed to sign out' }, { status: 500 });
  }
};
