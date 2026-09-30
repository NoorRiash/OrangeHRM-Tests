import ApiHelper from "@cypress/support/helpers/api-helper";
import ElementHandler from "@cypress/support/helpers/element-handler";
import CommonHelper from "@cypress/support/helpers/common-helper";

class PimPage {
  static LOCATORS = {
    firstNameLocator: ".orangehrm-firstname",
    middleNameLocator: ".orangehrm-middlename",
    lastNameLocator: ".orangehrm-lastname",
    inputField: ".oxd-input",
    inputFieldGroup: ".oxd-input-group",
    menuItems: ".oxd-main-menu-item--name",
    // saveButtonAtAddEmployeePage: ".oxd-button",
    profilePictureLocator: ".oxd-icon.bi-plus",
    profilePictureInput: "input[type='file']",
    attachmentInput: "input[type='file']",
    saveButton: "button[type='submit']",
    attachmentActions: ".oxd-table-cell-action-space",
    empTable: ".oxd-table.orangehrm-employee-list",
    emplTableRow: ".oxd-table-row",
    empActionIconButton: ".oxd-icon-button",
    empActionButton: ".oxd-button",
    myInfoMenuItem: ".oxd-main-menu-item",
    loadingSpinner: ".oxd-loading-spinner",
    button: '[type="button"]',
    addEmployeeHeader: ".orangehrm-header-container",
    createDetailsSwitch: ".oxd-switch-input",
    passwordInput: "input[type='password']",
    inputSelector: "input",
    selectText: ".oxd-select-text",
    selectOption: ".oxd-select-option",
    radioWrapper: ".oxd-radio-wrapper",
    radioInput: 'input[type="radio"]',
    savePersonalDetailsClickLocator: ".oxd-button--secondary",
    empFieldGroup: ".oxd-grid-item",
    searchClickLocator: ".orangehrm-left-space",
    addAttachmentButton: ".oxd-button--text",
    saveButtonAtAddEmployeePage: "button[type='submit']",
  };

  static TEXT = {
    confirmDelete: "Yes, Delete",
    deleteSuccessMessage: "Successfully Deleted",
    empld: "Employee Id",
    empOtherId: "Other Id",
    myInfo: "My Info",
    enable: "Enabled",
    licenseNumberLabel: "Driver's License Number",
    testFieldLabel: "Test_Field",
    nationalityLabel: "Nationality",
    maritalStatusLabel: "maritalStatus",
    bloodTypeLabel: "Blood Type",
    licenseExpiryDateLabel: "License Expiry Date",
    dateOfBirthLabel: "Date of Birth",
  };

  static ALIASES = {
    myInfoDetails: "myInfoDetails",
    addEmp: "addEmployee",
    addUser: "addUser",
  };

  static ASSERTIONS = {
    haveValue: "have.value",
    beVisible: "be.visible",
    notExist: "not.exist",
    contain: "contain",
    beChecked: "be.checked",
  };

  /**
   * visit the PIM page from the main menu and wait for its API calls to finish
   * @param {string} alias1 - alias for the first intercepted request of the PIM page
   * @param {string} alias2 - alias for the second intercepted request of the PIM page
   */
  static visitPimPage(alias1: string, alias2: string) {
    ApiHelper.interceptVisitPage(alias1, alias2);

    ElementHandler.click({ selector: this.LOCATORS.menuItems, index: 1 });
    ElementHandler.waitLoader();
    ApiHelper.waitVisitPimPage(alias1, alias2);
  }

  /**
   * click on the "Add" button to open the add employee page and wait for its API call
   * @param {string} alias - alias for the intercepted add employee request
   */
  static clickOnAddEmp(alias: string) {
    ApiHelper.interceptAddEmp(alias);
    ElementHandler.click({
      selector: this.LOCATORS.addEmployeeHeader,
      findSelector: this.LOCATORS.button,
    });
    ElementHandler.waitLoader();
    ApiHelper.waitAddEmp(alias);
  }

