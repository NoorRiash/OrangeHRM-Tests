let userN = "";
let temId = "";

function addRandomDigits() {
  cy.wait(2000);
  cy.contains(".oxd-input-group", "Employee Id").then(($x) => {
    const errorMsg = $x.find(".oxd-input-field-error-message");
    if (
      errorMsg.length > 0 &&
      errorMsg.text().includes("Employee Id already exists")
    ) {
      const ch = Math.floor(Math.random() * 10).toString();
      cy.wrap($x)
        .find("input")
        .type(ch)
        .then(() => {
          temId += ch;
          cy.wait(5000);
          addRandomDigits();
        });
    }
  });
}

function addRandomCharacter() {
  const characters = "abcdefghij";
  cy.get(".oxd-button.oxd-button--medium").eq(1).click();
  cy.wait(2000);
  cy.contains(".oxd-input-group", "Username").then(($x) => {
    const errorMsg = $x.find(".oxd-input-field-error-message");
    if (
      errorMsg.length > 0 &&
      errorMsg.text().includes("Username already exists")
    ) {
      const ch = characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
      cy.wrap($x).find("input").click().type(ch);
      userN += ch;
      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      addRandomCharacter();
    }
  });
}

let date1 = "2000-08-08";
let date2 = "2020-08-10";
function fillValidDates() {
  cy.contains(".oxd-input-group", "Date of Birth")
    .find(".oxd-input")
    .type(date2);
  cy.contains(".oxd-input-group", "License Expiry Date")
    .find(".oxd-input")
    .type(date1);
}

function doo() {
  cy.get(".oxd-switch-input.oxd-switch-input--active").click(); // to create log in details
  cy.get(".oxd-label.oxd-input-field-required").eq(1).should("be.visible"); //just for validation
  cy.get(".oxd-input-group.oxd-input-field-bottom-space").eq(6).click(); //enabel
  // cy.get("oxd-input-group.oxd-input-field-bottom-space").eq(7).click(); //disable
}

function validEmpInfo() {
  cy.fixture("task3Data").then((data) => {
    cy.get(".orangehrm-firstname").click().type(data.firstName);
    cy.get(".orangehrm-middlename").click().type(data.middleName);
    cy.get(".orangehrm-lastname").click().type(data.lastName);

    cy.get(".oxd-input.oxd-input--active")
      .eq(3)
      .click()
      .clear()
      .type(data.empId);
    addRandomDigits();
    doo();
    cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);
    addRandomCharacter();

    cy.get(".oxd-input-group.oxd-input-field-bottom-space")
      .find("input[type='password']")
      .eq(0)
      .type(data.password);

    cy.get(".oxd-input-group.oxd-input-field-bottom-space")
      .find("input[type='password']")
      .eq(1)
      .type(data.password);

    //////////////////validation

    // cy.intercept("GET","**/pim/viewPersonalDetails**").as( //2
    //   "personalDetails",
    // );
    cy.get(".oxd-button.oxd-button--medium").eq(1).click(); // save
    cy.wait(5000);
    // cy.wait("@personalDetails").its("response.statusCode").should("eq", 200);

    //   //   cy.get(".orangehrm-tabs-wrapper").should("have.length", 10); //1

    // cy.url().should("include", "/pim/viewPersonalDetails/empNumber/"); // smth went wrong //3
  });
}

function fillPersonalDetails() {
  cy.fixture("task3FillPersonalDetails").then((data) => {
    cy.contains(".oxd-input-group", "Other Id")
      .find("input")
      .type(data.otherId);

    cy.contains(".oxd-input-group", "Driver's License Number")
      .find("input")
      .type(data.licenseNumber);

    cy.contains(".oxd-input-group", "Test_Field")
      .find("input")
      .type(data.testField);

    cy.contains(".oxd-radio-wrapper", "Female")
      .click()
      .find('input[type="radio"]')
      .should("be.checked");

    cy.contains(".oxd-input-group", "Nationality")
      .find(".oxd-select-text")
      .click();

    cy.contains(".oxd-select-option", "Greek").click();
    cy.contains(".oxd-input-group", "Nationality")
      .find(".oxd-select-text")
      .should("contain", "Greek");

    cy.contains(".oxd-input-group", "Marital Status")
      .find(".oxd-select-text")
      .click();

    cy.contains(".oxd-select-option", "Single").click();

    cy.contains(".oxd-input-group", "Marital Status")
      .find(".oxd-select-text")
      .should("contain", "Single");

    cy.contains(".oxd-input-group", "Blood Type")
      .find(".oxd-select-text")
      .click();

    cy.contains(".oxd-select-option", "A+").click();

    cy.contains(".oxd-input-group", "Blood Type")
      .find(".oxd-select-text")
      .should("contain", "A+");
  });
}

