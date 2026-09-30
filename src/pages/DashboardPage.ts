import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import EmployeeListPage from "./EmployeeListPage";

export default class DashboardPage extends BasePage {
  private readonly dashboardHeading: Locator;
  private readonly pimMenu: Locator;

  constructor(page: Page) {
    super(page);

    this.dashboardHeading = this.page.getByRole("heading", {
      name: "Dashboard",
    });

    this.pimMenu = this.page.getByText("PIM", { exact: true });
  }

  async expectDashboardToBeVisible(): Promise<void> {
    await this.waitForVisible(this.dashboardHeading);
    this.logInfo("Dashboard is visible after successful login");
  }

  async openPIM(): Promise<EmployeeListPage> {
    await this.click(this.pimMenu);
    this.logInfo("Opened PIM module");

    return new EmployeeListPage(this.page);
  }
}