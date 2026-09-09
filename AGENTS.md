# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

**My \*Space** (`my-starspace`) — a productivity blog platform for members of the \*Space Discord server: "Post to your personal website from Discord." Users sign in with Discord OAuth; access is gated on membership in the \*Space server. Live at https://my.starspace.group. Built with SvelteKit (Svelte 5) + TypeScript + Tailwind CSS 4, deployed to Cloudflare Pages (README also names Workers and Workflows, but no Workflows code exists in `src/` yet).

## Commands

Package manager: **npm** (`package-lock.json`; ignore the README's stale `yarn` instructions).

| Task | Command |
| --- | --- |
| Install | `npm install` |
| Dev server | `npm run dev` — Vite dev server on **http://127.0.0.1:8788** (host/port pinned in the script) |
| Build | `npm run build` (Vite build → `.svelte-kit/cloudflare`) |
| Preview on CF runtime | `npm run preview` — builds, then `wrangler pages dev --live-reload` |
| Type check | `npm run check` (svelte-kit sync + svelte-check); `npm run check:watch` |
| Lint | `npm run lint` (eslint) |
| Tests (watch) | `npm run test:unit` |
| Tests (once) | `npm test` |
| Single test file | `npx vitest run src/routes/page.svelte.test.ts` |
| Deploy | `npm run deploy` — `npm run build && wrangler pages deploy` |
| CF type generation | `npm run cf-typegen` — note: uses the Windows `move` command to relocate `worker-configuration.d.ts` into `src/`; on macOS/Linux move the file manually (`mv`) |

`build.sh` is the CI/Pages build entry: when `NODE_ENV=production` it runs `npm install --include=dev` before `npm run build`; for staging or anything else it only runs `npm run build`. Locally, plain `npm run build` is equivalent.

### Test layout (vitest workspace in `vite.config.ts`)

- **client** project: `src/**/*.svelte.{test,spec}.{js,ts}` in jsdom, with `vitest-setup-client.ts` (adds jest-dom matchers and a `window.matchMedia` mock required for Svelte 5 + jsdom). Component tests must use the `.svelte.test.ts` suffix to land here.
- **server** project: all other `src/**/*.{test,spec}.{js,ts}` in a Node environment.
- Target one project with `npx vitest run --project client` / `--project server`.

## Architecture

- **Auth (`src/auth.ts`)**: Auth.js (`@auth/sveltekit`) with the Discord provider, `basePath: 'user-auth'` and custom pages under `src/routes/user-auth/` (`login/`, `logout/` are thin `+page.server.ts` actions wrapping `signIn`/`signOut`). The `jwt` callback stores the Discord access token and profile; the `session` callback copies Discord fields (username, id, avatar, email) onto the session and fetches `https://discord.com/api/users/@me/guilds` to populate `session.user.server_ids`. Reads `AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`, `AUTH_REDIRECT_PROXY_URL`, `AUTH_SECRET` from `$env/static/private` — note `.env.example` lists an older `DISCORD_*`/`SESSION_SECRET` naming that does not match what the code imports.
- **Hooks (`src/hooks.server.ts`)**: `sequence(authenticationHandle, authorizationHandle)` — auth first, then a guard that 303-redirects unauthenticated requests to any `/my-dashboard` route back to `/`. `src/routes/+layout.server.ts` exposes the session to all pages.
- **Routes**: `/` (landing page with Discord sign-in), `/my-dashboard` (settings page; checks whether the user shares a server with the bot via a hardcoded `botJoinedServers` guild-ID list — \*Space is `1009583217948491928`), `/privacy-policy`, `/terms-of-service`.
- **Lib (`src/lib/`)**: `formatters.ts` (parses Discord `<t:TIMESTAMP:FLAG>` timestamps into locale strings), `SampleConversation.svelte` (Discord-styled demo conversation for the landing page, styled by `src/discord.css`), `LoginButton.svelte`.
- **Data storage**: none wired up yet. `wrangler.jsonc` contains commented-out KV namespace bindings (`TIMEBOX_KV`, `SESSION_KV`, `USER_KV`) marking the intended direction; `.env.example` also reserves Ably API keys. Blog content storage/rendering is not implemented yet — the app currently covers auth, the dashboard shell, and the marketing page.
- **Cloudflare config (`wrangler.jsonc`)**: Pages project `my-starspace`, `pages_build_output_dir: .svelte-kit/cloudflare`, observability enabled, `NODE_ENV=production` var. Adapter is `@sveltejs/adapter-cloudflare` (`svelte.config.js`).

## Project rules

- Node **20** (pinned in `.nvmrc`).
- Dev server must stay on **port 8788** with host `127.0.0.1` (pinned in the `dev` script; matches `wrangler pages dev`'s default port and the Discord OAuth redirect expectations). Don't change it or let Vite auto-increment.
- Use npm, not yarn, despite the README.
- Secrets go in `.env` (copy from `.env.example`) locally and Cloudflare secrets in production — never in `wrangler.jsonc` `vars`.
- Tabs for indentation in JSON/config (matches existing files); follow existing ESLint (`eslint.config.js`) + svelte-check before pushing.

## Related projects

Parent directory is a workspace of independent git repos — see [../CLAUDE.md](../CLAUDE.md) for the map.

- [../starspace-group-svelte/CLAUDE.md](../starspace-group-svelte/CLAUDE.md) — the main starspace.group site (same community, same SvelteKit/Cloudflare stack).
- [../spacebot/CLAUDE.md](../spacebot/CLAUDE.md) — the Discord bot platform for the same community; the posting-from-Discord flow this site pairs with.
