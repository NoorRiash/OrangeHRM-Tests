import LoginPage from "@cypress/support/pages/login-page";
describe("OrangeHRM login test", function () {
  it("TC025: valid login test", () => {
    LoginPage.visit();
    LoginPage.fillUserName("Admin");
    LoginPage.fillPassword("admin123");
    cy.intercept("POST", "**auth/validate").as("postRequest");
    LoginPage.submit();
    cy.wait("@postRequest").its("response.statusCode").should("eq", 302);
    LoginPage.validLogin();
  });
});
