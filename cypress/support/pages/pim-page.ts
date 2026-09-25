import ApiHelper from "@cypress/support/helpers/api-helper";
import ElementHandler from "@cypress/support/helpers/element-handler";

class PimPage {
  static LOCATORS = {
    firstNameLocator: ".orangehrm-firstname",
    middleNameLocator: ".orangehrm-middlename",
    lastNameLocator: ".orangehrm-lastname",
    passwordLocator: "input[type='password']",
    inputField: ".oxd-input",
    inputFieldGroup: ".oxd-input-group",
    menuItems: ".oxd-main-menu-item--name",
    saveButtonAtAddEmployeePage: ".oxd-button",
    profilePictureLocator: ".oxd-icon.bi-plus",
    profilePictureInput: "input[type='file']",
    attachmentInput: "input[type='file']",
    saveButton: "button[type='submit']",
    attachmentActions: ".oxd-table-cell-action-space",
  };

  static visitPimPage() {
    ApiHelper.interceptRequest("GET", "**/pim/viewPimModule", "checkLoad1");
    ApiHelper.interceptRequest("GET", "**/pim/viewEmployeeList", "checkLoad2");
    ElementHandler.click({ selector: this.LOCATORS.menuItems, index: 1 });
    ApiHelper.waitForRequests([
      { alias: "@checkLoad1", statusCode: 302 },
      { alias: "@checkLoad2", statusCode: 200 },
    ]);
  }

  static clickOnAddEmp() {
    ApiHelper.interceptRequest("GET", "**/pim/addEmployee", "checkLoad");
    ElementHandler.click({
      selector: ".orangehrm-header-container",
      findSelector: '[type="button"]',
    });
    cy.get(".oxd-loading-spinner").should("not.exist");
    ApiHelper.waitForRequests([{ alias: "@checkLoad", statusCode: 200 }]);
  }

  static fillAllName(firstName: string, middleName: string, lastName: string) {
    ElementHandler.type({
      selector: this.LOCATORS.firstNameLocator,
      value: firstName,
    });
    ElementHandler.type({
      selector: this.LOCATORS.middleNameLocator,
      value: middleName,
    });
    ElementHandler.type({
      selector: this.LOCATORS.lastNameLocator,
      value: lastName,
    });
  }

  static fillEmpId(val: string) {
    ElementHandler.click({
      selector: this.LOCATORS.inputField,
      index: 4,
      flag: "1",
    });
    ElementHandler.type({
      selector: this.LOCATORS.inputField,
      index: 4,
      value: val,
    });
  }

  static fillUsername(username: string) {
    ElementHandler.type({
      selector: this.LOCATORS.inputField,
      index: 5,
      value: username,
    });
  }

  static toggleCreateDetails() {
    ElementHandler.click({ selector: ".oxd-switch-input" });
  }

  static fillPassword(passwordValue: string) {
    ElementHandler.clickThenType({
      selector: this.LOCATORS.inputFieldGroup,
      findSelector: "input[type='password']",
      index: 0,
      value: passwordValue,
    });
    ElementHandler.clickThenType({
      selector: this.LOCATORS.inputFieldGroup,
      findSelector: "input[type='password']",
      index: 1,
      value: passwordValue,
    });
  }

