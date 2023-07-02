import { test, expect } from '@playwright/test';

test('В каталоге должны отображаться товары, список которых приходит с сервера', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog');
  const firstProduct = page.getByTestId('0').first();
  await expect(firstProduct).toBeVisible();
});

test('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog');
  let i = 0;
  let productItem = page.getByTestId(i.toString()).first();
  while (await productItem.isVisible()) {
    const productName = await productItem.locator(".card-title").innerText();
    expect(productName).toBeDefined();
    expect(productName).not.toBe('');
    i++;
    productItem = page.getByTestId(i.toString()).first();
  }
});

test('Для каждого товара в каталоге отображается цена', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog');
  let i = 0;
  let productItem = page.getByTestId(i.toString()).first();
  while (await productItem.isVisible()) {
    const productPrice = await productItem.locator(".card-text").innerText();
    expect(productPrice).toBeDefined();
    expect(productPrice).toMatch(/\$[0-9]+/g);
    i++;
    productItem = page.getByTestId(i.toString()).first();
  }
});

test('Для каждого товара в каталоге отображается ссылка на страницу с подробной информацией о товаре', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog');
  let i = 0;
  let productItem = page.getByTestId(i.toString()).first();
  while (await productItem.isVisible()) {
    const productUrl = await productItem.locator(".card-link").getAttribute('href');
    expect(productUrl).toBeDefined();
    expect(productUrl).not.toBe('');
    i++;
    productItem = page.getByTestId(i.toString()).first();
  }
});