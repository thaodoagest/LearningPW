import { Page, expect } from '@playwright/test';
import { CONFIG } from './config';

export class Common {

    static async navigateToPage(page: Page) {
        await page.goto(CONFIG.Url);
        await page.getByRole('button', { name: 'Close' }).click();
        await page.getByRole('dialog', { name: 'Cookie Notice' })
            .getByRole('link', { name: 'OK' }).click();
    }


}