  static status() {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: "Enabled",
    });
  }

  static saveAddEmp() {
    ApiHelper.interceptRequest(
      "GET",
      "**/web/index.php/api/v2/pim/employees",
      "addEmployee",
    );
    ApiHelper.interceptRequest(
      "POST",
      "**/web/index.php/api/v2/admin/users",
      "addUser",
    );

    ElementHandler.click({
      selector: this.LOCATORS.saveButtonAtAddEmployeePage,
      index: 1,
    });
    cy.get(".oxd-loading-spinner").should("not.exist");
    ApiHelper.waitForRequests([
      { alias: "@addEmployee", statusCode: 200 },
      { alias: "@addUser", statusCode: 200 },
    ]);
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  personal details page

  static fillOtherId(id: string) {
    // cy.wait(9000); ///////////////////////// need to fix
    ElementHandler.contain({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: "Other Id",
      findSelector: "input",
      value: id,
    });
  }

  static fillLicenseNumber(val: string) {
    ElementHandler.contain({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: "Driver's License Number",
      findSelector: "input",
      value: val,
    });
  }

  static fillTestField(val: string) {
    ElementHandler.contain({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: "Test_Field",
      findSelector: "input",
      value: val,
    });
  }

  static chooseGender(value: string) {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: value,
    });
  }

  static chooseNationality(value: string) {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: "Nationality",
      findSelector: ".oxd-select-text",
    });
    cy.contains(".oxd-select-option", value).click();
  }

  static maritalStatus(value: string) {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: "Marital Status",
      findSelector: ".oxd-select-text",
    });
    // ElementHandler.click({
    //   selector: ".oxd-select-text",
    //   containsText: "Single",
    // });
    // cy.contains(".oxd-select-option", "Single").click();
    cy.contains("Single").click();
  }

  static selectBloodType(value: string) {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: "Blood Type",
      findSelector: ".oxd-select-text",
    });
    ElementHandler.click({
      selector: ".oxd-select-option",
      containsText: value,
    });

    // cy.contains(".oxd-input-group", "Blood Type")
    //   .find(".oxd-select-text")
    //   .click();

    // cy.contains(".oxd-select-option", "A+").click();

    // cy.contains(".oxd-input-group", "Blood Type")
    //   .find(".oxd-select-text")
    //   .should("contain", "A+");
  }

  static uploadProfilePicture(fileName: string) {
    cy.get(this.LOCATORS.profilePictureLocator).click();

    cy.get(this.LOCATORS.profilePictureInput).selectFile(
      `cypress/fixtures/${fileName}`,
      {
        force: true,
      },
    );
  }

  static uploadAttachment(fileName: string) {
    cy.get(this.LOCATORS.attachmentInput).selectFile(
      `cypress/fixtures/${fileName}`,
      {
        force: true,
      },
    );
  }

  static saveAttachmentFile() {
    cy.get(this.LOCATORS.saveButton).eq(2).click();
  }

  static downloadAttachment() {
    cy.get(this.LOCATORS.attachmentActions).eq(2).click();
  }

  static fillValidDates(date1: string, date2: string) {
    ElementHandler.clickThenType({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: "Date of Birth",
      findSelector: ".oxd-input",
      value: date1,
    });
    ElementHandler.clickThenType({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: "License Expiry Date",
      findSelector: ".oxd-input",
      value: date2,
    });
  }

  static savePersonalDetails() {
    ElementHandler.click({ selector: ".oxd-button--secondary", index: 0 });
    ElementHandler.click({ selector: ".oxd-button--secondary", index: 1 });
  }

  static verifyFirstName(namee: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.firstNameLocator,
      value: namee,
      shouldType: "have.value",
    });
  }

  static verifyMiddleName(namee: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.middleNameLocator,
      value: namee,
      shouldType: "have.value",
    });
  }

  static verifyLastName(namee: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.lastNameLocator,
      value: namee,
      shouldType: "have.value",
    });
  }

  static verifyId(num: string) {
    ElementHandler.assertValue({
      selector: ".oxd-grid-item",
      value: num,
      containsText: "Employee Id",
      findSelector: "input",
      shouldType: "have.value",
    });
  }

  static verifyOtherId(num: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: num,
      containsText: "Other Id",
      findSelector: "input",
      shouldType: "have.value",
    });
  }

  static verifyLicenseNumber(num: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: num,
      containsText: "Driver's License Number",
      findSelector: "input",
      shouldType: "have.value",
    });
  }

  static verifyTestField(num: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: num,
      containsText: "Test_Field",
      findSelector: "input",
      shouldType: "have.value",
    });
  }

  static verifyLicenseExpiryDate(date: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: date,
      containsText: "License Expiry Date",
      findSelector: "input",
      shouldType: "have.value",
    });
  }

  static verifyDateOfBirth(date: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: date,
      containsText: "Date of Birth",
      findSelector: "input",
      shouldType: "have.value",
    });
  }

  static verifyNationality(value: string) {
    cy.contains(".oxd-grid-item", "Nationality").should("contain", "Greek");
  }

  static verifyBloodType(type: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: type,
      containsText: "Blood Type",
      findSelector: ".oxd-select-text",
      shouldType: "contain",
    });
  }

  static verifyMaritalStatus(val: string) {
    ElementHandler.assertValue({
      selector: ".oxd-grid-item",
      value: val,
      containsText: "Marital Status",
      findSelector: ".oxd-select-text",
      shouldType: "contain",
    });
  }

  static verifyGender(value: string) {
    cy.contains(".oxd-radio-wrapper", value)
      .find('input[type="radio"]')
      .should("be.checked");
  }
}

export default PimPage;
