//Search 



describe("search",()=>{

    beforeEach(() => {
    //1
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    //2
    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();

    //3
    cy.intercept("GET", "**/pim/viewPimModule").as("checkLoad");
    cy.get(".oxd-text.oxd-text--span.oxd-main-menu-item--name").eq(1).click();
    cy.wait("@checkLoad").its("response.statusCode").should("eq", 302);

    //4
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")

    
  });



  //1
  it("all filters are valid and there is at least one user exist", ()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    cy.get(".oxd-input--active").eq(0).type("Admin123")  //username
    cy.get(".oxd-input--active").eq(1).type("Mohamed Helmy")  //employee name   ////////////
    cy.get(".oxd-select-text.oxd-select-text--active").eq(0).click() 
    cy.contains("Admin").click() //user role
    cy.get(".oxd-select-text.oxd-select-text--active").eq(1).click()
    cy.contains("Enabled").click() //status
    cy.contains("Search").click()

    cy.get(".oxd-table-body .oxd-table-row")
    .should("have.length.greaterThan",0)
    .and("contain","Admin123")  

  })

  //2
  it("Verify username search behavior with different letter cases", ()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    cy.get(".oxd-input--active").eq(0).type("admin")  //username
    cy.contains("Search").click()

    cy.get(".oxd-table-body .oxd-table-row")
    .should("have.length.greaterThan",0)
    .and("contain","Admin")  

  })

  //3
  it("Verify user role filter behavior", ()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    cy.get(".oxd-select-text.oxd-select-text--active").eq(0).click() 
    cy.contains("Admin").click() //user role  
    cy.contains("Search").click()

    cy.get(".oxd-table-body .oxd-table-row")
    .should("have.length.greaterThan",0)
  })

  //4
  it("Verify employee name filter behavior", ()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    cy.get(".oxd-input--active").eq(0).type("manda akhil user")  //employee name
    cy.contains("Search").click()

    cy.get(".oxd-table-body .oxd-table-row")
    .should("have.length.greaterThan",0)
  })

  //5
  it("Verify search behavior when an incorrect User Name is selected",()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    cy.get(".oxd-input--active").eq(0).type("sos")  //username
    cy.contains("Search").click()

    cy.get(".oxd-table-body .oxd-table-row")
    .should("not.exist")
  })

  //6
  it("Verify search behavior when an incorrect User Role is selected",()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    cy.get(".oxd-input--active").eq(0).type("Admin")  //username
    cy.get(".oxd-select-text.oxd-select-text--active").eq(0).click() 
    cy.contains("ESS").click() //wrong user role
    cy.contains("Search").click()

    cy.get(".oxd-table-body .oxd-table-row")
    .should("not.exist")
  })

  //7
  it("Verify search behavior when typing incorrect Employee Name",()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    cy.get(".oxd-autocomplete-text-input--active").type("wrong employee name")
    cy.contains("Search").click()

    cy.contains("Invalid").should("be.visible")
    
  })

  //8
  it("Verify search when all filters are empty",()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    cy.contains("Search").click()

    cy.get(".oxd-table-body .oxd-table-row")
    .should("have.length.greaterThan",0)

  })

  //9 
  it("Verify reset button",()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()

    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    cy.get(".oxd-input--active").eq(0).type("Admin")  //username
    cy.get(".oxd-input--active").eq(0).type("emp")  //employee name
    cy.get(".oxd-select-text.oxd-select-text--active").eq(0).click() 
    cy.contains("Admin").click() //user role
    cy.get(".oxd-select-text.oxd-select-text--active").eq(1).click()
    cy.contains("Enabled").click() //status
    cy.contains("Reset").click()

    cy.get(".oxd-table-body .oxd-table-row")
    .should("have.length.greaterThan",0)

    cy.get(".oxd-input--active").eq(0)
    .should("have.value","")

    cy.get(".oxd-input--active").eq(1)
    .should("have.value","")

    cy.get(".oxd-select-text.oxd-select-text--active").eq(0)
    .should("contain","-- Select --")

    cy.get(".oxd-select-text.oxd-select-text--active").eq(1)
    .should("contain","-- Select --")
     
  })


})



