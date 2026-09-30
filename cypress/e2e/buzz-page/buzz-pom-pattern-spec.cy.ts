import BuzzPage from "@cypress/support/pages/create-post";
import LoginPage from "@cypress/support/pages/login-page";

describe("OrangeHRM - Buzz Page - Create Posts Cases", function () {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.fillUserName("Admin");
    LoginPage.fillPassword("admin123");
    LoginPage.submit();
  });

  it("TC026: Create a post using fixture", () => {
    BuzzPage.visit();
    cy.intercept("POST", "**/api/v2/buzz/posts").as("postRequest");
    cy.fixture("post").then((data) => {
      BuzzPage.writePost(data.postText);
      BuzzPage.submitPost();
      cy.wait("@postRequest").its("response.statusCode").should("eq", 200);
    });
  });
});
