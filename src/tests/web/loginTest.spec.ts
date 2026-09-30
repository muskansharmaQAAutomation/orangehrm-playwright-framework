import { expect, test } from "../fixtures";
import { env } from "../../config/env";

test.describe("OrangeHRM Login Tests", () => {

  test("should login successfully with valid credentials", async ({ loginPage, page }) => {
    const dashboardPage = await loginPage.login(
  env.username,
  env.password
);

await dashboardPage.expectDashboardToBeVisible();
  });

  test("should display error with invalid credentials", async ({ loginPage }) => {
    await loginPage.login(
      "invalid_user",
      "wrong_password"
    );

    const errorText = await loginPage.getLoginErrorMessage();

    expect(errorText.trim()).not.toBe("");
  });

});
