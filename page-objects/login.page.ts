import { Locator, Page } from "@playwright/test";

export class LoginPage {
  usernameInput: Locator = this.page.getByRole("textbox", {
    name: "Username or email address",
  });
  passwordInput: Locator = this.page.getByRole("textbox", { name: "Password" });
  loginLink: Locator = this.page.getByRole("link", {
    name: "Log in / Sign up",
  });
  loginButton: Locator = this.page.getByRole("button", { name: "LOG IN" });

  constructor(private page: Page) {}

  async logIn(username: string, password: string) {
    await this.loginLink.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
