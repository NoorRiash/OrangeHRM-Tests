describe("writing post test", () => {
  
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
  });  

  it("TC008: Create a post using fixture", () => {
    cy.get("a[href='/web/index.php/buzz/viewBuzz']").click();
    cy.intercept("POST", "**/api/v2/buzz/posts").as("postRequest");

    cy.fixture("post").then((data)=> { 
    cy.get("textarea").type(data.postText);
    cy.get("button[type='submit'].oxd-button--main").click();
    cy.wait("@postRequest").its("response.statusCode").should("eq", 200);
    cy.reload();
    cy.get(".orangehrm-buzz-post-body-text").contains(data.postText).should("be.visible");
    });
  });
});