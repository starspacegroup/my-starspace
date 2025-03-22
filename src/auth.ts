// src/hooks.server.ts
import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import { AUTH_DISCORD_ID, AUTH_DISCORD_SECRET, AUTH_REDIRECT_PROXY_URL } from '$env/static/private';

// Auth configuration
export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Discord({
      clientId: AUTH_DISCORD_ID,
      clientSecret: AUTH_DISCORD_SECRET,
      redirectProxyUrl: AUTH_REDIRECT_PROXY_URL,
    })
  ],
  basePath: 'user-auth',
  pages: {
    signIn: '/user-auth/login',
    signOut: '/user-auth/logout',
    error: '/user-auth/error',
    verifyRequest: '/user-auth/verify-request',
    newUser: '/user-auth/new-user'
  },
  trustHost: true,
});