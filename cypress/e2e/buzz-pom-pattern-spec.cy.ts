import createPost from "@cypress/pages/createPost";
import LoginPage from "@cypress/pages/loginPage";

describe("OrangeHRM create post test", function () {
  beforeEach(() => {
    const loginObject = new LoginPage();
    loginObject.visit();
    loginObject.fillUserName("Admin");
    loginObject.fillPassword("admin123");
    loginObject.submit();
  });

  it("TC026: Create a post using fixture", () => {
    const createPostObject = new createPost();
    createPostObject.visit();
    cy.intercept("POST", "**/api/v2/buzz/posts").as("postRequest");
    cy.fixture("post").then((data) => {
      createPostObject.writePost(data.postText);
      createPostObject.submitPost();
      cy.wait("@postRequest").its("response.statusCode").should("eq", 200);
      cy.get(".orangehrm-buzz-post-body-text")
        .contains(data.postText)
        .should("be.visible");
    });
  });
});
