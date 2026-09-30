import { test } from "../fixtures";
import { env } from "../../config/env";
import employeeData from "../../data/employeeTestData.json";

test.describe("Employee Management Tests", () => {

  test("should add a new employee successfully", async ({ loginPage }) => {
    const dashboardPage = await loginPage.login(
      env.username,
      env.password
    );

    await dashboardPage.expectDashboardToBeVisible();

    const employeeListPage = await dashboardPage.openPIM();

    await employeeListPage.expectEmployeeListToBeVisible();

    const addEmployeePage = await employeeListPage.clickAddEmployee();

    // Add Employee page has loaded
    await addEmployeePage.expectAddEmployeePageToBeVisible();
    await addEmployeePage.enterFirstName(
  employeeData.validEmployee.firstName
);

await addEmployeePage.enterMiddleName(
  employeeData.validEmployee.middleName
);

await addEmployeePage.enterLastName(
  employeeData.validEmployee.lastName
);
const employeeDetailsPage = await addEmployeePage.clickSave();

await employeeDetailsPage.expectPersonalDetailsPageToBeVisible();
  });

  test("should show required validation when first name is empty", async ({ loginPage }) => {
    const dashboardPage = await loginPage.login(
      env.username,
      env.password
    );

    await dashboardPage.expectDashboardToBeVisible();

    const employeeListPage = await dashboardPage.openPIM();

    await employeeListPage.expectEmployeeListToBeVisible();

    const addEmployeePage = await employeeListPage.clickAddEmployee();

    await addEmployeePage.expectAddEmployeePageToBeVisible();

    await addEmployeePage.enterLastName(
      employeeData.validEmployee.lastName
    );

    await addEmployeePage.clickSave();

    await addEmployeePage.expectFirstNameRequiredMessage();
  });


});