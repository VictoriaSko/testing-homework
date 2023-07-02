import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 632,
    width: 400,
  }
});

test('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/');
  await page.getByRole('button', { name: 'Toggle Navigation' }).click();
  const navBar = page.getByTestId('navbar-nav');
  await expect(navBar).toBeVisible();
});

test('При выборе элемента из меню "гамбургера", меню должно закрываться', async ({page}) => {
  await page.goto('http://localhost:3000/hw/store/');
  await page.getByRole('button', { name: 'Toggle Navigation' }).click();
  const navBar = page.getByTestId('navbar-nav');
  await page.getByRole('link', { name: 'Catalog' }).click();
  await expect(navBar).not.toBeVisible();
});
