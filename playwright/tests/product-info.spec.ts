import { test, expect } from '@playwright/test';

test('Пользователь может перейти на страницу с подробной информацией о продукте', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog');
  let i = 0;
  let productItem = page.getByTestId(i.toString()).first();
  while (await productItem.isVisible()) {
    await productItem.locator(".card-link").click();
    await expect(page).toHaveURL(`http://localhost:3000/hw/store/catalog/${i}`);
    await expect(page.getByTestId("product")).toBeVisible();
    await page.goto('http://localhost:3000/hw/store/catalog');
    i++;
    productItem = page.getByTestId(i.toString()).first();
  }
});
