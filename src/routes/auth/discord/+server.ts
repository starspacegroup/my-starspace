import { json, redirect } from '@sveltejs/kit';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } from '$env/static/private';
import * as cookie from 'cookie';

const DISCORD_AUTH_URL = 'https://discord.com/api/oauth2/authorize';
const DISCORD_TOKEN_URL = 'https://discord.com/api/oauth2/token';
const DISCORD_USER_URL = 'https://discord.com/api/users/@me';

export async function GET({ url, cookies }) {
  const code = url.searchParams.get('code');

  if (!code) {
    // Redirect user to Discord login
    const params = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      response_type: 'code',
      scope: 'identify',
      redirect_uri: DISCORD_REDIRECT_URI
    });

    throw redirect(302, `${DISCORD_AUTH_URL}?${params}`);
  }

  // Exchange code for an access token
  const tokenResponse = await fetch(DISCORD_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: DISCORD_REDIRECT_URI
    })
  });

  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) return json({ error: 'OAuth failed' }, { status: 400 });

  // Fetch user info
  const userResponse = await fetch(DISCORD_USER_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });

  const userData = await userResponse.json();

  // Set user session
  cookies.set('session', JSON.stringify(userData), {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });

  throw redirect(302, '/');
}