  /**
   * fill the first, middle and last name fields of the employee
   * @param {string} firstName - the first name of the employee
   * @param {string} middleName - the middle name of the employee
   * @param {string} lastName - the last name of the employee
   */
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

  /**
   * fill the employee id field in the add employee page
   * @param {string} val - the employee id value
   */
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

  /**
   * fill the username field when creating login details for the employee
   * @param {string} username - the username of the employee
   */
  static fillUsername(username: string) {
    ElementHandler.type({
      selector: this.LOCATORS.inputField,
      index: 5,
      value: username,
    });
  }

  /**
   * toggle the "Create Login Details" switch
   */
  static toggleCreateDetails() {
    ElementHandler.click({ selector: this.LOCATORS.createDetailsSwitch });
  }

  /**
   * fill the password and confirm password fields with the same value
   * @param {string} passwordValue - the password to type in both fields
   */
  static fillPassword(passwordValue: string) {
    ElementHandler.clickThenType({
      selector: this.LOCATORS.inputFieldGroup,
      findSelector: this.LOCATORS.passwordInput,
      index: 0,
      value: passwordValue,
    });
    ElementHandler.clickThenType({
      selector: this.LOCATORS.inputFieldGroup,
      findSelector: this.LOCATORS.passwordInput,
      index: 1,
      value: passwordValue,
    });
  }

