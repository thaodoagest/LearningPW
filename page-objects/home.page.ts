import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    static departments: {
        ELECTRONIC_COMPONENTS_AND_SUPPLIES: "/Electronic Components & Supplies/",

    };
    allDeparments: Locator = this.page.getByText('All Departments');
    gridButton: Locator = this.page.locator('.switch-grid');
    listButton: Locator = this.page.locator('.switch-list');
    cartLink: Locator = this.page.getByRole('link').filter({ hasText: '$' }).getByRole('img').first();
    
    constructor(private page: Page) {
    };

    async selectDepartment(nameDeparment: string) {
        await this.allDeparments.click();
        await this.page.waitForLoadState('networkidle');
        const department = this.page.getByRole('link', { name: nameDeparment }).first();
        await expect(department).toBeVisible();
        await department.click();
    }

    async selectMenuItem(menuItem: string) {
        const menu = this.page.getByRole('link', { name: menuItem }).first();
        await expect(menu).toBeVisible();
        await menu.click();
    }


    async switchView(view: string) {
        await this.page.waitForTimeout(2000);
        if (view === "Grid") {
            await expect(this.gridButton).toBeVisible();
            await this.gridButton.click();
        } else if (view === "List") {
            await expect(this.listButton).toBeVisible();
            await this.listButton.click();
        }
    }

    async verifyViewIs(view: string) {
        if (view === "List") {
            const productsList = this.page.locator('.products-list');
            await expect(productsList).toBeVisible();
        } else if (view === "Grid") {
            const productsGrid = this.page.locator('.products-grid');
            await expect(productsGrid).toBeVisible();
        }
    }

    async addItemToCart(itemName: string) {
        const item = this.page.getByRole('link', { name: itemName }).first();
        await expect(item).toBeVisible();
        await item.click();
        await this.page.waitForLoadState('networkidle');

    }

    async gotoCart() {
        await this.page.waitForTimeout(2000);
        await expect(this.cartLink).toBeVisible();
        await this.cartLink.click();
    }





}

