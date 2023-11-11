import { test, expect } from '@playwright/test';
import snippets from "../snippets";

test('test', async ({ page }) => {
  await page.goto('http://192.168.0.184:5173/');
  await snippets["playwrite example"]({page});
  await page.getByRole('button', { name: 'Submit' }).click();
});