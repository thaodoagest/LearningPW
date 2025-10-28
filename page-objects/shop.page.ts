import { Locator, Page, expect } from '@playwright/test';

export class ShopPage {
    
    addToCartButton: Locator  = this.page.getByRole('button').filter({ hasText: 'Add to Cart' }).first();


    constructor(private page: Page) {
    }

    async addItems(itemName: string, quantity: number) {
        const itemCard = this.page.getByRole('link', {name: itemName , exact: true});

        await expect(itemCard).toBeVisible();
        await itemCard.click();
        await this.page.waitForLoadState('networkidle');
        const quantityInput = this.page.getByRole('spinbutton', { name: itemName + ' quantity' });
        await quantityInput.fill(quantity.toString());
        await this.addToCartButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.goBack();
        await this.page.waitForLoadState('networkidle');

    }

    async buyMultipleItems(items: { name: string; quantity: number }[]) {
        for (const item of items) {
            await this.addItems(item.name, item.quantity);
        }
        }
}

