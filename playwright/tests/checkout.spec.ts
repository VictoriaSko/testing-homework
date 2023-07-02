import { test, expect } from '@playwright/test';

test.describe.serial("Checkout tests", () => {
  test('После оформления заказа пользователь должен видеть уведомление', async ({ page }) => {
    if (!(await getFillOrderSuccess({ page }))) return;

    const successMessage = page.getByTestId("checkout-success");

    await expect(successMessage).toBeVisible();
  });

  test('После оформления заказа пользователь должен видеть правильное уведомление', async ({ page }) => {
    if (!(await getFillOrderSuccess({ page }))) return;

    const successMessage = page.getByTestId("checkout-success");

    if (!(await successMessage.isVisible())) return;

    const alertComponent = successMessage.locator(".alert");

    await expect(alertComponent).toHaveClass(/alert-success/);
  });


  test('Пользователь видит правильный номер заказа', async ({ page }) => {
    if (!(await getFillOrderSuccess({ page }))) return;

    const successMessage = page.getByTestId("checkout-success");

    if (!(await successMessage.isVisible())) return;

    const orderNumber = await successMessage.locator("strong").innerText();

    if (!(await getFillOrderSuccess({ page }))) return;

    const newSuccessMessage = page.getByTestId("checkout-success");

    if (!(await newSuccessMessage.isVisible())) return;

    const newOrderNumber = await successMessage.locator("strong").innerText();

    expect(+newOrderNumber - +orderNumber).toBe(1);
  });
});

const getFillOrderSuccess = async ({ page }) => {
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
    if (await errorComponent.nth(i).isVisible()) return false;
  }

  return true;
};
