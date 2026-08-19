# Foodies Frontend — розподіл задач

Команда: **8 осіб** (1 Team Lead + 7 Dev).  
Маршрут додавання рецепта: **`/recipe/add`** (приватний).  
API base: `VITE_API_URL` (див. `.env.example`).

---

## 1. Вже зроблено → Team Lead

| Зона          | Зміст                                                                              |
| ------------- | ---------------------------------------------------------------------------------- |
| Інфра         | Vite, React 19, TypeScript, pnpm, path aliases, ESLint/Prettier                    |
| App           | `providers`, `store` (auth + persist), `router`, `App`                             |
| Shared UI     | Button, Loader, MainTitle, Subtitle, PathInfo, Modal, Select                       |
| Shared layout | SharedLayout, Header, Footer, Logo, Nav, AuthBar, UserBar, NetworkLinks, Copyright |
| Auth          | api, slice, operations, selectors, SignIn/SignUp Form + Modal, LogOutModal         |
| Styles        | variables, reset, global, breakpoints, container                                   |
| Docs          | README для локального запуску                                                      |

Сторінки (`HomePage`, `RecipePage`, `AddRecipePage`, `UserPage`) — файли є; бізнес-логіка за ТЗ ще не закрита.  
`PrivateRoute` та фічі `categories` / `recipes` / `user` / `testimonials` / `Hero` — лише заглушки структури.

---

## 2. Зони відповідальності

| #   | Роль          | Зона                                    | Папки                                                                |
| --- | ------------- | --------------------------------------- | -------------------------------------------------------------------- |
| 1   | **Team Lead** | Інфра, auth, layout, інтеграція, review | `app/`, `shared/`, `features/auth/`                                  |
| 2   | Dev           | Auth polish, PrivateRoute               | `features/auth/`                                                     |
| 3   | Dev           | Categories, Home flow                   | `features/categories/`, `pages/HomePage`                             |
| 4   | Dev           | Список рецептів, фільтри, картка        | `features/recipes/` (Card, List, Filters, Pagination, favorites ids) |
| 5   | Dev           | Сторінка рецепта, popular               | `features/recipes/` (Info*, Popular), `pages/RecipePage`             |
| 6   | Dev           | Створення рецепта                       | `features/recipes/AddRecipeForm`, `pages/AddRecipePage`              |
| 7   | Dev           | Профіль користувача                     | `features/user/`, `pages/UserPage`                                   |
| 8   | Dev           | Hero, Testimonials, static assets       | `features/home/`, `features/testimonials/`, `public/`, `assets/`     |

**Правило:** не змінювати чужі feature-папки в одному PR без узгодження. Спільні типи/API-контракти — через Team Lead.

---

## 3. Задачі Team Lead (клей + блокери)

| ID    | Задача                                           | Результат                                 |
| ----- | ------------------------------------------------ | ----------------------------------------- |
| TL-01 | Refresh сесії після rehydrate                    | `refresh` + `setAuthHeader(accessToken)`  |
| TL-02 | Підключення PrivateRoute у router                | `/recipe/add`, `/user/:id` захищені       |
| TL-03 | Notification (toast)                             | єдиний спосіб показу помилок/успіху з API |
| TL-04 | Типи під OpenAPI                                 | User, Recipe*, Pagination, dictionaries   |
| TL-05 | Завантаження dictionaries (або контракт для Dev) | categories, areas, ingredients у store    |
| TL-06 | Code review / merge                              | якість і відсутність конфліктів зон       |

---

## 4. Dev 2 — Auth

| ID   | Задача                                    | Acceptance criteria                                                                                  |
| ---- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| A-01 | `PrivateRoute`                            | Неавторизований не бачить приватний контент; передбачена поведінка для гостя (редірект і/або SignIn) |
| A-02 | Показати/сховати пароль                   | SignInForm, SignUpForm                                                                               |
| A-03 | Скидання `error` auth                     | При відкритті модалки / новій спробі сабміту                                                         |
| A-04 | Синхронізація Header після login/register | UserBar без reload                                                                                   |

---

## 5. Dev 3 — Categories + Home

| ID   | Задача                                 | Acceptance criteria                                       |
| ---- | -------------------------------------- | --------------------------------------------------------- |
| C-01 | `GET /categories` + збереження в store | Дані доступні для UI та інших фіч                         |
| C-02 | `Categories` + `CategoryList`          | Адаптивна сітка; «All categories»                         |
| C-03 | Вибір категорії                        | Запит рецептів; Categories ховається; показується Recipes |
| C-04 | All categories                         | Заголовок «All categories»; той самий Recipes-flow        |
| C-05 | Збірка `HomePage`                      | Секції: Hero, Categories/Recipes, Testimonials            |

---

## 6. Dev 4 — Recipes list

| ID   | Задача                                                   | Acceptance criteria                                                                        |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| R-01 | `GET /recipes` (category, area, ingredient, page, limit) | Відповідь `data`, `total`, `page`, `limit`                                                 |
| R-02 | `RecipeFilters`                                          | Select ingredient + area; зміна фільтра → `page = 1` + новий запит                         |
| R-03 | `RecipeList` + `RecipeCard`                              | Зображення, назва, опис, автор, heart, перехід на рецепт                                   |
| R-04 | Обране на картці                                         | Гість → SignIn; юзер → POST/DELETE `/recipes/{id}/favorite`                                |
| R-05 | Клік по автору                                           | Гість → SignIn; юзер → `/user/:id`                                                         |
| R-06 | `RecipePagination`                                       | Серверна пагінація                                                                         |
| R-07 | Обгортка `Recipes`                                       | Back повертає Categories; title = категорія або All categories                             |
| R-08 | Store `favoriteIds`                                      | Список id з `/recipes/favorites` (або накопичення після toggle); селектор `isFavorite(id)` |

