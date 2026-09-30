import { test as base, expect as baseExpect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await use(loginPage);
  },
});

export const expect = baseExpect;

export default test;
