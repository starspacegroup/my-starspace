// See https://svelte.dev/docs/kit/types#app.d.ts

import type { StringSelect } from "discord-interactions";

// for information about these interfaces
declare global {
    namespace App {
        interface Platform {
            env?: {
                AUTH_SECRET: string;
                AUTH_DISCORD_ID: string;
                AUTH_DISCORD_SECRET: string;
                AUTH_REDIRECT_PROXY_URL: string;
                AUTH_URL: string;
            };
            cf: CfProperties;
            ctx: ExecutionContext;
        }
    }
}

export { };