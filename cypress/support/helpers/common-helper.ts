export default class CommonHelper {
  /**
   * generate an employee id from the last 5 digits of the current timestamp
   * @returns {string} the generated employee id
   */
  static generateRandomEmployeeId() {
    const id = Date.now().toString().slice(-5);
    return id;
  }

  /**
   * generate a random username made of english letters (upper and lower case)
   * @param {number} [length=5] - the length of the username
   * @returns {string} the generated username
   */
  static generateRandomUsername(length: number = 5) {
    let username = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
      username += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return username;
  }

  /**
   * wait until an element (like the loading spinner) does not exist inside the parent element
   * @param {string} selector - the css selector of the element that should disappear
   * @param {string} [parentSelector="body"] - the css selector of the parent element to search in
   * @param {number} [index=0] - the index of the parent element if the selector returns multiple elements
   * @returns {Cypress.Promise<void>} resolves when the element no longer exists
   */
  static waitUntilElementNotExist(
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
