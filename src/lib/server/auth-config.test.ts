import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { AUTH_ENV_KEYS, createAuthConfig } from './auth-config';

describe('auth environment contract', () => {
	it('maps the Auth.js Discord variables used by the application', () => {
		expect(
			createAuthConfig({
				AUTH_DISCORD_ID: 'client-id',
				AUTH_DISCORD_SECRET: 'client-secret',
				AUTH_REDIRECT_PROXY_URL: 'http://127.0.0.1:8788/user-auth/callback/discord',
				AUTH_SECRET: 'session-secret'
			})
		).toEqual({
			clientId: 'client-id',
			clientSecret: 'client-secret',
			redirectProxyUrl: 'http://127.0.0.1:8788/user-auth/callback/discord',
			secret: 'session-secret'
		});
	});

	it('documents every required auth variable in .env.example', () => {
		const example = readFileSync(new URL('../../../.env.example', import.meta.url), 'utf8');

		for (const key of AUTH_ENV_KEYS) {
			expect(example).toMatch(new RegExp(`^${key}=`, 'm'));
		}
	});
});
