import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import EmployeeListPage from "./EmployeeListPage";
import EmployeeDetailsPage from "./EmployeeDetailsPage";

export default class AddEmployeePage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly middleNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly employeeIdInput: Locator;
  private readonly saveButton: Locator;
  private readonly addEmployeeHeading: Locator;
  private readonly firstNameRequiredMessage: Locator;
  
  constructor(page: Page) {
    super(page);

    this.firstNameInput = this.page.getByPlaceholder("First Name");
    this.middleNameInput = this.page.getByPlaceholder("Middle Name");
    this.lastNameInput = this.page.getByPlaceholder("Last Name");
    this.employeeIdInput = this.page.locator("input").nth(4);
    this.saveButton = this.page.getByRole("button", { name: "Save" });
    this.addEmployeeHeading = this.page.locator("h6.orangehrm-main-title");
    this.firstNameRequiredMessage = this.page
  .locator("input[placeholder='First Name']")
  .locator("xpath=ancestor::div[contains(@class,'oxd-input-group')]")
  .getByText("Required", { exact: true });
    
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.fill(this.firstNameInput, firstName);
  }

  async enterMiddleName(middleName: string): Promise<void> {
    await this.fill(this.middleNameInput, middleName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.fill(this.lastNameInput, lastName);
  }

  async enterEmployeeId(employeeId: string): Promise<void> {
    await this.fill(this.employeeIdInput, employeeId);
  }

  async clickSave(): Promise<EmployeeDetailsPage> {
  await this.click(this.saveButton);
  this.logInfo("Saved employee");

  return new EmployeeDetailsPage(this.page);
}
 
  async expectAddEmployeePageToBeVisible(): Promise<void> {
  await this.waitForVisible(this.addEmployeeHeading);
  this.logInfo("Add Employee page is visible");
  }
  async expectFirstNameRequiredMessage(): Promise<void> {
  await this.waitForVisible(this.firstNameRequiredMessage);
  await this.expectText(this.firstNameRequiredMessage, "Required");
  this.logInfo("First Name required validation is displayed");
}
}