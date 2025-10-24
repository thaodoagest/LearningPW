import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.testarchitect.com/');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Log in / Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username or email address *' }).click();
  await page.getByRole('textbox', { name: 'Username or email address *' }).click();
  await page.getByRole('textbox', { name: 'Username or email address *' }).fill('test');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('test');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.goto('https://demo.testarchitect.com/my-account/');
  await page.getByRole('link', { name: '$0.00' }).click();
  await page.getByRole('link', { name: '$0.00' }).click();
  await page.goto('https://demo.testarchitect.com/cart/');
});