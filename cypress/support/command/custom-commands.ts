import LoginPage from "@cypress/support/pages/login-page";
import ApiHelper from "@cypress/support/helpers/api-helper";
import { CONSTANTS } from "@cypress/support/constants";

Cypress.Commands.add(
  "login",
  (username: string = "Admin", password: string = "admin123") => {
    LoginPage.visit();
    LoginPage.fillUserName(username);
    LoginPage.fillPassword(password);
    ApiHelper.interceptRequest("POST", "**/auth/validate", "postRequest");
    LoginPage.submit();
    ApiHelper.waitForRequests([{ alias: "@postRequest", statusCode: 302 }]);
    LoginPage.validLogin();
  },
);

Cypress.Commands.add("logout", () => {
  cy.get(".oxd-userdropdown-tab").click();
  cy.get("a[href='/web/index.php/auth/logout']").click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
      logout(): Chainable;
    }
  }
}

export {};
