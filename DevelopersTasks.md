### Розподіл по розробниках (5 людей)

| Розробник | Зона | Компоненти |
|-----------|------|------------|
| **Dev 1** | `shared/layout` + `shared/ui` | SharedLayout, Header, Footer, Logo, Nav, AuthBar, UserBar, NetworkLinks, Copyright, Modal, MainTitle, Subtitle, PathInfo |
| **Dev 2** | `features/auth` | SignIn/SignUp/LogOut модалки + форми (Formik + Yup), PrivateRoute |
| **Dev 3** | `features/recipes` (основна частина) | RecipeCard, RecipeList, RecipeFilters, RecipePagination, PopularRecipes, RecipeInfo + підкомпоненти |
| **Dev 4** | `features/recipes` (форма) + `features/categories` | AddRecipeForm (Formik), Categories, CategoryList |
| **Dev 5** | `features/user` + `features/testimonials` + `pages` | UserInfo, TabsList, ListItems, RecipePreview, UserCard, ListPagination, Testimonials + тонкі pages |

```
tree src/
src/
├── app
│   ├── App.tsx
│   ├── providers
│   │   └── index.tsx
│   ├── router
│   │   └── index.tsx
│   └── store
│       └── index.ts
├── assets
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── features
│   ├── auth
│   │   ├── index.ts
│   │   ├── LogOutModal
│   │   │   └── index.ts
│   │   ├── PrivateRoute
│   │   │   └── index.ts
│   │   ├── SignInForm
│   │   │   └── index.ts
│   │   ├── SignInModal
│   │   │   └── index.ts
│   │   ├── SignUpForm
│   │   │   └── index.ts
│   │   └── SignUpModal
│   │       └── index.ts
│   ├── categories
│   │   ├── Categories
│   │   │   └── index.ts
│   │   ├── CategoryList
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── home
│   │   └── Hero
│   │       └── index.ts
│   ├── recipes
│   │   ├── AddRecipeForm
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── PopularRecipes
│   │   │   └── index.ts
│   │   ├── RecipeCard
│   │   │   └── index.ts
│   │   ├── RecipeFilters
│   │   │   └── index.ts
│   │   ├── RecipeInfo
│   │   │   └── index.ts
│   │   ├── RecipeIngredients
│   │   │   └── index.ts
│   │   ├── RecipeList
│   │   │   └── index.ts
│   │   ├── RecipeMainInfo
│   │   │   └── index.ts
│   │   ├── RecipePagination
│   │   │   └── index.ts
│   │   └── RecipePreparation
│   │       └── index.ts
│   ├── testimonials
│   │   ├── index.ts
│   │   └── Testimonials
│   │       └── index.ts
│   └── user
│       ├── index.ts
│       ├── ListItems
│       │   └── index.ts
│       ├── ListPagination
│       │   └── index.ts
│       ├── RecipePreview
│       │   └── index.ts
│       ├── TabsList
│       │   └── index.ts
│       ├── UserCard
│       │   └── index.ts
│       └── UserInfo
│           └── index.ts
├── main.tsx
├── pages
│   ├── AddRecipePage
│   │   ├── AddRecipePage.tsx
│   │   └── index.ts
│   ├── HomePage
│   │   ├── HomePage.tsx
│   │   └── index.ts
│   ├── RecipePage
│   │   ├── index.ts
│   │   └── RecipePage.tsx
│   └── UserPage
│       ├── index.ts
│       └── UserPage.tsx
├── shared
│   ├── api
│   │   └── client.ts
│   ├── layout
│   │   ├── AuthBar
│   │   │   └── index.ts
│   │   ├── Copyright
│   │   │   └── index.ts
│   │   ├── Footer
│   │   │   └── index.ts
│   │   ├── Header
│   │   │   └── index.ts
│   │   ├── Logo
│   │   │   └── index.ts
│   │   ├── Nav
│   │   │   └── index.ts
│   │   ├── NetworkLinks
│   │   │   └── index.ts
│   │   ├── SharedLayout
│   │   │   └── index.ts
│   │   └── UserBar
│   │       └── index.ts
│   ├── lib
│   │   └── index.ts
│   ├── styles
│   │   ├── global.css
│   │   ├── reset.css
│   │   └── variables.css
│   ├── types
│   │   └── index.ts
│   └── ui
│       ├── Button
│       │   └── index.ts
│       ├── index.ts
│       ├── Loader
│       │   └── index.ts
│       ├── MainTitle
│       │   └── index.ts
│       ├── Modal
│       │   └── index.ts
│       ├── PathInfo
│       │   └── index.ts
│       ├── Select
│       │   └── index.ts
│       └── Subtitle
│           └── index.ts
└── vite-env.d.ts
```