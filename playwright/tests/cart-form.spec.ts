import { test, expect } from '@playwright/test';

test('Пользователь может заполнить форму валидными данными', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog/0');
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  const cartLink = page.getByRole('link', { name: 'Cart (1)' });
  if (!(await cartLink.isVisible())) {
    return;
  }
  await cartLink.click();

  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('Username');

  await page.getByLabel('Phone').click();
  await page.getByLabel('Phone').fill('+79995553456');

  await page.getByLabel('Address').click();
  await page.getByLabel('Address').fill('Some adress');

  await page.getByRole('button', { name: 'Checkout' }).click();

  const errorComponent = page.locator(".invalid-feedback");
  const errorCount = await errorComponent.count();

  for (let i = 0; i < errorCount; i++) {
    await expect(errorComponent.nth(i)).toBeHidden();
  }
});

test('Пользователь не может заполнить форму не валидными данными', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog/0');
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  const cartLink = page.getByRole('link', { name: 'Cart (1)' });
  if (!(await cartLink.isVisible())) {
    return;
  }
  await cartLink.click();

  await page.getByLabel('Phone').click();
  await page.getByLabel('Phone').fill('invalid data');

  await page.getByRole('button', { name: 'Checkout' }).click();

  const errorComponent = page.locator(".invalid-feedback");
  const errorCount = await errorComponent.count();
  
  for (let i = 0; i < errorCount; i++) {
    await expect(errorComponent.nth(i)).toBeVisible();
  }
});