> У відповіді `GET /recipes/{id}` **немає** прапорця favorite — стан обраного тільки через favorites-список / локальний store.

---

## 7. Dev 5 — Recipe page

| ID    | Задача                                    | Acceptance criteria                                     |
| ----- | ----------------------------------------- | ------------------------------------------------------- |
| RD-01 | `GET /recipes/{id}`                       | Дані до відображення контенту                           |
| RD-02 | `RecipeMainInfo`                          | Зображення, назва, категорія, час, опис, автор          |
| RD-03 | `RecipeIngredients`                       | img/placeholder, name, measure                          |
| RD-04 | `RecipePreparation`                       | Інструкція + Add/Remove favorites (через `favoriteIds`) |
| RD-05 | `RecipeInfo`                              | Композиція MainInfo + Ingredients + Preparation         |
| RD-06 | `GET /recipes/popular` + `PopularRecipes` | Список карток RecipeCard                                |
| RD-07 | `RecipePage`                              | PathInfo + RecipeInfo + PopularRecipes                  |

---

## 8. Dev 6 — Add recipe

| ID    | Задача                 | Acceptance criteria                                                                                                                                                         |
| ----- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AR-01 | Сторінка `/recipe/add` | PrivateRoute; PathInfo; MainTitle; Subtitle; форма                                                                                                                          |
| AR-02 | Formik + Yup           | Усі поля обов’язкові; помилки біля полів                                                                                                                                    |
| AR-03 | Photo                  | `input file` + preview через `URL.createObjectURL`                                                                                                                          |
| AR-04 | Title, description     | Description: лічильник, max **200 символів**                                                                                                                                |
| AR-05 | Category, area selects | Дані з backend/store; у запит ідуть **назви** (string)                                                                                                                      |
| AR-06 | Time                   | Лічильник, мінімум **1** хвилина; у API — string                                                                                                                            |
| AR-07 | Ingredients            | Select + measure + Add; список карток; видалення                                                                                                                            |
| AR-08 | Instructions           | Textarea, лічильник, max **1000 символів**                                                                                                                                  |
| AR-09 | Reset                  | Очищення всіх полів                                                                                                                                                         |
| AR-10 | Publish                | `POST /recipes`; тіло: `title`, `category`, `area`, `instructions`, `description`, `time`, `ingredients: [{ id, measure }]`; успіх → `/recipe/{id}`; помилка → notification |

**Тіло створення рецепта (контракт фронта):**

- `title`, `category`, `area`, `instructions`, `description`, `time` (string)
- `ingredients`: масив `{ id, measure }`
- Формат відправки: згідно з бекендом (JSON або FormData). UI фото обов’язковий за ТЗ; передачу файлу узгодити з API.

---

## 9. Dev 7 — User page

| ID   | Задача                             | Acceptance criteria                                                         |
| ---- | ---------------------------------- | --------------------------------------------------------------------------- |
| U-01 | `GET /users/me`, `GET /users/{id}` | Owner vs інший профіль                                                      |
| U-02 | `UserInfo`                         | Avatar, counts; upload avatar лише для owner (`PATCH /users/avatar`)        |
| U-03 | Follow / Unfollow                  | `POST` / `DELETE` `/users/{id}/follow`                                      |
| U-04 | `TabsList`                         | Рецепти; Favorites (owner); Followers; Following (owner)                    |
| U-05 | `ListItems`                        | RecipePreview або UserCard залежно від вкладки                              |
| U-06 | Own / favorites                    | `GET /recipes/own`, `GET /recipes/favorites`                                |
| U-07 | Followers / following              | `GET /users/{id}/followers`, `GET /users/following`                         |
| U-08 | Видалення з preview                | Own delete / remove favorite без reload; оновлення counts                   |
| U-09 | `ListPagination`                   | Серверна; після видалення останнього елемента сторінки — попередня сторінка |

---

## 10. Dev 8 — Hero, Testimonials, static

| ID   | Задача                 | Acceptance criteria                                                        |
| ---- | ---------------------- | -------------------------------------------------------------------------- |
| H-01 | `Hero`                 | Заголовок, підзаголовок, Add recipe (гість → SignIn, юзер → `/recipe/add`) |
| H-02 | Зображення Hero        | Адаптив, за можливості 1x/2x                                               |
| T-01 | `Testimonials`         | `GET /testimonials`, слайдер, autoplay                                     |
| S-01 | Шрифти                 | Підключення в проєкт                                                       |
| S-02 | Favicon / manifest     | `public/`                                                                  |
| S-03 | SVG sprite             | Іконки UI (бургер, heart, arrows, social)                                  |
| S-04 | Placeholder-зображення | User / ingredient defaults                                                 |

---

## 11. Порядок робіт

**Фаза 1 — фундамент**  
TL-01…05, A-01, C-01, R-01/R-08 (API + favoriteIds), H-01, S-01

**Фаза 2 — основні екрани**  
C-02…05, R-02…07, RD-*, AR-01…10, U-01…04, T-01

**Фаза 3 — закриття ТЗ**  
U-05…09, polish іконок, баги, review

---

## 12. Залежності

```text
PrivateRoute + toast + dictionaries
        ↓
Categories / Filters / AddRecipeForm
        ↓
Home flow (Categories ↔ Recipes)
        ↓
RecipePage / UserPage (паралельно після Card + auth)
```

`favoriteIds` — спільний контракт Dev4 (ініціалізація + toggle на картці), Dev5 (кнопка на сторінці рецепта), Dev7 (вкладка Favorites).
