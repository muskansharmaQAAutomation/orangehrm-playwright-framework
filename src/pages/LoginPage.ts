import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import DashboardPage from "./DashboardPage";

export default class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.getByPlaceholder("Username");
    this.passwordInput = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.loginErrorMessage = this.page.locator(".oxd-alert-content-text");
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
    this.logInfo("Navigated to OrangeHRM login page");
  }

  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    this.logInfo(`Entered username: ${username}`);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
    this.logInfo("Entered password");
  }

  async clickLogin(): Promise<DashboardPage> {
  await this.click(this.loginButton);
  this.logInfo("Clicked Login button");

  return new DashboardPage(this.page);
}
  

  async login(username: string, password: string): Promise<DashboardPage> {
  await this.enterUsername(username);
  await this.enterPassword(password);
  return await this.clickLogin();
}

  async getLoginErrorMessage(): Promise<string> {
    await this.waitForVisible(this.loginErrorMessage);
    return await this.text(this.loginErrorMessage);
  }
}
