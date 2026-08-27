/**
 * Add recipe (private route)
 *
 * Run:
 *   pnpm exec playwright test --headed e2e/recipes/add-recipe.spec.ts
 *
 * Requires:
 *   - .env.e2e
 *   - e2e/fixtures/recipe.jpg
 */
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { test, expect, type Page } from '@playwright/test';

const E2E_USER = {
  email: process.env.E2E_USER_EMAIL ?? 'e2e.user@foodies.test',
  password: process.env.E2E_USER_PASSWORD ?? 'securepass123',
};

const fixtureImage = fileURLToPath(new URL('../fixtures/recipe.jpg', import.meta.url));

async function login(page: Page) {
  await page.goto('/');
  await page.getByTestId('auth-sign-in').click();
  await page.getByTestId('auth-email').fill(E2E_USER.email);
  await page.getByTestId('auth-password').fill(E2E_USER.password);
  await page.getByTestId('sign-in-submit').click();
  await expect(page.getByTestId('user-bar')).toBeVisible({ timeout: 15_000 });
}

/** CustomSelect: кнопка з placeholder → кнопка з текстом опції */
async function chooseFromSelect(page: Page, placeholder: string, optionName: string) {
  await page.getByRole('button', { name: placeholder }).click();
  await page.getByRole('button', { name: optionName, exact: true }).click();
}

test.describe('add recipe', () => {
  test('logged-in user can publish a recipe', async ({ page }) => {
    await login(page);
    await page.goto('/recipe/add');

    // дочекатись завантаження options з API
    await expect(page.getByRole('button', { name: 'Select a category' })).toBeVisible({
      timeout: 20_000,
    });
    await expect(page.getByRole('button', { name: 'Select an area' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add the ingredient' })).toBeVisible();

    // photo (input hidden — setInputFiles все одно працює)
    await page.locator('input[type="file"]').setInputFiles(fixtureImage);

    await page.getByPlaceholder('Enter recipe name').fill(`E2E Cake ${Date.now()}`);
    await page.getByPlaceholder('Enter a description of the dish').fill(
      'E2E test description for recipe form',
    );

    // назви опцій мають існувати в API; за потреби підстав реальні з UI
    await chooseFromSelect(page, 'Select a category', 'Breakfast');
    await chooseFromSelect(page, 'Select an area', 'Italian');

    // time: стартове 1, можна + кілька разів
    await page.getByRole('button', { name: '+' }).click();

    // ingredient: перша доступна опція з відкритого списку
    await page.getByRole('button', { name: 'Add the ingredient' }).click();
    const ingredientOption = page.locator('ul li button').first();
    await expect(ingredientOption).toBeVisible({ timeout: 10_000 });
    const ingredientName = (await ingredientOption.textContent())?.trim();
    expect(ingredientName).toBeTruthy();
    await ingredientOption.click();

    await page.getByPlaceholder('Enter quantity').fill('100g');
    await page.getByRole('button', { name: /add ingredient/i }).click();

    await page.locator('textarea[name="instructions"]').fill(
      'E2E steps: mix ingredients, bake, serve warm.',
    );

    await page.getByRole('button', { name: /^publish$/i }).click();

    await expect(page).toHaveURL(/\/recipe\/[a-zA-Z0-9]+/, { timeout: 30_000 });
    await expect(page.getByText(/e2e cake/i).first()).toBeVisible({ timeout: 15_000 });
  });

  test('guest cannot open add recipe page', async ({ page }) => {
    await page.goto('/recipe/add');
    await expect(page.getByTestId('auth-sign-in')).toBeVisible({ timeout: 10_000 });
    await expect(page).not.toHaveURL(/\/recipe\/add/);
  });
});
