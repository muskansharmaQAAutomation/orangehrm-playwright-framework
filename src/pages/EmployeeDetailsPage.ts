import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class EmployeeDetailsPage extends BasePage {
  private readonly personalDetailsHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.personalDetailsHeading = this.page.locator(
      "h6.orangehrm-main-title"
    );
  }

  async expectPersonalDetailsPageToBeVisible(): Promise<void> {
    await this.waitForVisible(this.personalDetailsHeading);
    this.logInfo("Employee Personal Details page is visible");
  }
}