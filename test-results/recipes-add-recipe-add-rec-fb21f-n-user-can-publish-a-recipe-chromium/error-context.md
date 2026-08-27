# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: recipes/add-recipe.spec.ts >> add recipe >> logged-in user can publish a recipe
- Location: e2e/recipes/add-recipe.spec.ts:38:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '+' })

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - generic [ref=f1e3]:
    - banner [ref=f1e4]:
      - generic [ref=f1e5]:
        - link "foodies" [ref=f1e6] [cursor=pointer]:
          - /url: /
        - navigation [ref=f1e8]:
          - link "Home" [ref=f1e9] [cursor=pointer]:
            - /url: /
          - link "Add recipe" [ref=f1e10] [cursor=pointer]:
            - /url: /recipe/add
        - button "foodies test foodies test" [ref=f1e13] [cursor=pointer]:
          - img "foodies test" [ref=f1e14]
          - generic [ref=f1e15]: foodies test
    - main [ref=f1e18]:
      - main [ref=f1e19]:
        - generic [ref=f1e20]:
          - link "Home" [ref=f1e21] [cursor=pointer]:
            - /url: /
          - generic [ref=f1e22]: /
          - generic [ref=f1e23]: ADD RECIPE
        - heading "ADD RECIPE" [level=1] [ref=f1e24]
        - paragraph [ref=f1e25]: Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
        - generic [ref=f1e27]:
          - generic [ref=f1e28]:
            - img "Recipe preview" [ref=f1e30] [cursor=pointer]
            - button "Remove image" [ref=f1e31] [cursor=pointer]
          - generic [ref=f1e32]:
            - generic [ref=f1e33]:
              - generic [ref=f1e34]: THE NAME OF THE RECIPE
              - textbox "THE NAME OF THE RECIPE" [ref=f1e35]:
                - /placeholder: Enter recipe name
                - text: E2E Cake 1787772248993
            - generic [ref=f1e37]:
              - textbox "36/200" [ref=f1e38]:
                - /placeholder: Enter a description of the dish
                - text: E2E test description for recipe form
              - emphasis [ref=f1e39]: 36/200
            - generic [ref=f1e40]:
              - generic [ref=f1e41]:
                - paragraph [ref=f1e42]: CATEGORY
                - button "Breakfast" [ref=f1e43] [cursor=pointer]
              - generic [ref=f1e47]:
                - paragraph [ref=f1e48]: COOKING TIME
                - generic [ref=f1e49]:
                  - button "Decrease cooking time" [ref=f1e50] [cursor=pointer]
                  - generic [ref=f1e52]: 1 min
                  - button "Increase cooking time" [ref=f1e53] [cursor=pointer]
            - generic [ref=f1e56]:
              - paragraph [ref=f1e57]: AREA
              - button "Italian" [ref=f1e58] [cursor=pointer]
            - generic [ref=f1e62]:
              - heading "INGREDIENTS" [level=2] [ref=f1e63]
              - generic [ref=f1e64]:
                - button "Add the ingredient" [ref=f1e66] [cursor=pointer]
                - textbox "Enter quantity" [ref=f1e70]
              - button "ADD INGREDIENT" [disabled] [ref=f1e71] [cursor=pointer]
              - list
            - generic [ref=f1e74]:
              - generic [ref=f1e75]: RECIPE PREPARATION
              - generic [ref=f1e76]:
                - textbox "RECIPE PREPARATION 0/1000" [ref=f1e77]:
                  - /placeholder: Enter recipe
                - emphasis [ref=f1e78]: 0/1000
            - generic [ref=f1e79]:
              - button "Reset form" [ref=f1e80] [cursor=pointer]
              - button "PUBLISH" [ref=f1e83] [cursor=pointer]
    - contentinfo [ref=f1e84]:
      - generic [ref=f1e85]:
        - generic [ref=f1e86]:
          - link "foodies" [ref=f1e87] [cursor=pointer]:
            - /url: /
          - list [ref=f1e88]:
            - listitem [ref=f1e89]:
              - link "Facebook" [ref=f1e90] [cursor=pointer]:
                - /url: https://www.facebook.com/goITclub/
            - listitem [ref=f1e93]:
              - link "Instagram" [ref=f1e94] [cursor=pointer]:
                - /url: https://www.instagram.com/goitclub/
            - listitem [ref=f1e97]:
              - link "YouTube" [ref=f1e98] [cursor=pointer]:
                - /url: https://www.youtube.com/c/GoIT
        - paragraph [ref=f1e103]: © 2026, Foodies. All rights reserved
  - region "Notifications Alt+T"
