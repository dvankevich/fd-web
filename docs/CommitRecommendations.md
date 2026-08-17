# Робота з репозиторієм — як уникати merge-конфліктів

Короткі правила для команди Foodies Frontend.  
Підтягування `main` — через **`git merge`** (без rebase).

---

## 1. Гілки

- Від **`main`** тільки feature-гілки:
  ```text
  feature/recipe-card
  feature/add-recipe-form
  fix/auth-private-route
  ```
- У **`main`** напряму не комітимо.
- Одна гілка ≈ **одна задача**.

---

## 2. Зони відповідальності

| Зона | Хто чіпає |
|------|-----------|
| `features/auth/` | Dev 2 (+ TL) |
| `features/categories/` | Dev 3 |
| `features/recipes/` (list/card/filters) | Dev 4 |
| `features/recipes/` (detail/popular) | Dev 5 |
| `features/recipes/AddRecipeForm` | Dev 6 |
| `features/user/` | Dev 7 |
| `features/home/`, `testimonials/` | Dev 8 |
| `shared/`, `app/` | **тільки TL** або після узгодження |

Чужу папку в PR не змінюємо без домовленості.

---

## 3. Початок задачі

```bash
git checkout main
git pull origin main
git checkout -b feature/my-task
```

---

## 4. Підтягнути свіжий `main` у свою гілку

Робити **щоранку** або **перед push / перед PR**:

```bash
git checkout feature/my-task
git fetch origin
git merge origin/main
```

Якщо є конфлікти:

1. Відкрити файли з конфліктами, залишити потрібний код.
2. ```bash
   git add .
   git commit -m "merge: main into feature/my-task"
   ```
3. ```bash
   git push
   ```

`git push --force` **не використовуємо**.

---

## 5. Коміти й Pull Request

- Невеликі PR (краще одна логічна зміна).
- Зрозумілі повідомлення комітів:
  ```text
  feat(recipes): add RecipeCard favorite toggle
  fix(auth): clear error on modal open
  ```
- У GitHub бажано **Squash and merge** у `main`.
- Перед PR:
  ```bash
  pnpm lint
  pnpm typecheck
  ```
- Review: мінімум 1–2 approve; для `shared/` і `app/` — обов’язково TL.

---

## 6. Що найчастіше конфліктує

| Місце | Як уникнути |
|-------|-------------|
| `pages/HomePage.tsx` | Інтеграцію секцій узгоджувати; готові блоки експортувати з фіч |
| `shared/types`, `shared/api` | Зміни через TL або окремий узгоджений PR |
| `features/*/index.ts` | Лише ре-експорт свого публічного API |
| `pnpm-lock.yaml` | Нові пакети — окремим PR, не «заодно» з фічею |

---

## 7. Імпорти між фічами

- Імпорт з іншої фічі — **тільки** з `features/<name>/index.ts`.
- Внутрішні файли чужої фічі не імпортувати.

---

## 8. Чеклист перед Create pull request

- [ ] Гілка створена від актуального `main`
- [ ] Перед PR зроблено `git merge origin/main`
- [ ] Зміни лише у своїй зоні
- [ ] `pnpm lint` і `pnpm typecheck` без помилок
- [ ] Немає зайвих файлів (`.env`, демо-код, `node_modules`)
- [ ] У описі PR: що зроблено і як перевірити

---

## 9. Шпаргалка на день

```bash
# ранок
git checkout main
git pull origin main
git checkout feature/my-task
git merge origin/main

# робота → commit → push
git add .
git commit -m "feat(scope): short message"
git push -u origin feature/my-task
```

Дотримання **зон папок** і регулярний **merge `main`** зменшують конфлікти сильніше, ніж складні git-прийоми.
