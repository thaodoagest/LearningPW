import { expect, Locator, Page } from "@playwright/test";

export class CheckOutPage {
    placeOrderButton: Locator = this.page.getByRole('button', { name: 'PLACE ORDER' });
    firstNameInput: Locator = this.page.getByRole('textbox', { name: 'First Name' });
    lastNameInput: Locator = this.page.getByRole('textbox', { name: 'Last Name' });
    countryInput: Locator = this.page.locator('select#billing_country');
    streetInput: Locator = this.page.getByRole('textbox', { name: 'Street address *' });
    cityInput: Locator = this.page.getByRole('textbox', { name: 'Town / City *' });
    zipCodeInput: Locator = this.page.getByRole('textbox', { name: 'ZIP code *' });
    phoneInput: Locator = this.page.getByRole('textbox', { name: 'Phone *' });
    emailInput: Locator = this.page.getByRole('textbox', { name: 'Email address *' });
    orderConfirmation: Locator = this.page.getByText('Thank you. Your order has been received.');
    billingAddressSection: Locator = this.page.locator('woocommerce-customer-details');
    constructor(private page: Page) { }

    async fillShippingDetails(details: {
        firstName: string,
        lastName: string,
        street: string,
        country: string,
        city: string,
        zipCode: string,
        phone: string,
        email: string
        payMentMethod?: string
    }) {
        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        await this.countryInput.selectOption(details.country);
        await this.streetInput.fill(details.street);
        await this.cityInput.fill(details.city);
        await this.zipCodeInput.fill(details.zipCode);
        await this.phoneInput.fill(details.phone);
        await this.emailInput.fill(details.email);
        if (details.payMentMethod)
            await this.page.getByRole('radio', { name: details.payMentMethod }).check();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyOrderDetails(orderdetails: {
        itemName: string,
        name: string,
        street: string,
        city: string,
        zipCode: string,
        phone: string,
        email: string
        payMentMethod?: string
    }) {
        await this.page.waitForTimeout(2000);
        await expect(this.orderConfirmation).toBeVisible();
        await expect(this.page.getByRole('link', { name: orderdetails.itemName })).toBeVisible();
        await expect(this.page.getByText(orderdetails.phone)).toBeVisible();
        await expect(this.page.getByRole('paragraph').filter({ hasText: orderdetails.email })).toBeVisible();
        await expect(this.page.getByText(orderdetails.name)).toBeVisible();
        await expect(this.page.getByText(orderdetails.street)).toBeVisible();
        await expect(this.page.getByText(orderdetails.city)).toBeVisible();
        if (orderdetails.payMentMethod)
            await expect(this.page.getByRole('cell', { name: orderdetails.payMentMethod })).toBeVisible();

    }


    async verifymultipleProducts(itemName: string, quantity: number) {
        const items = this.page.getByRole('cell', { name: itemName + ' × ' + quantity });
        await expect(items).toBeVisible();
    }

    async verifymultipleProductsInOrder(items: { name: string; quantity: number }[]) {
        for (const item of items) {
            await this.verifymultipleProducts(item.name, item.quantity);
        }

    }

}
