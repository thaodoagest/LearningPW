import { expect , test} from "utils/fixtures";
import { HomePage } from "page-objects/home.page";
import { ShopPage } from "page-objects/shop.page";
import { CartPage } from "page-objects/cart.page";

test("TC09 - users can update quantity of product in cart", async ({page, loggedInPage}) => {

    const homePage = new HomePage(page);
    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);

    const productName = "iPad Air 2";
    const productQuantity = 1;
    //Go to Shop page
    await homePage.selectMenuItem("Shop");
    //Add a product
    await shopPage.addItems(productName, productQuantity);
    //Go to the cart
    await homePage.gotoCart();

    //Verify quantity of added product
    await cartPage.verifyItemInCart(productName , productQuantity);
    const price = (await cartPage.getSubTotalNumber(productName)).toString();
    //Click on Plus(+) button
    await cartPage.addItemQuantity(productName , 1);
    //Verify quantity of product and SUB TOTAL price
    await cartPage.verifyItemInCart(productName, productQuantity + 1);
    await cartPage.verifySubTotal(price);



});
