import { expect, Locator, Page } from "@playwright/test";
export class CartPage {

    checkoutButton: Locator = this.page.getByRole('link', { name: 'PROCEED TO CHECKOUT' });

    constructor(private page: Page) { };

    async verifyItemInCart(itemName: string) {
        const itemInCart = this.page.getByRole('link', { name: itemName }).first();
        await expect(itemInCart).toBeVisible();
    }

    async checkout() {
        await expect(this.checkoutButton).toBeVisible();
        await this.checkoutButton.click();
    }

}
