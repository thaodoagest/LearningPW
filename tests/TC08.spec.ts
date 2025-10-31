import { test } from "@playwright/test";
import { Common } from "../utils/common";
import { HomePage } from "../page-objects/home.page";
import { ShopPage } from "../page-objects/shop.page";
import { CartPage } from "../page-objects/cart.page";

test("TC08- -users can clear the cart", async ({ page }) => {
  const productName = "AirPods";
  const homePage = new HomePage(page);
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);

  await Common.navigateToPage(page);
  await homePage.selectMenuItem("Shop");

  await homePage.switchView("List");
  await shopPage.addItems(productName, 2);

  await homePage.gotoCart();
  await cartPage.removeItem(productName);
  await cartPage.verifyCartIsEmpty();
});
