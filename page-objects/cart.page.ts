import { expect, Locator, Page } from "@playwright/test";
import { log } from "console";
export class CartPage {
  checkoutButton: Locator = this.page.getByRole("link", {
    name: "PROCEED TO CHECKOUT",
  });

  constructor(private page: Page) {}

  async verifyItemInCart(itemName: string, numberOfItems?: number) {
    const itemInCart = this.page.getByRole("link", { name: itemName }).first();
    await expect(itemInCart).toBeVisible();
    if (numberOfItems) {
      const quantityLocator = this.page
        .getByRole("row")
        .filter({ hasText: itemName })
        .getByRole("spinbutton");
      await expect(quantityLocator).toHaveValue(numberOfItems.toString());
    }
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async removeItem(itemName: string) {
    const removeButton = this.page
      .getByRole("cell")
      .filter({ hasText: itemName })
      .getByRole("link", { name: "Remove" });
    await removeButton.click();
  }

  async verifyCartIsEmpty() {
    await expect(
      this.page.getByRole("heading", { name: "YOUR SHOPPING CART IS EMPTY" })
    ).toBeVisible();
  }

  async updateItemQuantity(itemName: string, quantity: number) {
    const quantityLocator = this.page
      .getByRole("row")
      .filter({ hasText: itemName })
      .getByRole("spinbutton");
    await quantityLocator.fill(quantity.toString());
    // Click outside to trigger update
    await this.page.click("body");
  }

  async getItemQuantity(itemName: string): Promise<number> {
    const quantityLocator = this.page
      .getByRole("row")
      .filter({ hasText: itemName })
      .getByRole("spinbutton");
    const value = await quantityLocator.inputValue();
    return parseInt(value, 10);
  }

  async addItemQuantity(itemName: string, incrementBy: number) {
    for (let i = 0; i < incrementBy; i++) {
      await this.page
        .getByRole("row")
        .filter({ hasText: itemName })
        .locator(".plus")
        .click();
    }
  }

  async getSubTotalNumber(itemName: string): Promise<number> {
    const subTotalText = await this.page
      .getByRole("row")
      .filter({ hasText: itemName })
      .locator(".product-subtotal")
      .textContent();

    if (!subTotalText) {
      throw new Error(`Subtotal text not found for item: ${itemName}`);
    }
    const subTotal = subTotalText.replace(/[^\d.,-]/g, "");
    return parseFloat(subTotal);
  }

  async verifySubTotal(expectedTotal: string) {
    const expected = expectedTotal.toString();
    await expect(
      this.page
        .getByRole("row")
        .filter({ hasText: "AirPods" })
        .locator(".product-subtotal")
        .filter({ hasText: expected })
    ).toBeVisible();
  }
}
