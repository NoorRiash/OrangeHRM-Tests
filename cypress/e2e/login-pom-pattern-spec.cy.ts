import LoginPage from "@cypress/support/pages/loginPage";
describe("OrangeHRM login test", function () {
  it("TC025: valid login test", () => {
    LoginPage.visit();
    LoginPage.fillUserName("Admin");
    LoginPage.fillPassword("admin123");
    LoginPage.submit();
    LoginPage.validation();
  });
});
