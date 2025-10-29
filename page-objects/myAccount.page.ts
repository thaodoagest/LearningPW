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

    async verifyOrderS(orderNumber: number) {
        const rowCount = this.orderTable.locator('tbody tr').count();

        log("Number of orders found: " + rowCount);
        log(rowCount.toString());

        //await expect(rowCount).toBeGreaterThanOrEqual(orderNumber)
         //this.orderTable.locator('tbody tr').count();
        //const order = this.orderTable.getByRole('link', { name: orderNumber });
    }

}
