import { CONSTANTS } from "../constants";

export default class ApiHelper {
  /**
   * intercept an api request and give it an alias so it can be waited on later
   * @param {string} method - the http method of the request (e.g. GET, POST)
   * @param {string} url - the url or url pattern of the request
   * @param {string} alias - the alias name for the intercepted request
   */
  static interceptRequest(method: string, url: string, alias: string) {
    cy.intercept(method, url).as(alias);
  }

  /**
   * intercept the request that is sent when opening the add employee page
   * @param {string} alias - the alias name for the intercepted request
   */
  static interceptAddEmp(alias: string) {
    ApiHelper.interceptRequest("GET", CONSTANTS.addEmployee, alias);
  }

  /**
   * wait for the add employee page request and verify it returns status 200
   * @param {string} alias - the alias of the intercepted request
   */
  static waitAddEmp(alias: string) {
    ApiHelper.waitForRequests([
      {
        alias,
        statusCode: 200,
      },
    ]);
  }

  /**
   * intercept the requests that are sent when visiting the PIM page (PIM module and employee list)
   * @param {string} alias1 - the alias for the PIM module request
   * @param {string} alias2 - the alias for the employee list request
   */
  static interceptVisitPage(alias1: string, alias2: string) {
    ApiHelper.interceptRequest("GET", CONSTANTS.pimModule, alias1);
    ApiHelper.interceptRequest("GET", CONSTANTS.employeeList, alias2);
  }

  /**
   * wait for the PIM page requests and verify their status codes (302 for the module, 200 for the list)
   * @param {string} alias1 - the alias of the PIM module request
   * @param {string} alias2 - the alias of the employee list request
   */
  static waitVisitPimPage(alias1: string, alias2: string) {
    ApiHelper.waitForRequests([
      { alias: alias1, statusCode: 302 },
      { alias: alias2, statusCode: 200 },
    ]);
  }

  /**
   * wait for the save employee requests and verify both return status 200
   * @param {string} alias1 - the alias of the employees GET request
   * @param {string} alias2 - the alias of the admin users POST request
   */
  static waitSaveAddEmp(alias1: string, alias2: string) {
    ApiHelper.waitForRequests([
      { alias: alias1, statusCode: 200 },
      { alias: alias2, statusCode: 200 },
    ]);
  }

  /**
   * intercept the request that is sent when opening the My Info page
   * @param {string} alias - the alias name for the intercepted request
   */
  static interceptGoToMyInfoPage(alias: string) {
    ApiHelper.interceptRequest("GET", CONSTANTS.myInfoDetails, alias);
  }

  /**
   * wait for the My Info page request and verify it returns status 200
   * @param {string} alias - the alias of the intercepted request
   */
  static waitGoToMyInfoPage(alias: string) {
    ApiHelper.waitForRequests([{ alias, statusCode: 200 }]);
  }

  /**
   * intercept the requests that are sent when saving a new employee (create employee and create user)
   * @param {string} alias1 - the alias for the employees POST request
   * @param {string} alias2 - the alias for the admin users POST request
   */
  static interceptSaveAddEmp(alias1: string, alias2: string) {
    ApiHelper.interceptRequest("POST", CONSTANTS.employeesApi, alias1);
    ApiHelper.interceptRequest("POST", CONSTANTS.adminUsersApi, alias2);
  }

  /**
   * wait for a list of intercepted requests and verify the status code of each one
   * @param {Array<{alias: string, statusCode: number}>} requests - the requests to wait for
   * @param {string} requests[].alias - the alias of the intercepted request
   * @param {number} requests[].statusCode - the expected response status code
   */
  static waitForRequests(requests: { alias: string; statusCode: number }[]) {
    requests.forEach((request) => {
      cy.wait(`@${request.alias}`)
        .its("response.statusCode")
        .should("eq", request.statusCode);
    });
  }
}
