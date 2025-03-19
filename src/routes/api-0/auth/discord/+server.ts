import { json, redirect } from '@sveltejs/kit';
import { PUBLIC_DISCORD_CLIENT_ID, PUBLIC_DISCORD_REDIRECT_URI } from '$env/static/public';
import { DISCORD_CLIENT_SECRET } from '$env/static/private';
import { dev } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';

// Define types for the Discord user and token response
interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator?: string;
  email?: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

// Session data type
interface SessionData {
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  access_token: string;
  refresh_token: string;
  expires_at: number;
}


export async function GET({ url }) {
  const code = url.searchParams.get('code');
  if (!code) return json({ error: 'No code provided' }, { status: 400 });

  const data = new URLSearchParams({
    client_id: PUBLIC_DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: PUBLIC_DISCORD_REDIRECT_URI
  });

  // Exchange code for access token
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data
  });

  const tokenResponse: any = await response.json();
  if (!tokenResponse.access_token) {
    return json({ error: 'Failed to get access token' }, { status: 400 });
  }

  // Fetch user data
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
  });

  const user: any = await userResponse.json();

  // Store user session (For now, let's log it)
  console.log('User:', user);

  // Redirect to home with a success message (Adjust this as needed)
  throw redirect(302, `/my-account`);
}