describe("create new account on website", () => {
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
    cy.get(
      ".orangehrm-header-container>.oxd-button.oxd-button--medium.oxd-button--secondary[type='button']",
    ).click();
    cy.url().should(
      "eq",
      "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee",
    );
  });

  it("TC009: trying to add employee with empty first name", () => {
    cy.fixture("task3Data").then((data) => {
      // cy.get(".oxd-input oxd-input--active.orangehrm-firstname").click().type(data.fistName);
      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active")
        .eq(3)
        .click()
        .clear()
        .type(data.empId);
      addRandomDigits(); // fix id

      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);
      addRandomCharacter();

      //   cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.password); // i don't know what's going on
      //   cy.get(".oxd-input.oxd-input--active").eq(6).click().type(data.password);

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type(data.password);

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type(data.password);

      cy.get(".oxd-button.oxd-button--medium").eq(1).click(); // save
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(1)
        .find(".oxd-input-field-error-message")
        .should("contain", "Required");
    });
  });

  it("TC010: trying to add employee with empty last name", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);
      // cy.get("oxd-input oxd-input--active.orangehrm-lastname").click().type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits(); // fix id

      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type(data.password);

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type(data.password);

      cy.get(".oxd-button.oxd-button--medium").eq(1).click(); // save
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(3)
        .find(".oxd-input-field-error-message")
        .should("contain", "Required");
    });
  });

  //5 3
  it("TC011: trying to add employee with empty middle name", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);
      //   cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
      //     .click()
      //     .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits(); // fix id

      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);
      addRandomCharacter();

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type(data.password);

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type(data.password);

      //////////////////validation

      //   cy.intercept("GET","**/pim/viewPersonalDetails**").as( //2
      //     "personalDetails",
      //   );
      //   cy.get(".oxd-button.oxd-button--medium").eq(1).click(); // save
      //   cy.wait("@personalDetails").its("response.statusCode").should("eq", 200);

      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      //   cy.get(".orangehrm-tabs-wrapper").should("have.length", 10); //1
      //   cy.url().should("include", "/pim/viewPersonalDetails/empNumber/"); smth went wrong //3
    });
  });

  it("TC012: trying to add employee with invalid username (less than 5 characters)", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits();

      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type("a");

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type(data.password);

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type(data.password);

      //save
      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(5)
        .find(".oxd-input-field-error-message")
        .should("have.text", "Should be at least 5 characters");
    });
  });

  it("TC013: trying to add employee with less than (7 charactes) password ", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits();

      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);
      addRandomCharacter();

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type("11");

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type("11");

      //save
      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(8)
        .find(".oxd-input-field-error-message")
        .should("have.text", "Should have at least 7 characters");
    });
  });

  it("TC014: trying to add employee with empty password ", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits();

      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);
      addRandomCharacter();

      //save
      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(8)
        .find(".oxd-input-field-error-message")
        .should("have.text", "Required");
    });
  });

  it("TC015: trying to add employee with more than (6 charactes) password and all of them are digits", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits();

      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);
      addRandomCharacter();

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type("1111111");

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type("1111111");

      //save
      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(8)
        .find(".oxd-input-field-error-message")
        .should(
          "have.text",
          "Your password must contain minimum 1 lower-case letter",
        );
    });
  });

  it("TC016: trying to add employee with more than (6 charactes) password and all of them are characters", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits();

      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);
      addRandomCharacter();

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type("aaaaaaa");

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type("aaaaaaa");

      //save
      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(8)
        .find(".oxd-input-field-error-message")
        .should("have.text", "Your password must contain minimum 1 number");
    });
  });

  it("TC017: trying to add employee with mismatched password", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits();

      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);
      addRandomCharacter();

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type(data.password);

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type(data.password + "1");

      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(9)
        .should("contain", "Passwords do not match");
    });
  });

  it("TC018: trying to add employee with empty username", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits();

      doo();

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type(data.password);

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type(data.password);

      //save
      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(5)
        .find(".oxd-input-field-error-message")
        .should("have.text", "Required");
    });
  });

  it("TC019: trying to add employee with all valid fields", () => {
    validEmpInfo();
  });

  it("TC020: trying to add employee with more than (6 charactes) password and all of them are digits and upper-case letter ", () => {
    cy.fixture("task3Data").then((data) => {
      cy.get(".oxd-input.oxd-input--active.orangehrm-firstname")
        .click()
        .type(data.firstName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-middlename")
        .click()
        .type(data.middleName);

      cy.get(".oxd-input.oxd-input--active.orangehrm-lastname")
        .click()
        .type(data.lastName);

      cy.get(".oxd-input.oxd-input--active").eq(3).click().type(data.empId);
      addRandomDigits();
      doo();

      cy.get(".oxd-input.oxd-input--active").eq(5).click().type(data.userName);
      addRandomCharacter();

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(0)
        .type("1111111A");

      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .find("input[type='password']")
        .eq(1)
        .type("1111111A");

      //save
      cy.get(".oxd-button.oxd-button--medium").eq(1).click();
      cy.get(".oxd-input-group.oxd-input-field-bottom-space")
        .eq(8)
        .find(".oxd-input-field-error-message")
        .should(
          "have.text",
          "Your password must contain minimum 1 lower-case letter",
        );
    });
  });

  it("TC021: fill personal details with multiple License Expiry Date", () => {
    validEmpInfo();
    fillPersonalDetails();
    let cnt = 0;

    cy.fixture("task3LicenseDate").then(
      (data: { licenseExpiryDate: string }[]) => {
        // i'll try just a few test cases (not all of them) first 3 contain invalid data
        data.forEach((element) => {
          cy.contains(".oxd-input-group", "License Expiry Date")
            .find('input[placeholder="yyyy-dd-mm"]')
            .clear()
            .type(element.licenseExpiryDate);
          cy.get(".oxd-button--secondary").eq(0).click(); //save1
          cy.wait(1000);
          if (cnt < 3) {
            cy.contains(".oxd-input-group", "License Expiry Date").should(
              "contain.text",
              "Should be a valid date in yyyy-dd-mm format",
            );
          } else {
            cy.contains(".oxd-input-group", "License Expiry Date").should(
              "not.contain.text",
              "Should be a valid date in yyyy-dd-mm format",
            );
          }
          cnt++;
        });
      },
    );
  });

  it("TC022: fill personal details with multiple Date Birth Date", () => {
    validEmpInfo();
    fillPersonalDetails();
    let cnt = 0;

    cy.fixture("task3BirthDate").then((data: { birthDate: string }[]) => {
      // i'll try just a few test cases (not all of them) first 3 contain invalid data
      data.forEach((element) => {
        cy.contains(".oxd-input-group", "Date of Birth")
          .find('input[placeholder="yyyy-dd-mm"]')
          .clear()
          .type(element.birthDate);
        cy.get(".oxd-button--secondary").eq(0).click(); //save1
        cy.wait(1000);
        if (cnt < 3) {
          cy.contains(".oxd-input-group", "Date of Birth").should(
            "contain.text",
            "Should be a valid date in yyyy-dd-mm format",
          );
        } else {
          cy.contains(".oxd-input-group", "Date of Birth").should(
            "not.contain.text",
            "Should be a valid date in yyyy-dd-mm format",
          );
        }
        cnt++;
      });
    });
  });

  it("TC023: fill all valid personal details and log out from admin account then log in with the new one", () => {
    validEmpInfo();
    fillPersonalDetails();
    fillValidDates();

    cy.get(".oxd-button--secondary").eq(0).click(); //save1
    cy.wait(1000);
    cy.get(".oxd-button--secondary").eq(1).click(); //save2

    cy.get(".oxd-userdropdown-tab").click();
    cy.get("a[href='/web/index.php/auth/logout']").click();

    cy.fixture("task3Data").then((data) => {
      let userName = data.userName;
      cy.get("input[name='username']").type(userName + userN);
      cy.get("input[name='password']").type(data.password);
      cy.get("button[type='submit']").click();
      //   cy.url().should("include", "/dashboard/");
    });
  });

  it("TC024: Verify that all employee information was saved correctly", () => {
    validEmpInfo();
    fillPersonalDetails();
    fillValidDates();
    cy.get(".oxd-button--secondary").eq(0).click(); //save1
    cy.wait(1000);
    cy.get(".oxd-button--secondary").eq(1).click(); //save2

    cy.get(".oxd-userdropdown-tab").click();
    cy.get("a[href='/web/index.php/auth/logout']").click();

    cy.fixture("task3Data").then((data) => {
      let userName = data.userName;
      cy.get("input[name='username']").type(userName + userN);
      cy.get("input[name='password']").type(data.password);
      cy.get("button[type='submit']").click();
      cy.wait(5000);
      cy.url().should("include", "/dashboard/");
    });

    //go to my info
    cy.contains(".oxd-main-menu-item", "My Info").click();

    cy.fixture("task3Data").then((data) => {
      //verify full name
      cy.get(".orangehrm-firstname").should("have.value", data.firstName);
      cy.get(".orangehrm-middlename").should("have.value", data.middleName);
      cy.get(".orangehrm-lastname").should("have.value", data.lastName);

      //verify employee Id
      let value = data.empId + temId;
      cy.contains(".oxd-grid-item", "Employee Id")
        .find("input")
        .should("have.value", value);
    });

    cy.fixture("Task3FillPersonalDetails").then((data) => {
      //verify other Id
      cy.contains(".oxd-grid-item", "Other Id")
        .find("input")
        .should("have.value", data.otherId);
      cy.contains(".oxd-grid-item", "Driver's License Number")
        .find("input")
        .should("have.value", data.licenseNumber);
      cy.contains(".oxd-grid-item", "Test_Field")
        .find("input")
        .should("have.value", data.testField);
    });

    cy.contains(".oxd-grid-item", "License Expiry Date")
      .find("input")
      .should("have.value", date1);
    cy.contains(".oxd-grid-item", "Date of Birth")
      .find("input")
      .should("have.value", date2);

    cy.contains(".oxd-grid-item", "Nationality").should("contain", "Greek");

    cy.contains(".oxd-grid-item", "Marital Status")
      .find(".oxd-select-text")
      .should("contain", "Single");

    cy.contains(".oxd-radio-wrapper", "Female")
      .find('input[type="radio"]')
      .should("be.checked");

    cy.contains(".oxd-input-group", "Blood Type")
      .find(".oxd-select-text")
      .should("contain", "A+");
  });
});
