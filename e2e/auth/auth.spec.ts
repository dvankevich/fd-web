import { test, expect } from '@playwright/test';

test('register → logout → login', async ({ page }) => {
  const name = 'E2E User';
  const email = `e2e+${Date.now()}@example.com`;
  const password = 'securepass123';

  await page.goto('/');

  // --- Register ---
  await page.getByTestId('auth-sign-up').click();
  await page.getByTestId('auth-name').fill(name);
  await page.getByTestId('auth-email').fill(email);
  await page.getByTestId('auth-password').fill(password);
  await page.getByTestId('sign-up-submit').click();

  await expect(page.getByTestId('user-bar')).toBeVisible({ timeout: 15_000 });

  // --- Logout ---
  await page.getByTestId('user-bar').click();
  await page.getByTestId('auth-log-out').click();
  await page.getByTestId('log-out-confirm').click();

  await expect(page.getByTestId('auth-sign-in')).toBeVisible({ timeout: 15_000 });

  // --- Login ---
  await page.getByTestId('auth-sign-in').click();
  await page.getByTestId('auth-email').fill(email);
  await page.getByTestId('auth-password').fill(password);
  await page.getByTestId('sign-in-submit').click();

  await expect(page.getByTestId('user-bar')).toBeVisible({ timeout: 15_000 });
});
