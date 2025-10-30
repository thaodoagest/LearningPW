import {test, Page } from '@playwright/test';
import { Common } from 'utils/common';
import { HomePage } from 'page-objects/home.page';
import { ShopPage } from 'page-objects/shop.page';
import { CartPage } from 'page-objects/cart.page';
import { CheckOutPage } from 'page-objects/checkOut.page';
import { CONFIG } from 'utils/config';

test ('TC07 - Ensure proper error handling when mandatory fields are blank', async ({ page }) => {
     const homePage = new HomePage(page);
        const shopPage = new ShopPage(page);
        const cartPage = new CartPage(page);
        const checkOutPage = new CheckOutPage(page);
    
        const productName = "AirPods";
        const payMent = "Check payments";
    
        await Common.navigateToPage(page);
        await homePage.selectMenuItem("Shop");
        await homePage.switchView("List");
        await shopPage.addItems(productName, 1);
        await homePage.gotoCart();
        await cartPage.checkout();
        await checkOutPage.fillShippingDetails({
            firstName: CONFIG.Customer.FIRST_NAME,
            lastName: CONFIG.Customer.LAST_NAME,
            street: "",
            country: CONFIG.Customer.COUNTRY,
            city: CONFIG.Customer.CITY,
            zipCode: CONFIG.Customer.ZIP_CODE,
            phone: CONFIG.Customer.PHONE,
            email: "",
            payMentMethod: payMent
    
        });
        await checkOutPage.placeOrder();
        await checkOutPage.verifyErrorMessage('Billing Street address is a required field.');
        await checkOutPage.verifyErrorMessage('Billing Email address is a required field.');
});
