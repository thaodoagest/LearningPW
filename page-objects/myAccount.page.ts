import { expect, Locator, Page } from "@playwright/test";
import { log } from "console";

export class MyAccountPage {

    logoutLink: Locator = this.page.getByRole('link', { name: 'Log out' });
    recentOrdersLink: Locator = this.page.getByRole('link').filter({ hasText: 'Recent orders' });
    orderTable: Locator = this.page.locator('table.shop_table');

    constructor(private page: Page) {
    }
    async gotoRecentOrders() {
        await this.recentOrdersLink.click();

    }

    async verifyOrderS(expectedCount: number) {
        // wait for table to appear
        await expect(this.orderTable).toBeVisible({ timeout: 5000 });

        // get rows inside tbody (exclude header)
        const orderRows = this.orderTable.locator('tbody tr');
        const actualCount = await orderRows.count();

        log(`Found ${actualCount} orders in order history.`);

        // assert minimum count
        await expect(actualCount).toBeGreaterThanOrEqual(expectedCount);
    }

}
