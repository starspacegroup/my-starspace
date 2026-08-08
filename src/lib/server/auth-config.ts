export const AUTH_ENV_KEYS = [
	'AUTH_DISCORD_ID',
	'AUTH_DISCORD_SECRET',
	'AUTH_REDIRECT_PROXY_URL',
	'AUTH_SECRET'
] as const;

type AuthEnvironment = Record<string, string | undefined>;

export function createAuthConfig(env: AuthEnvironment): {
	clientId: string;
	clientSecret: string;
	redirectProxyUrl: string;
	secret: string;
} {
	return {
		clientId: env.AUTH_DISCORD_ID ?? '',
		clientSecret: env.AUTH_DISCORD_SECRET ?? '',
		redirectProxyUrl: env.AUTH_REDIRECT_PROXY_URL ?? '',
		secret: env.AUTH_SECRET ?? ''
	};
}
