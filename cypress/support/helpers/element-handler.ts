import { CONSTANTS } from "../constants";
import CommonHelper from "./common-helper";
export default class ElementHandler {
  /**
   * type a value inside an element, the element can be found by selector, text, nested selector and index
   * @param {Object} params - the parameters object
   * @param {string} params.selector - the css selector of the element
   * @param {number} [params.index] - the index of the element if the selector returns multiple elements
   * @param {string} [params.findSelector] - a nested selector to find inside the selected element
   * @param {string} [params.containsText] - text that the element must contain
   * @param {string} params.value - the value to type
   */
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

  /**
   * click on the element, clear its current value, then type the new value
   * @param {string} selector - the css selector of the element
   * @param {string} value - the value to type
   */
  static clearThenType(selector: string, value: string) {
    cy.get(selector).click().clear().type(value);
  }

  /**
   * validate that the current page url equals the expected url
   * @param {string} expectedUrl - the expected full url
   */
  static validateUrl(expectedUrl: string) {
    cy.url().should("eq", expectedUrl);
  }

  /**
   * click on an element, the element can be found by selector, text, nested selector and index
   * @param {Object} params - the parameters object
   * @param {string} params.selector - the css selector of the element
   * @param {number} [params.index] - the index of the element if the selector returns multiple elements
   * @param {string} [params.findSelector] - a nested selector to find inside the selected element
   * @param {string} [params.containsText] - text that the element must contain
   * @param {string} [params.flag] - if provided, the element value is cleared before clicking
   */
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

  /**
   * click on an element first, then type a value inside it
   * @param {Object} params - the parameters object
   * @param {string} params.selector - the css selector of the element
   * @param {number} [params.index] - the index of the element if the selector returns multiple elements
   * @param {string} [params.findSelector] - a nested selector to find inside the selected element
   * @param {string} params.value - the value to type
   * @param {string} [params.containsText] - text that the element must contain
   */
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

  /**
   * assert on an element (by selector) or assert that a text exists on the page (by value only)
   * @param {Object} params - the parameters object
   * @param {string} [params.selector] - the css selector of the element, if omitted the assertion is done on the text only
   * @param {string} [params.containsText] - text that the element must contain
   * @param {string} [params.findSelector] - a nested selector to find inside the selected element
   * @param {string} params.value - the expected value, or the text to look for when no selector is passed
   * @param {string} params.shouldType - the cypress assertion type (e.g. have.value, be.visible, contain)
   */
  static assertValue({
    selector,
    containsText,
    findSelector,
    value,
    shouldType,
  }: {
    selector?: string;
    containsText?: string;
    findSelector?: string;
    value: string;
    shouldType: string;
  }) {
    let element;
    if (selector) {
      element = cy.get(selector);
      if (containsText) {
        element = cy.contains(selector, containsText);
      }

      if (findSelector) {
        element = element.find(findSelector);
      }
      element.should(shouldType, value);
    } else if (value) {
      cy.contains(value).should(shouldType);
    }
  }

  /**
   * clear the value of the currently focused element
   */
  static clear() {
    cy.clear();
  }

  /**
   * find a nested element inside another element and return it
   * @param {Object} params - the parameters object
   * @param {string} params.selector - the css selector of the parent element
   * @param {string} params.findSelector - the css selector of the nested element
   * @param {number} [params.eqIndex] - the index of the nested element if multiple elements are found
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} the found element
   */
  static findElement({
    selector,
    findSelector,
    eqIndex,
  }: {
    selector: string;
    findSelector: string;
    eqIndex?: number;
  }) {
    let element = cy.get(selector).find(findSelector);
    if (eqIndex !== undefined) {
      element = element.eq(eqIndex);
    }
    return element;
  }

  /**
   * select a file for a file input element
   * @param {Object} params - the parameters object
   * @param {string} params.selector - the css selector of the file input
   * @param {string} params.filePath - the path of the file to upload
   * @param {boolean} [params.force=false] - force the action even if the input is hidden
   */
  static selectFile({
    selector,
    filePath,
    force = false,
  }: {
    selector: string;
    filePath: string;
    force?: boolean;
  }) {
    cy.get(selector).selectFile(filePath, { force });
  }

  /**
   * wait until the loading spinner disappears from the page
   */
  static waitLoader() {
    CommonHelper.waitUntilElementNotExist(CONSTANTS.loadingSpinner);
  }
}
