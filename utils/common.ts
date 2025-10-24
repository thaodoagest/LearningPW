import { Page, expect } from '@playwright/test';
import { CONFIG } from './config';

export class CommonActions {

    static async navigateToPage(page: Page) {
        await page.goto(CONFIG.Url);
        await expect(page).toHaveTitle(/TestArchitect/);
        await page.getByRole('button', { name: 'Close' }).click();
        await page.getByRole('link', { name: /Electronic Components & Supplies/ }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('dialog', { name: 'Cookie Notice' })
            .getByRole('link', { name: 'OK' }).click();
    }


}
