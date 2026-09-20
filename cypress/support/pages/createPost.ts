class BuzzPage {
  static LOCATORS = {
    postInput: "textarea",
    postBtn: '[type="submit"]',
  };

  static visit() {
    cy.intercept("GET", "**/buzz/viewBuzz").as("visitBuzz");
    cy.get("a[href='/web/index.php/buzz/viewBuzz']").click();
    cy.wait("@visitBuzz").its("response.statusCode").should("eq", 200);
  }

  static writePost(value: string) {
    cy.get(this.LOCATORS.postInput).type(value);
  }

  static submitPost() {
    cy.get(this.LOCATORS.postBtn).click();
  }
}

export default BuzzPage;
