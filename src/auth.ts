// src/hooks.server.ts
import { SvelteKitAuth } from '@auth/sveltekit';
import type { DiscordProfile } from "@auth/core/providers/discord";
import Discord from '@auth/core/providers/discord';
import { AUTH_DISCORD_ID, AUTH_DISCORD_SECRET, AUTH_REDIRECT_PROXY_URL, AUTH_SECRET } from '$env/static/private';

// Extend the default session and JWT types to include Discord-specific fields
declare module "@auth/core/types" {
  interface Session {
    user: {
      username?: string;
      discriminator?: string;
      id?: string;
      avatar?: string;
      email?: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    discord_user?: DiscordProfile;
  }
}

// Auth configuration
export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Discord({
      clientId: AUTH_DISCORD_ID,
      clientSecret: AUTH_DISCORD_SECRET,
      redirectProxyUrl: AUTH_REDIRECT_PROXY_URL,
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (token.discord_user) {
        session.user.username = token.discord_user.username;
        session.user.discriminator = token.discord_user.discriminator;
        session.user.id = token.discord_user.id;
        session.user.avatar = token.discord_user.avatar || '';
        session.user.email = token.discord_user.email || '';
      }
      return session;
    },
    jwt: ({ token, profile }) => {
      if (profile) {
        token.discord_user = profile as DiscordProfile; // Cast profile to DiscordProfile
      }
      return token;
    },
  },
  secret: AUTH_SECRET,
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