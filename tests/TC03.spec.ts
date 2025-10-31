import { test, expect } from "utils/fixtures";
import { CONFIG } from "utils/config";
import { HomePage } from "page-objects/home.page";
import { CartPage } from "page-objects/cart.page";
import { CheckOutPage } from "page-objects/checkOut.page";
import { ShopPage } from "page-objects/shop.page";

test("TC_03 : users can sort items by price", async ({
  page,
  loggedInPage,
}) => {
  const homePage = new HomePage(page);
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);
  const checkOutPage = new CheckOutPage(page);

  const productName = "AirPods";
  const payMent = "Cash on delivery";

  await homePage.selectMenuItem("Shop");
  await shopPage.addItems(productName, 1);
  await homePage.gotoCart();
  await cartPage.checkout();
  await checkOutPage.fillShippingDetails({
    firstName: CONFIG.Customer.FIRST_NAME,
    lastName: CONFIG.Customer.LAST_NAME,
    street: CONFIG.Customer.STREET,
    country: CONFIG.Customer.COUNTRY,
    city: CONFIG.Customer.CITY,
    zipCode: CONFIG.Customer.ZIP_CODE,
    phone: CONFIG.Customer.PHONE,
    email: CONFIG.Customer.EMAIL,
    payMentMethod: payMent,
  });

  await checkOutPage.placeOrder();
  await checkOutPage.verifyOrderDetails({
    itemName: productName,
    name: CONFIG.Customer.FIRST_NAME + " " + CONFIG.Customer.LAST_NAME,
    street: CONFIG.Customer.STREET,
    city: CONFIG.Customer.CITY,
    zipCode: CONFIG.Customer.ZIP_CODE,
    phone: CONFIG.Customer.PHONE,
    email: CONFIG.Customer.EMAIL,
    payMentMethod: payMent,
  });
});
