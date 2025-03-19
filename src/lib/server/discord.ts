import DiscordOauth2 from 'discord-oauth2';
import { DISCORD_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_DISCORD_CLIENT_ID, PUBLIC_DISCORD_REDIRECT_URI } from '$env/static/public';


const oauth = new DiscordOauth2({
  clientId: PUBLIC_DISCORD_CLIENT_ID,
  clientSecret: DISCORD_CLIENT_SECRET,
  redirectUri: PUBLIC_DISCORD_REDIRECT_URI,
});

export async function getAccessToken(code: string): Promise<{ access_token: string; token_type: string; expires_in: number; refresh_token: string; scope: string; }> {
  try {
    return await oauth.tokenRequest({
      code,
      scope: 'identify email',
      grantType: 'authorization_code',
    });
  } catch (error) {
    console.error('Error getting Discord access token:', error);
    throw error;
  }
}

export async function getUserInfo(accessToken: string): Promise<{ id: string; username: string; discriminator: string; avatar: string | null | undefined; email?: string; }> {
  try {
    const userInfo = await oauth.getUser(accessToken);
    return {
      id: userInfo.id,
      username: userInfo.username,
      discriminator: userInfo.discriminator,
      avatar: userInfo.avatar,
      email: userInfo.email || undefined,
    };
  } catch (error) {
    console.error('Error getting Discord user info:', error);
    throw error;
  }
}

export function getAuthorizationUrl(): string {
  return oauth.generateAuthUrl({
    scope: ['identify', 'email'],
    state: crypto.randomUUID(),
  });
}