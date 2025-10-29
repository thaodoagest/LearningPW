import { HomePage } from 'page-objects/home.page';
import { test, expect } from 'utils/fixtures';
import { ShopPage } from 'page-objects/shop.page';


test('TC04 - users can sort items by price', async ({ page, loggedInPage }) => {

    const homePage = new HomePage(page);
    const shopPage = new ShopPage(page);

    await homePage.selectMenuItem("Shop");
    await homePage.switchView("list");
    await shopPage.filter("Sort by price: high to low");
    await shopPage.verifyItemsSortedByPriceDescending();
    await shopPage.filter("Sort by price: low to high");
    await shopPage.verifyItemsSortedByPriceAscending();


});
