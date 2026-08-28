# Foodies

Frontend for a recipe web app: browse dishes, save favorites, and publish your own recipes.

---

## About

Foodies is a single-page application for cooking recipes. Users can:

- browse categories and the recipe catalog;
- open recipe details (ingredients and instructions);
- sign up / sign in;
- add recipes (private route);
- manage favorites, view profiles, and follow / unfollow other users.

The client never talks to the database directly. Data and auth go through a REST API.

**Live:** depends on the deploy target (Vercel or Dokku).  
**API:** `VITE_API_URL` (for example `https://foodies-api.fstk.run.place/api`).

---

## Tech stack

| Layer | Tools |
|-------|--------|
| UI | React 19, TypeScript, Vite |
| State | Redux Toolkit, redux-persist |
| Routing | React Router 7 |
| HTTP | Axios |
| Forms | Formik + Yup (some forms use react-hook-form) |
| Styling | CSS Modules, shared components in `shared/ui` |
| Notifications | react-toastify |
| Tests | Playwright (e2e), Vitest |
| Deploy | Vercel or Docker + Nginx (Dokku) |

Code layout: `app` / `features` / `pages` / `shared`.

---

## Prerequisites

- Node.js 22+
- pnpm

---

## Local setup

```bash
git clone <repo-url>
cd fd-web
pnpm install
cp .env.example .env
```

`.env`:

```env
VITE_API_URL=https://foodies-api.fstk.run.place/api
```

```bash
pnpm dev
```

App: [http://localhost:5173](http://localhost:5173).

Production build locally:

```bash
pnpm build
pnpm preview
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Vite dev server |
| `pnpm build` | production build |
| `pnpm preview` | serve `dist/` |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` | Prettier |
| `pnpm typecheck` | TypeScript |
| `pnpm check` | typecheck + lint |
| `pnpm test` | Vitest |
| `pnpm test:e2e` | Playwright |
| `pnpm test:e2e:headed` | headed e2e |

---

## E2E

Create `.env.e2e` file:

```env
E2E_USER_EMAIL=e2e.user@foodies.test
E2E_USER_PASSWORD=securepass123
E2E_USER_NAME=foodies test
```

```bash
pnpm test:e2e
SLOW_MO=400 pnpm exec playwright test --headed e2e/auth/auth.spec.ts
```

Add-recipe photo fixture: `e2e/fixtures/recipe.jpg`.

---

## Deploy

**Vercel:** SPA rewrite via `vercel.json`. Set `VITE_API_URL` in Environment Variables.

**Dokku:** Docker build (`Dockerfile`) + Nginx (`nginx.conf`). Pass `VITE_API_URL` as a build ARG.

After deploy, these URLs should respond:

- `/robots.txt`
- `/llms.txt`
- `/sitemap.xml` — if added under `public/`

---

## Routes

| Path | Access |
|------|--------|
| `/` | public — Hero, categories |
| `/recipes` | public — catalog |
| `/recipe/:id` | public — recipe details |
| `/recipe/add` | private |
| `/user/:id` | private |

---
