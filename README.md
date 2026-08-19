# Foodies Frontend

React 19 + Vite + TypeScript + Redux Toolkit.

## Вимоги

- Node.js **20+**
- **pnpm** (`npm i -g pnpm`)

## Швидкий старт

```bash
# 1. Клонувати репозиторій
git clone <url-репозиторію>
cd fd-web

# 2. Встановити залежності
pnpm install

# 3. Налаштувати env
cp .env.example .env
```

У `.env`:

```env
VITE_API_URL=https://foodies-back-end.onrender.com/api
```

```bash
# 4. Запустити dev-сервер
pnpm dev
```

Додаток відкриється на [http://localhost:5173](http://localhost:5173).

## Корисні команди

| Команда          | Опис                 |
| ---------------- | -------------------- |
| `pnpm dev`       | dev-сервер           |
| `pnpm build`     | production-збірка    |
| `pnpm preview`   | перегляд збірки      |
| `pnpm lint`      | ESLint               |
| `pnpm typecheck` | перевірка TypeScript |

## Структура (скорочено)

```
src/
├── app/          # store, router, providers
├── features/     # auth, recipes, user, categories…
├── shared/       # ui, layout, api, styles
└── pages/        # тонкі сторінки
```

## Git

- Працюємо тільки в feature-гілках від `main`
- Один PR ≈ одна логічна зміна

## Нотатки

- Токени зберігаються через `redux-persist` (localStorage)
- Модалки рендеряться в `#modal` (`index.html`)
- Path aliases: `@app`, `@features`, `@shared`, `@pages`
