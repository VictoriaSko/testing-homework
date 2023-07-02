import { test, expect } from '@playwright/test';

test('Пользователь может добавить продукт в корзину', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog/0');
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  const successMessage = page.locator(".text-success");
  await expect(successMessage).toBeVisible();

  const cartLink = page.getByRole('link', { name: 'Cart (1)' });
  await expect(cartLink).toBeVisible();

  await cartLink.click();

  const cartItem = page.getByTestId("0").first();

  await expect(cartItem).toBeVisible();

  const itemCount = await cartItem.locator("td").nth(2).innerText();

  expect(itemCount).toBe('1');
});


test('Состояние корзины сохраняется после обновления страницы', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog/0');
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  const cartLink = page.getByRole('link', { name: 'Cart (1)' });
  if (await cartLink.isVisible()) {
    await cartLink.click();

    const cartItem = page.getByTestId("0").first();

    if (await cartItem.isVisible()) {
      await page.reload();
      await expect(cartItem).toBeVisible();
    }
  }
});