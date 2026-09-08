class LoginPage {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  }

  fillUserName(value:any) {
    const userName = cy.get("input[name='username']");
    userName.type(value);
    return this;
  }

  fillPassword(value:any) {
    const password = cy.get("input[name='password']");
    password.type("admin123");
    return this;
  }

  submit() {
    const button = cy.get("button[type='submit']");
    button.click();
    return this;
  }
}

export default LoginPage;
