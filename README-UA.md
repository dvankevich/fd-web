# Foodies (fd-web)

Frontend веб-застосунку для перегляду рецептів, збереження обраного та публікації власних страв.

---

## Про проєкт

Foodies — SPA для кулінарних рецептів. Користувач може:

- переглядати категорії та каталог рецептів;
- відкрити деталі страви (інгредієнти, приготування);
- зареєструватись / увійти;
- додавати рецепти (приватний маршрут);
- зберігати favorites, переглядати профіль, follow/unfollow.

Клієнт не ходить у базу напряму: дані й авторизація йдуть через REST API.

**Live:** залежить від середовища деплою (Vercel / Dokku).  
**API:** значення `VITE_API_URL` (наприклад `https://foodies-api.fstk.run.place/api`).

---

## Технології

| Шар | Стек |
|-----|------|
| UI | React 19, TypeScript, Vite |
| Стан | Redux Toolkit, redux-persist |
| Роутинг | React Router 7 |
| HTTP | Axios |
| Форми | Formik + Yup (окремі форми — react-hook-form) |
| UI | CSS Modules, спільні компоненти в `shared/ui` |
| Сповіщення | react-toastify |
| Тести | Playwright (e2e), Vitest |
| Деплой | Vercel або Docker + Nginx (Dokku) |

Структура коду: `app` / `features` / `pages` / `shared`.

---

## Вимоги

- Node.js 22+
- pnpm

---

## Запуск локально

```bash
git clone <repo-url>
cd fd-web
pnpm install
cp .env.example .env
```

У `.env`:

```env
VITE_API_URL=https://foodies-api.fstk.run.place/api
```

```bash
pnpm dev
```

Додаток: [http://localhost:5173](http://localhost:5173).

Перевірка збірки:

```bash
pnpm build
pnpm preview
```

---

## Скрипти

| Команда | Що робить |
|---------|-----------|
| `pnpm dev` | dev-сервер Vite |
| `pnpm build` | production-збірка |
| `pnpm preview` | перегляд `dist/` |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` | Prettier |
| `pnpm typecheck` | TypeScript |
| `pnpm check` | typecheck + lint |
| `pnpm test` | Vitest |
| `pnpm test:e2e` | Playwright |
| `pnpm test:e2e:headed` | e2e з вікном браузера |

---

## E2E

Приклад `.env.e2e`:

```env
E2E_USER_EMAIL=e2e.user@foodies.test
E2E_USER_PASSWORD=securepass123
E2E_USER_NAME=foodies test
```

```bash
pnpm test:e2e
SLOW_MO=400 pnpm exec playwright test --headed e2e/auth/auth.spec.ts
```

Фікстура фото для add-recipe: `e2e/fixtures/recipe.jpg`.

---

## Деплой

**Vercel:** прев’ю з `vercel.json` (SPA rewrite на `index.html`). Задати `VITE_API_URL` у Environment Variables.

**Dokku:** збірка Docker (`Dockerfile`) + Nginx (`nginx.conf`). `VITE_API_URL` передається як build ARG.

Після деплою мають відкриватись:

- `/robots.txt`
- `/llms.txt`
- `/sitemap.xml` — якщо додано в `public/`

---

## Маршрути

| Шлях | Доступ |
|------|--------|
| `/` | публічний — Hero, категорії |
| `/recipes` | публічний — каталог |
| `/recipe/:id` | публічний — деталі рецепта |
| `/recipe/add` | приватний |
| `/user/:id` | приватний |

---


