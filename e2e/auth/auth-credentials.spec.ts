/**
 * Auth tests with fixed e2e user from .env.e2e
 *
 * Run:
 *   pnpm exec playwright test e2e/auth/auth-credentials.spec.ts
 * Run with browser
 *   pnpm exec playwright test --headed e2e/auth/auth-credentials.spec.ts 
 *
 * Requires .env.e2e:
 *   E2E_USER_EMAIL=e2e.user@foodies.test
 *   E2E_USER_PASSWORD=securepass123
 *   E2E_USER_NAME=foodies test
 */
import { test, expect } from '@playwright/test';

const E2E_USER = {
  name: process.env.E2E_USER_NAME ?? 'foodies test',
  email: process.env.E2E_USER_EMAIL ?? 'e2e.user@foodies.test',
  password: process.env.E2E_USER_PASSWORD ?? 'securepass123',
};

test.describe('auth credentials', () => {
  test('login success → logout', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('auth-sign-in').click();
    await page.getByTestId('auth-email').fill(E2E_USER.email);
    await page.getByTestId('auth-password').fill(E2E_USER.password);
    await page.getByTestId('sign-in-submit').click();

    await expect(page.getByTestId('user-bar')).toBeVisible({ timeout: 15_000 });

    await page.getByTestId('user-bar').click();
    await page.getByTestId('auth-log-out').click();
    await page.getByTestId('log-out-confirm').click();

    await expect(page.getByTestId('auth-sign-in')).toBeVisible({ timeout: 15_000 });
  });

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('auth-sign-in').click();
    await page.getByTestId('auth-email').fill(E2E_USER.email);
    await page.getByTestId('auth-password').fill('wrong-password-999');
    await page.getByTestId('sign-in-submit').click();

    await expect(
      page.getByText(/invalid|credentials|failed|error|wrong/i).first(),
    ).toBeVisible({ timeout: 10_000 });

    await expect(page.getByTestId('user-bar')).toHaveCount(0);
    await expect(page.getByTestId('auth-sign-in')).toBeVisible();
  });

  test('login with unknown email shows error', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('auth-sign-in').click();
    await page.getByTestId('auth-email').fill(`missing+${Date.now()}@foodies.test`);
    await page.getByTestId('auth-password').fill(E2E_USER.password);
    await page.getByTestId('sign-in-submit').click();

    await expect(
      page.getByText(/invalid|credentials|failed|error|not found/i).first(),
    ).toBeVisible({ timeout: 10_000 });

    await expect(page.getByTestId('user-bar')).toHaveCount(0);
  });

  test('register with existing email fails', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('auth-sign-up').click();
    await page.getByTestId('auth-name').fill(E2E_USER.name);
    await page.getByTestId('auth-email').fill(E2E_USER.email);
    await page.getByTestId('auth-password').fill(E2E_USER.password);
    await page.getByTestId('sign-up-submit').click();

    await expect(
      page.getByText(/already|taken|exists|error|failed/i).first(),
    ).toBeVisible({ timeout: 10_000 });

    await expect(page.getByTestId('user-bar')).toHaveCount(0);
  });
});
