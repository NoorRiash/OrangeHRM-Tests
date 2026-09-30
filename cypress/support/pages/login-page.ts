class LoginPage {
  static LOCATORS = {
    userName: "input[name='username']",
    password: "input[name='password']",
    button: "button[type='submit']",
  };

  static dashboardURL =
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";

  static visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  }

  static fillUserName(value: string) {
    cy.get(this.LOCATORS.userName).type(value);
  }

  static fillPassword(value: string) {
    cy.get(this.LOCATORS.password).type(value);
  }

  static submit() {
    cy.get(this.LOCATORS.button).click();
  }

  static validLogin() {
    cy.url().should("eq", this.dashboardURL);
  }
}

export default LoginPage;
