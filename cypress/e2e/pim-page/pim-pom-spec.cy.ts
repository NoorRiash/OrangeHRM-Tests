import PimPage from "@cypress/support/pages/pim-page";
import CommonHelper from "@cypress/support/helpers/common-helper";

describe("PIM (POM) - add employee with login details and fill personal details", function () {
  let usernameTem = "";
  let idTem = "";

  beforeEach(() => {
    cy.login();
    PimPage.visitPimPage("1", "2");
    PimPage.clickOnAddEmp("1");
  });

  afterEach(() => {
    cy.login();
    PimPage.visitPimPage("1", "2");
    PimPage.findEmpById(idTem);
  });

  let date1 = "2000-08-08";
  let date2 = "2020-08-10";

  it("TC023: fill all valid personal details and log out from admin account then log in with the new one", () => {
    cy.fixture("pimPageData").then((empInfo) => {
      PimPage.fillAllName(
        empInfo.firstName,
        empInfo.middleName,
        empInfo.lastName,
      );
      empInfo.empId = CommonHelper.generateRandomEmployeeId();
      idTem = empInfo.empId;
      PimPage.fillEmpId(idTem);
      PimPage.toggleCreateDetails();
      empInfo.userName = CommonHelper.generateRandomUsername();
      usernameTem = empInfo.userName;
      PimPage.fillUsername(usernameTem);
      PimPage.selectEnabledStatus();
      PimPage.fillPassword(empInfo.password);
      PimPage.uploadProfilePicture("profilePic.jpg");
      PimPage.saveAddEmp("1", "2");

      cy.fixture("pimPageFillPersonalDetails").then((empPersonalDetails) => {
        PimPage.fillOtherId(empPersonalDetails.otherId);
        PimPage.fillLicenseNumber(empPersonalDetails.licenseNumber);
        PimPage.fillTestField(empPersonalDetails.testField);
        PimPage.chooseGender(empPersonalDetails.gender);
        PimPage.chooseNationality(empPersonalDetails.nationality);
        PimPage.maritalStatus(empPersonalDetails.maritalStatus);
        PimPage.selectBloodType(empPersonalDetails.bloodType);
        PimPage.fillValidDates(date1, date2);
        PimPage.uploadAttachment("orangeHRM.xlsx");
        PimPage.saveAttachmentFile();
        PimPage.downloadAttachment();
        PimPage.savePersonalDetails();

        cy.logout();

        cy.login(usernameTem, empInfo.password);
        PimPage.goToMyInfoPage("1");
        PimPage.verifyFirstName(empInfo.firstName);
        PimPage.verifyMiddleName(empInfo.middleName);
        PimPage.verifyLastName(empInfo.lastName);

        PimPage.verifyId(idTem);

        PimPage.verifyOtherId(empPersonalDetails.otherId);
        PimPage.verifyLicenseNumber(empPersonalDetails.licenseNumber);
        PimPage.verifyTestField(empPersonalDetails.testField);
        PimPage.verifyLicenseExpiryDate(date2);
        PimPage.verifyDateOfBirth(date1);
        PimPage.verifyNationality(empPersonalDetails.nationality);
        PimPage.verifyMaritalStatus(empPersonalDetails.maritalStatus);
        PimPage.verifyGender(empPersonalDetails.gender);
        PimPage.verifyBloodType(empPersonalDetails.bloodType);

        cy.logout();
      });
    });
  });
});
