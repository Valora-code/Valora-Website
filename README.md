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
