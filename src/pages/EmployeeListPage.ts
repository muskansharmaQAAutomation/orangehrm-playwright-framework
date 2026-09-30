import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import AddEmployeePage from "./AddEmployeePage";

export default class EmployeeListPage extends BasePage {
  private readonly employeeListHeading: Locator;
  private readonly addButton: Locator;
  

  constructor(page: Page) {
    super(page);

    this.employeeListHeading = this.page.getByText("Employee Information");
    this.addButton = this.page.getByRole("button", { name: "Add" });
    
  }

  async expectEmployeeListToBeVisible(): Promise<void> {
    await this.waitForVisible(this.employeeListHeading);
    this.logInfo("Employee List page is visible");
  }

  async clickAddEmployee(): Promise<AddEmployeePage> {
    await this.click(this.addButton);
    this.logInfo("Clicked Add Employee button");
    return new AddEmployeePage(this.page);
  }
}