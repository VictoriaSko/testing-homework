import { test, expect } from '@playwright/test';

test('Пользователь должен видеть главную страницу', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store');
  await expect(page).toHaveScreenshot('main.png');
});

test('Пользователь должен видеть адаптированную главную страницу', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store');
  page.setViewportSize({ height: 632, width: 400, });
  await expect(page).toHaveScreenshot('main-small.png');
});

test('Пользователь должен видеть страницу о доставке', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/delivery');
  await expect(page).toHaveScreenshot('delivery.png');
});

test('Пользователь должен видеть адаптированную страницу о доставке', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/delivery');
  page.setViewportSize({ height: 632, width: 400, });
  await expect(page).toHaveScreenshot('delivery-small.png');
});


test('Пользователь должен видеть страницу с контактами', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/contacts');
  await expect(page).toHaveScreenshot('contacts.png');
});

test('Пользователь должен видеть адаптированную страницу с контактами', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/contacts');
  page.setViewportSize({ height: 632, width: 400, });
  await expect(page).toHaveScreenshot('contacts-small.png');
});