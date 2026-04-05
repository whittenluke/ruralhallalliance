## Rural Hall Alliance Website

This is the Next.js App Router project for the Rural Hall Alliance website.

Scripts:
- `npm run dev` – start local dev server
- `npm run build` – production build
- `npm start` – run production server after build
- `npm run lint` – lint the project

Requirements:
- Node 18+
- npm or pnpm

Getting started:
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Open http://localhost:3000

Notes:
- Styling tokens are seeded from the design doc’s palette.
- Additional routes and CMS setup will be added in subsequent steps.

Deployment:
- Connect the repo to Netlify and use the included `netlify.toml`.
- Ensure the Next.js plugin is enabled (already declared).

CMS (Decap):
- Visit `/admin` after deploying to configure GitHub backend in `public/admin/config.yml`.
- Set `repo` and `branch`, then log in with a GitHub account with write access.

Forms (Netlify Forms):
- Forms are implemented on `/media`, `/membership`, and `/contact`.
- Netlify will detect the static form blueprints on deploy.
