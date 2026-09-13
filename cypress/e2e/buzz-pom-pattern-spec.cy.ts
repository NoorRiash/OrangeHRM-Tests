import CreatePost from "@cypress/support/pages/createPost";
import LoginPage from "@cypress/support/pages/loginPage";

describe("OrangeHRM create post test", function () {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.fillUserName("Admin");
    LoginPage.fillPassword("admin123");
    LoginPage.submit();
  });

  it("TC026: Create a post using fixture", () => {
    CreatePost.visit();
    cy.intercept("POST", "**/api/v2/buzz/posts").as("postRequest");
    cy.fixture("post").then((data) => {
      CreatePost.writePost(data.postText);
      CreatePost.submitPost();
    });
  });
});
