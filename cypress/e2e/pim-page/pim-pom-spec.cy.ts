import PimPage from "@cypress/support/pages/pim-page";
import ElementHandler from "@cypress/support/helpers/element-handler";
import CommonHelper from "@cypress/support/helpers/common-helper";
import { CONSTANTS } from "@cypress/support/helpers/constants-helper";
import ApiHelper from "@cypress/support/helpers/api-helper";

describe("migrate pim to pom", function () {
  let usernameTem = "";
  let idTem = "";

  beforeEach(() => {
    cy.login(CONSTANTS.adminUsername, CONSTANTS.adminPassword);
    PimPage.visitPimPage();
    PimPage.clickOnAddEmp();
  });

  afterEach(() => {
    cy.login(CONSTANTS.adminUsername, CONSTANTS.adminPassword);
    PimPage.visitPimPage();
    ElementHandler.type({
      selector: PimPage.LOCATORS.inputFieldGroup,
      containsText: "Employee Id",
      value: idTem,
    });
    ElementHandler.click({ selector: ".orangehrm-left-space" });
    let element = cy
      .get(".oxd-table.orangehrm-employee-list")
      .find(".oxd-table-row")
      .eq(1);
    element.find(".oxd-icon-button").eq(1).click();
    cy.contains("button", "Yes, Delete").click();
    cy.contains("Successfully Deleted").should("be.visible");
    cy.reload();
  });

  let date1 = "2000-08-08";
  let date2 = "2020-08-10";

  it("TC023: fill all valid personal details and log out from admin account then log in with the new one", () => {
    cy.fixture("pimPageData").then((data) => {
      PimPage.fillAllName(data.firstName, data.middleName, data.lastName);
      data.empId = CommonHelper.generateRandomEmployeeId();
      idTem = data.empId;
      PimPage.fillEmpId(idTem);
      PimPage.toggleCreateDetails();
      data.userName = CommonHelper.generateRandomUsername();
      usernameTem = data.userName;
      PimPage.fillUsername(usernameTem);
      PimPage.status();
      PimPage.fillPassword(data.password);
      PimPage.uploadProfilePicture("profilePic.jpg");
      PimPage.saveAddEmp();
    });

    /////////fill personal details

    cy.fixture("pimPageFillPersonalDetails").then((data) => {
      PimPage.fillOtherId(data.otherId);
      PimPage.fillLicenseNumber(data.licenseNumber);
      PimPage.fillTestField(data.testField);
      PimPage.chooseGender("Female");
      PimPage.chooseNationality("Greek");
      PimPage.maritalStatus("Single");
      PimPage.selectBloodType("A+");
      PimPage.fillValidDates(date1, date2);
      cy.get(".oxd-button--text").click();
      PimPage.uploadAttachment("orangeHRM.xlsx");
      PimPage.saveAttachmentFile();
      PimPage.downloadAttachment();
      PimPage.savePersonalDetails();
    });

    cy.logout();

    cy.fixture("pimPageData").then((data) => {
      cy.login(usernameTem, data.password);
      //go to my info
      ApiHelper.interceptRequest("GET", "**/personal-details", "myInfoDetails");
      ElementHandler.click({
        selector: ".oxd-main-menu-item",
        containsText: "My Info",
      });

      cy.get(".oxd-loading-spinner").should("not.exist");
      ApiHelper.waitForRequests([{ alias: "@myInfoDetails", statusCode: 200 }]);

      //verify full name
      PimPage.verifyFirstName(data.firstName);
      PimPage.verifyMiddleName(data.middleName);
      PimPage.verifyLastName(data.lastName);

      PimPage.verifyId(idTem);
    });

    cy.fixture("pimPageFillPersonalDetails").then((data) => {
      PimPage.verifyOtherId(data.otherId);
      PimPage.verifyLicenseNumber(data.licenseNumber);
      PimPage.verifyTestField(data.testField);
      PimPage.verifyLicenseExpiryDate(date2);
      PimPage.verifyDateOfBirth(date1);
      PimPage.verifyNationality("Greek");
      PimPage.verifyMaritalStatus("Single");
      PimPage.verifyGender("Female");
      PimPage.verifyBloodType("A+");
    });
    cy.logout();
  });
});
