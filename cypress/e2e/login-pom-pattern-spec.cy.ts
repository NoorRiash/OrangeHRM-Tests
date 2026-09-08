import LoginPage from "@cypress/pages/loginPage";
describe("OrangeHRM login test", function () {
  it("TC025: valid login test", () => {
    const loginObject=new LoginPage();
    loginObject.visit();
    loginObject.fillUserName("Admin");
    loginObject.fillPassword("admin123");
    loginObject.submit();
    cy.url().should("eq","https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
  });
});
