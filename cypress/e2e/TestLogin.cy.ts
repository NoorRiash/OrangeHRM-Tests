
// check login 

describe("OrangeHRM login test", function (){

  beforeEach(()=> {cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")})

  //1
  it("TC001: valid username & valid password", ()=> {
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.url().should("include","dashboard/index")
  })

  //2
  it("TC002: invalid username & invalid password", ()=> {
    cy.get("input[name='username']").type("wrong username")
    cy.get("input[name='password']").type("wrong password")
    cy.get("button[type='submit']").click()

    cy.get(".oxd-alert-content-text")
    .should("have.text","Invalid credentials")
  })

  //3
  it("TC003: invalid username & valid password", ()=> {
    cy.get("input[name='username']").type("wrong username")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.get(".oxd-alert-content-text")
    .should("have.text","Invalid credentials")
  })

  //4
  it("TC004: valid username & invalid password", ()=> {
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("wrong password")
    cy.get("button[type='submit']").click()

    cy.get(".oxd-alert-content-text")
    .should("have.text","Invalid credentials")
  })

  //5
  it("TC005: empty username & valid password", ()=> {
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()
    cy.get(".oxd-input-group.oxd-input-field-bottom-space").eq(0).should("contain","Required")
  })

  //6
  it("TC006: valid username & empty password", ()=> {
    cy.get("input[name='username']").type("Admin")
    cy.get("button[type='submit']").click()
    cy.get(".oxd-input-group.oxd-input-field-bottom-space").eq(1).should("contain","Required")
  })

  //7
  it("TC007: empty username & empty password", ()=> {
    cy.get("button[type='submit']").click()
    cy.get(".oxd-input-group.oxd-input-field-bottom-space").first().should("contain","Required")
    cy.get(".oxd-input-group.oxd-input-field-bottom-space").eq(1).should("contain","Required")
  })


})