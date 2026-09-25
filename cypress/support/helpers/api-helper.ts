export default class ApiHelper {
  static interceptRequest(method: string, url: string, alias: string) {
    cy.intercept(method, url).as(alias);
  }

  static waitForRequests(
    requests: { alias: `@${string}`; statusCode: number }[],
  ) {
    requests.forEach((request) => {
      cy.wait(request.alias)
        .its("response.statusCode")
        .should("eq", request.statusCode);
    });
  }
}
