#!/usr/bin/env bash
set -euo pipefail

# ============================================================
#  Foodies Frontend — створення feature-based структури
#  React 19 + Vite + TypeScript
#  Використання:  bash create-foodies-structure.sh
# ============================================================

ROOT="$(pwd)"
SRC="$ROOT/src"

echo "→ Створюємо структуру в: $ROOT"

# ---------- кореневі папки ----------
mkdir -p \
  public \
  src/app/providers \
  src/app/store \
  src/app/router \
  src/features/auth \
  src/features/recipes \
  src/features/categories \
  src/features/user \
  src/features/testimonials \
  src/shared/ui \
  src/shared/lib \
  src/shared/api \
  src/shared/types \
  src/shared/styles \
  src/pages/HomePage \
  src/pages/RecipePage \
  src/pages/AddRecipePage \
  src/pages/UserPage

# ---------- .gitkeep у кожній папці (щоб Git їх комітив) ----------
find src public -type d -exec touch {}/.gitkeep \;

# ---------- базові файли-заглушки (щоб одразу було видно структуру) ----------
# app
touch src/app/App.tsx
touch src/app/providers/index.ts
touch src/app/store/index.ts
touch src/app/router/index.tsx

# features (по одному індекс-файлу)
touch src/features/auth/index.ts
touch src/features/recipes/index.ts
touch src/features/categories/index.ts
touch src/features/user/index.ts
touch src/features/testimonials/index.ts

# shared
touch src/shared/ui/index.ts
touch src/shared/lib/index.ts
touch src/shared/api/client.ts
touch src/shared/types/index.ts
touch src/shared/styles/variables.css
touch src/shared/styles/reset.css
touch src/shared/styles/global.css

# pages
touch src/pages/HomePage/HomePage.tsx
touch src/pages/HomePage/index.ts
touch src/pages/RecipePage/RecipePage.tsx
touch src/pages/RecipePage/index.ts
touch src/pages/AddRecipePage/AddRecipePage.tsx
touch src/pages/AddRecipePage/index.ts
touch src/pages/UserPage/UserPage.tsx
touch src/pages/UserPage/index.ts

# entry
touch src/main.tsx
touch src/vite-env.d.ts

# ---------- кореневі конфіги (порожні заглушки) ----------
touch .gitignore
touch README.md
touch tsconfig.json
touch tsconfig.app.json
touch tsconfig.node.json
touch vite.config.ts
touch eslint.config.js
touch .prettierrc
touch .prettierignore
touch package.json

echo ""
echo "✅ Структура створена успішно!"
echo ""
echo "Дерево:"
if command -v tree >/dev/null 2>&1; then
  tree -a -I 'node_modules|.git' --dirsfirst
else
  find . -type d | sort | sed 's|[^/]*/| |g'
fi

echo ""
echo "Далі:"
echo "  1. git init   (якщо ще не ініціалізовано)"
echo "  2. git add ."
echo "  3. git commit -m \"chore: initial feature-based structure\""
