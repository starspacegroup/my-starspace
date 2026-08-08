# My *Space

My *Space is the current account and dashboard shell for a planned publishing
service for members of the *Space Discord server. The shipped application
supports Discord sign-in, guild-aware sessions, and a settings dashboard.

Blog content storage, Discord-to-site publishing, and public blog rendering are
not implemented yet.

The app uses SvelteKit, Svelte 5, TypeScript, and Tailwind CSS 4 and deploys to
Cloudflare Pages.

## Local Development

Requirements: Node.js 20 and npm.

```bash
git clone https://github.com/starspacegroup/my-starspace.git
cd my-starspace
cp .env.example .env
npm install
npm run dev
```

Open `http://127.0.0.1:8788`. Configure the same URL in Discord for the OAuth
redirect shown in `.env.example`.

## Verification

```bash
npm run lint
npm run check
npm test
npm run build
```

## Contributing

Pull requests are welcome. For major changes, open an issue first and add or
update tests for changed behavior.