  /**
   * select the "Enabled" status radio button for the user account
   */
  static selectEnabledStatus() {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.enable,
    });
  }

  /**
   * fill the "Other Id" field in the personal details page
   * @param {string} id - the other id value
   */
  static fillOtherId(id: string) {
    ElementHandler.waitLoader(); ///////////////////////////
    ElementHandler.type({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.empOtherId,
      findSelector: this.LOCATORS.inputSelector,
      value: id,
    });
  }

  /**
   * fill the driver's license number field
   * @param {string} val - the license number
   */
  static fillLicenseNumber(val: string) {
    ElementHandler.type({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.licenseNumberLabel,
      findSelector: this.LOCATORS.inputSelector,
      value: val,
    });
  }

  /**
   * fill the custom "Test_Field" field in the personal details page
   * @param {string} val - the value to type in the test field
   */
  static fillTestField(val: string) {
    ElementHandler.type({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.testFieldLabel,
      findSelector: this.LOCATORS.inputSelector,
      value: val,
    });
  }

  /**
   * choose the gender radio button
   * @param {string} value - the gender label to select (e.g. Male, Female)
   */
  static chooseGender(value: string) {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: value,
    });
  }

  /**
   * choose the nationality from the dropdown list
   * @param {string} value - the nationality name to select
   */
  static chooseNationality(value: string) {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.nationalityLabel,
      findSelector: this.LOCATORS.selectText,
    });
    ElementHandler.click({
      selector: this.LOCATORS.selectOption,
      containsText: value,
    });
  }

  /**
   * choose the marital status from the dropdown list
   * @param {string} value - the marital status to select
   */
  static maritalStatus(value: string) {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.maritalStatusLabel,
      findSelector: this.LOCATORS.selectText,
    });
    cy.contains(value).click();
  }

  /**
   * choose the blood type from the dropdown list
   * @param {string} value - the blood type to select (e.g. A+, O-)
   */
  static selectBloodType(value: string) {
    ElementHandler.click({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.bloodTypeLabel,
      findSelector: this.LOCATORS.selectText,
    });
    ElementHandler.click({
      selector: this.LOCATORS.selectOption,
      containsText: value,
    });
  }

  /**
   * upload a profile picture for the employee
   * @param {string} fileName - the name of the image file inside cypress/fixtures
   */
  static uploadProfilePicture(fileName: string) {
    ElementHandler.click({ selector: this.LOCATORS.profilePictureLocator });
    ElementHandler.selectFile({
      selector: this.LOCATORS.profilePictureInput,
      filePath: `cypress/fixtures/${fileName}`,
      force: true,
    });
  }

  /**
   * select an attachment file to upload
   * @param {string} fileName - the name of the file inside cypress/fixtures
   */
  static uploadAttachment(fileName: string) {
    ElementHandler.click({ selector: this.LOCATORS.addAttachmentButton });
    ElementHandler.selectFile({
      selector: this.LOCATORS.profilePictureInput,
      filePath: `cypress/fixtures/${fileName}`,
      force: true,
    });
  }

  /**
   * click on the save button of the attachment section
   */
  static saveAttachmentFile() {
    ElementHandler.click({ selector: this.LOCATORS.saveButton, index: 2 });
  }

  /**
   * click on the download action of the uploaded attachment
   */
  static downloadAttachment() {
    ElementHandler.click({
      selector: this.LOCATORS.attachmentActions,
      index: 2,
    });
  }

  /**
   * fill the date of birth and the license expiry date fields
   * @param {string} date1 - the date of birth
   * @param {string} date2 - the license expiry date
   */
  static fillValidDates(date1: string, date2: string) {
    ElementHandler.clickThenType({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.dateOfBirthLabel,
      findSelector: this.LOCATORS.inputField,
      value: date1,
    });
    ElementHandler.clickThenType({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.licenseExpiryDateLabel,
      findSelector: this.LOCATORS.inputField,
      value: date2,
    });
  }

  /**
   * click on the save buttons of the personal details sections
   */
  static savePersonalDetails() {
    ElementHandler.click({
      selector: this.LOCATORS.savePersonalDetailsClickLocator,
      index: 0,
    });
    ElementHandler.click({
      selector: this.LOCATORS.savePersonalDetailsClickLocator,
      index: 1,
    });
  }

  /**
   * verify the first name of the employee
   * @param {string} name - the expected first name
   */
  static verifyFirstName(name: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.firstNameLocator,
      value: name,
      shouldType: this.ASSERTIONS.haveValue,
    });
  }

  /**
   * verify the middle name of the employee
   * @param {string} name - the expected middle name
   */
  static verifyMiddleName(name: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.middleNameLocator,
      value: name,
      shouldType: this.ASSERTIONS.haveValue,
    });
  }

  /**
   * verify the last name of the employee
   * @param {string} name - the expected last name
   */
  static verifyLastName(name: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.lastNameLocator,
      value: name,
      shouldType: this.ASSERTIONS.haveValue,
    });
  }

  /**
   * verify the employee id value
   * @param {string} num - the expected employee id
   */
  static verifyId(num: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.empFieldGroup,
      value: num,
      containsText: this.TEXT.empld,
      findSelector: this.LOCATORS.inputField,
      shouldType: this.ASSERTIONS.haveValue,
    });
  }

  /**
   * verify the "Other Id" value of the employee
   * @param {string} num - the expected other id
   */
  static verifyOtherId(num: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: num,
      containsText: this.TEXT.empOtherId,
      findSelector: this.LOCATORS.inputField,
      shouldType: this.ASSERTIONS.haveValue,
    });
  }

  /**
   * verify the driver's license number of the employee
   * @param {string} num - the expected license number
   */
  static verifyLicenseNumber(num: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: num,
      containsText: this.TEXT.licenseNumberLabel,
      findSelector: this.LOCATORS.inputField,
      shouldType: this.ASSERTIONS.haveValue,
    });
  }

  /**
   * verify the value of the custom "Test_Field" field
   * @param {string} num - the expected value of the test field
   */
  static verifyTestField(num: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: num,
      containsText: this.TEXT.testFieldLabel,
      findSelector: this.LOCATORS.inputField,
      shouldType: this.ASSERTIONS.haveValue,
    });
  }

  /**
   * verify the license expiry date of the employee
   * @param {string} date - the expected license expiry date
   */
  static verifyLicenseExpiryDate(date: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: date,
      containsText: this.TEXT.licenseExpiryDateLabel,
      findSelector: this.LOCATORS.inputField,
      shouldType: this.ASSERTIONS.haveValue,
    });
  }

  /**
   * verify the date of birth of the employee
   * @param {string} date - the expected date of birth
   */
  static verifyDateOfBirth(date: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: date,
      containsText: this.TEXT.dateOfBirthLabel,
      findSelector: this.LOCATORS.inputField,
      shouldType: this.ASSERTIONS.haveValue,
    });
  }

  /**
   * verify the nationality of the employee
   * @param {string} val - the expected nationality
   */
  static verifyNationality(val: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.empFieldGroup,
      containsText: this.TEXT.nationalityLabel,
      shouldType: this.ASSERTIONS.contain,
      value: val,
    });
  }

  /**
   * verify the blood type of the employee
   * @param {string} type - the expected blood type
   */
  static verifyBloodType(type: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.inputFieldGroup,
      value: type,
      containsText: this.TEXT.bloodTypeLabel,
      findSelector: this.LOCATORS.selectText,
      shouldType: this.ASSERTIONS.contain,
    });
  }

  /**
   * verify the marital status of the employee
   * @param {string} val - the expected marital status
   */
  static verifyMaritalStatus(val: string) {
    ElementHandler.assertValue({
      selector: this.LOCATORS.empFieldGroup,
      value: val,
      containsText: this.TEXT.maritalStatusLabel,
      findSelector: this.LOCATORS.selectText,
      shouldType: this.ASSERTIONS.contain,
    });
  }

  /**
   * verify the selected gender radio button of the employee
   * @param {string} val - the expected gender
   */
  static verifyGender(val: string) {
    ElementHandler.assertValue({
      containsText: this.LOCATORS.radioWrapper,
      value: val,
      findSelector: this.LOCATORS.radioInput,
      shouldType: this.ASSERTIONS.beChecked,
    });
  }

  /**
   * search for an employee by id in the employee list, then delete him from the table
   * @param {string} idTem - the employee id to search for
   */
  static findEmpById(idTem: string) {
    ElementHandler.type({
      selector: this.LOCATORS.inputFieldGroup,
      containsText: this.TEXT.empld,
      value: idTem,
    });
    ElementHandler.click({ selector: this.LOCATORS.searchClickLocator });

    let element = ElementHandler.findElement({
      selector: this.LOCATORS.empTable,
      findSelector: this.LOCATORS.emplTableRow,
      eqIndex: 1,
    });
    this.deleteEmpFromTable(element);
  }

  /**
   * delete an employee from the table, confirm the deletion and verify the success message
   * @param {Cypress.Chainable<JQuery<HTMLElement>>} element - the employee row element in the table
   */
  static deleteEmpFromTable(element: Cypress.Chainable<JQuery<HTMLElement>>) {
    ElementHandler.click({ selector: this.LOCATORS.empActionButton, index: 1 });
    ElementHandler.click({
      selector: this.LOCATORS.empActionButton,
      containsText: this.TEXT.confirmDelete,
    });
    ElementHandler.assertValue({
      value: this.TEXT.deleteSuccessMessage,
      shouldType: this.ASSERTIONS.beVisible,
    });
  }

  /**
   * click on save in the add employee page and wait for the save API calls
   * @param {string} alias1 - alias for the create employee request
   * @param {string} alias2 - alias for the create user request
   */
  static saveAddEmp(alias1: string, alias2: string) {
    ApiHelper.interceptSaveAddEmp(alias1, alias2);
    cy.get(this.LOCATORS.saveButtonAtAddEmployeePage).should("be.enabled");
    ElementHandler.click({
      selector: this.LOCATORS.saveButtonAtAddEmployeePage,
    });
    ApiHelper.waitSaveAddEmp(alias1, alias2);
    ElementHandler.waitLoader();
  }

  /**
   * go to the "My Info" page from the main menu and wait for its API call
   * @param {string} alias - alias for the intercepted my info request
   */
  static goToMyInfoPage(alias: string) {
    ApiHelper.interceptGoToMyInfoPage(alias);

    ElementHandler.click({
      selector: this.LOCATORS.myInfoMenuItem,
      containsText: this.TEXT.myInfo,
    });
    ElementHandler.waitLoader();
    ApiHelper.waitGoToMyInfoPage(alias);
  }
}

export default PimPage;
