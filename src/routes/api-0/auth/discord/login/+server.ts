import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
  try {
    // Discord API login process
    const tokenResponse = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=<CODE>&redirect_uri=https://example.com`,
    });

    const token = await tokenResponse.json();

    // Store the access token in a cookie or session
    return json({ token });
  } catch (error) {
    console.error('Error logging in with Discord:', error);
    return json({ error: 'Failed to log in' }, { status: 500 });
  }
};