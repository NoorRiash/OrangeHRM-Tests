class LoginPage {
  static userName = "input[name='username']";
  static password = "input[name='password']";
  static button = "button[type='submit']";
  static dashbordURL =
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";

  static visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  }

  static fillUserName(value: string) {
    cy.get(this.userName).type(value);
  }

  static fillPassword(value: string) {
    cy.get(this.password).type(value);
  }

  static submit() {
    cy.get(this.button).click();
  }

  static validation() {
    cy.url().should("eq", this.dashbordURL);
  }
}

export default LoginPage;
