import { Locator, Page, expect } from "@playwright/test";

export class ShopPage {
  addToCartButton: Locator = this.page
    .getByRole("button")
    .filter({ hasText: "Add to Cart" })
    .first();

  constructor(private page: Page) {}

  async addItems(itemName: string, quantity: number) {
    const itemCard = this.page.getByRole("link", {
      name: itemName,
      exact: true,
    });
    await itemCard.click();
    const quantityInput = this.page.getByRole("spinbutton", {
      name: itemName + " quantity",
    });
    await quantityInput.fill(quantity.toString());
    await this.addToCartButton.click();
    await this.page.goBack();
  }

  async buyMultipleItems(items: { name: string; quantity: number }[]) {
    for (const item of items) {
      await this.addItems(item.name, item.quantity);
    }
  }

  async filter(filterBy: string) {
    await this.page.locator('select[name="orderby"]').selectOption(filterBy);
  }

  async verifyItemsSortedByPriceDescending() {
    await this.page.waitForTimeout(5000); // Wait for sorting to take effect

    const prices = await this.page
      .locator(".product")
      .locator(".price")
      .allTextContents();
    const priceValues = prices.map((priceText) => {
      const match = priceText.match(/[\d,.]+/g);
      if (match) {
        // Handle cases with sale prices (e.g., "$20.00 $15.00")
        const lastPrice = match[match.length - 1];
        return parseFloat(lastPrice.replace(/,/g, ""));
      }
      return 0;
    });
    const sortedPrices3 = [...priceValues].sort((a, b) => b - a);
    expect(priceValues).toEqual(sortedPrices3);
  }

  async verifyItemsSortedByPriceAscending() {
    await this.page.waitForTimeout(5000); // Wait for sorting to take effect
    const prices = await this.page
      .locator(".product")
      .locator(".price")
      .allTextContents();
    const priceValues = prices.map((priceText) => {
      const match = priceText.match(/[\d,.]+/g);
      if (match) {
        // Handle cases with sale prices (e.g., "$20.00 $15.00")
        const lastPrice = match[match.length - 1];
        return parseFloat(lastPrice.replace(/,/g, ""));
      }
      return 0;
    });
    const sortedPrices = [...priceValues].sort((a, b) => a - b);
    expect(priceValues).toEqual(sortedPrices);
  }
}
