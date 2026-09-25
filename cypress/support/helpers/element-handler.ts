export default class ElementHandler {
  static type({
    selector,
    index,
    findSelector,
    containsText,
    value,
  }: {
    selector: string;
    index?: number;
    findSelector?: string;
    containsText?: string;
    value: string;
  }) {
    let element = cy.get(selector);

    if (containsText) {
      element = cy.contains(selector, containsText);
    }
    if (findSelector) {
      element = element.find(findSelector);
    }

    if (index !== undefined) {
      element = element.eq(index);
    }

    element.type(value);
  }

  static clearThenType(selector: string, value: string) {
    cy.get(selector).click().clear().type(value);
  }

  static validateUrl(expectedUrl: string) {
    cy.url().should("eq", expectedUrl);
  }

  static click({
    selector,
    index,
    findSelector,
    containsText,
    flag,
  }: {
    selector: string;
    index?: number;
    findSelector?: string;
    containsText?: string;
    flag?: string;
  }) {
    let element = cy.get(selector);
    if (containsText) {
      element = cy.contains(selector, containsText);
    }
    if (findSelector) {
      element = element.find(findSelector);
    }

    if (index !== undefined) {
      element = element.eq(index);
    }
    if (flag !== undefined) {
      element.clear();
    }

    element.click();
  }

  static clickThenType({
    selector,
    index,
    findSelector,
    containsText,
    value,
  }: {
    selector: string;
    index?: number;
    findSelector?: string;
    value: string;
    containsText?: string;
  }) {
    let element = cy.get(selector);
    if (containsText) {
      element = cy.contains(selector, containsText);
    }
    if (findSelector) {
      element = element.find(findSelector);
    }

    if (index !== undefined) {
      element = element.eq(index);
    }

    element.click().type(value);
  }

  static assertValue({
    selector,
    containsText,
    findSelector,
    value,
    shouldType,
  }: {
    selector: string;
    containsText?: string;
    findSelector?: string;
    value: string;
    shouldType: string;
  }) {
    let element = cy.get(selector);
    if (containsText) {
      element = cy.contains(selector, containsText);
    }

    if (findSelector) {
      element = element.find(findSelector);
    }
    element.should(shouldType, value);
  }

  static contain({
    selector,
    containsText,
    findSelector,
    value,
  }: {
    selector: string;
    containsText: string;
    findSelector?: string;
    value: string;
  }) {
    let element = cy.contains(selector, containsText);
    if (findSelector !== undefined) {
      element = element.find(findSelector);
    }
    element.type(value);
  }

  static clear() {
    cy.clear();
  }
}
