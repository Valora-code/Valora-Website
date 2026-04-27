# Valora Website

Marketing site for Valora (Vite, React, TypeScript, Tailwind, shadcn-style UI). Design tokens match the main **Valora-Frontend** app (emerald/teal primary).

## Local development

Requirements: Node.js and npm (e.g. [nvm](https://github.com/nvm-sh/nvm)).

```bash
git clone <repository-url>
cd Valora-Website
npm install
npm run dev
```

Open **http://localhost:8080** (port is set in `vite.config.ts`).

### Clerk waitlist (early access)

1. In the [Clerk Dashboard](https://dashboard.clerk.com/), enable **Waitlist** for the same application whose publishable key you use here.
2. Copy **API Keys → Publishable key** into `.env` as `VITE_CLERK_PUBLISHABLE_KEY` (see `.env.example`).
3. Under **Domains**, add your local origin (e.g. `http://localhost:8080`) and your production site origin (e.g. `https://valora-tech.com`) so Clerk can load on the marketing site.
4. Open **http://localhost:8080/waitlist** to test `<Waitlist />`. Without the env var, the site falls back to the legacy mailto form on that route.

**GitHub Pages:** Vite bakes env vars in at **build** time. Add a [repository secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) named `VITE_CLERK_PUBLISHABLE_KEY` with your **publishable** key (not the secret key). The workflow `.github/workflows/static.yml` passes it into `npm run build`. Optionally add `VITE_VALORA_APP_ORIGIN` if the app’s sign-in URL should not use the default `https://app.valora-tech.com`.

If the repo uses a GitHub **environment** named `github-pages` with protection rules, add the same variable names there under **Environment secrets** (they override repository secrets when the job targets that environment).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Dev server with HMR      |
| `npm run build`| Production build → `dist` |
| `npm run preview` | Serve `dist` locally |

## Stack

- Vite 5
- React 18
- TypeScript
- Tailwind CSS
- React Router
