export default class CommonHelper {
  static generateRandomEmployeeId(length: number = 5) {
    const id = Date.now().toString().slice(-5);
    return id;
  }

  static generateRandomUsername(length: number = 5) {
    let username = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
      username += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return username;
  }

  static wait_until_element_not_exist(
    selector: string,
    parentSelector: string = "body",
    index: number = 0,
  ) {
    return new Cypress.Promise((resolve) => {
      cy.get(parentSelector, { timeout: 30000 })
        .eq(index)
        .within(($body) => {
          if ($body.find(selector).length) {
            cy.get(selector, { timeout: 10000 })
              .should("not.exist")
              .then(resolve);
          } else {
            resolve();
          }
        });
    });
  }
}