```

# Test source

```ts
  1  | /**
  2  |  * Add recipe (private route)
  3  |  *
  4  |  * Run:
  5  |  *   pnpm exec playwright test --headed e2e/recipes/add-recipe.spec.ts
  6  |  *
  7  |  * Requires:
  8  |  *   - .env.e2e
  9  |  *   - e2e/fixtures/recipe.jpg
  10 |  */
  11 | import process from 'node:process';
  12 | import { fileURLToPath } from 'node:url';
  13 | import { test, expect, type Page } from '@playwright/test';
  14 | 
  15 | const E2E_USER = {
  16 |   email: process.env.E2E_USER_EMAIL ?? 'e2e.user@foodies.test',
  17 |   password: process.env.E2E_USER_PASSWORD ?? 'securepass123',
  18 | };
  19 | 
  20 | const fixtureImage = fileURLToPath(new URL('../fixtures/recipe.jpg', import.meta.url));
  21 | 
  22 | async function login(page: Page) {
  23 |   await page.goto('/');
  24 |   await page.getByTestId('auth-sign-in').click();
  25 |   await page.getByTestId('auth-email').fill(E2E_USER.email);
  26 |   await page.getByTestId('auth-password').fill(E2E_USER.password);
  27 |   await page.getByTestId('sign-in-submit').click();
  28 |   await expect(page.getByTestId('user-bar')).toBeVisible({ timeout: 15_000 });
  29 | }
  30 | 
  31 | /** CustomSelect: кнопка з placeholder → кнопка з текстом опції */
  32 | async function chooseFromSelect(page: Page, placeholder: string, optionName: string) {
  33 |   await page.getByRole('button', { name: placeholder }).click();
  34 |   await page.getByRole('button', { name: optionName, exact: true }).click();
  35 | }
  36 | 
  37 | test.describe('add recipe', () => {
  38 |   test('logged-in user can publish a recipe', async ({ page }) => {
  39 |     await login(page);
  40 |     await page.goto('/recipe/add');
  41 | 
  42 |     // дочекатись завантаження options з API
  43 |     await expect(page.getByRole('button', { name: 'Select a category' })).toBeVisible({
  44 |       timeout: 20_000,
  45 |     });
  46 |     await expect(page.getByRole('button', { name: 'Select an area' })).toBeVisible();
  47 |     await expect(page.getByRole('button', { name: 'Add the ingredient' })).toBeVisible();
  48 | 
  49 |     // photo (input hidden — setInputFiles все одно працює)
  50 |     await page.locator('input[type="file"]').setInputFiles(fixtureImage);
  51 | 
  52 |     await page.getByPlaceholder('Enter recipe name').fill(`E2E Cake ${Date.now()}`);
  53 |     await page.getByPlaceholder('Enter a description of the dish').fill(
  54 |       'E2E test description for recipe form',
  55 |     );
  56 | 
  57 |     // назви опцій мають існувати в API; за потреби підстав реальні з UI
  58 |     await chooseFromSelect(page, 'Select a category', 'Breakfast');
  59 |     await chooseFromSelect(page, 'Select an area', 'Italian');
  60 | 
  61 |     // time: стартове 1, можна + кілька разів
> 62 |     await page.getByRole('button', { name: '+' }).click();
     |                                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  63 | 
  64 |     // ingredient: перша доступна опція з відкритого списку
  65 |     await page.getByRole('button', { name: 'Add the ingredient' }).click();
  66 |     const ingredientOption = page.locator('ul li button').first();
  67 |     await expect(ingredientOption).toBeVisible({ timeout: 10_000 });
  68 |     const ingredientName = (await ingredientOption.textContent())?.trim();
  69 |     expect(ingredientName).toBeTruthy();
  70 |     await ingredientOption.click();
  71 | 
  72 |     await page.getByPlaceholder('Enter quantity').fill('100g');
  73 |     await page.getByRole('button', { name: /add ingredient/i }).click();
  74 | 
  75 |     await page.locator('textarea[name="instructions"]').fill(
  76 |       'E2E steps: mix ingredients, bake, serve warm.',
  77 |     );
  78 | 
  79 |     await page.getByRole('button', { name: /^publish$/i }).click();
  80 | 
  81 |     await expect(page).toHaveURL(/\/recipe\/[a-zA-Z0-9]+/, { timeout: 30_000 });
  82 |     await expect(page.getByText(/e2e cake/i).first()).toBeVisible({ timeout: 15_000 });
  83 |   });
  84 | 
  85 |   test('guest cannot open add recipe page', async ({ page }) => {
  86 |     await page.goto('/recipe/add');
  87 |     await expect(page.getByTestId('auth-sign-in')).toBeVisible({ timeout: 10_000 });
  88 |     await expect(page).not.toHaveURL(/\/recipe\/add/);
  89 |   });
  90 | });
  91 | 
```