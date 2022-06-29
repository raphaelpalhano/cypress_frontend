/// <reference types="cypress" />

export default class BasePage {
  static getElement(element, index = undefined) {
    let elem;
    if (typeof index !== 'undefined' || index > 0) {
      elem = cy.get(element, { timeout: Cypress.env('global_timeout') }).eq(index);
    } else {
      elem = cy.get(element, { timeout: Cypress.env('global_timeout') });
    }
    return elem;
  }

  static getElementContaining(text) {
    return cy.contains(text, { timeout: Cypress.env('global_timeout') }).should('be.visible');
  }

  static getElementByXPath(element, index) {
    let elem;

    if (typeof index !== 'undefined' || index > 0) {
      elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') }).eq(index);
    } else {
      elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') });
    }

    return elem;
  }

  static validateText(baseValue, comparingValue) {
    expect(baseValue).to.contains(comparingValue);
  }

  static validateElementText(element, value, index = undefined) {
    this.getElementText(element, index).then((text) => {
      expect(text).to.contains(value);
    });
  }

  static async getElementText(element, index = undefined) {
    return await this.getElement(element, index).invoke('text');
  }

  static async typeValue(element, value, force = false) {
    if (force === true) {
      await this.getElement(element).type(value, { force: true });
    } else {
      await this.getElement(element).type(value);
    }
  }

  static typeValueXPath(element, value, force = false) {
    if (force === true) {
      this.getElementByXPath(element).type(value, { force: true });
    } else {
      this.getElementByXPath(element).type(value);
    }
  }

  static typeWithDay(element, value) {
    this.getElement(element).type(value, { timeout: Cypress.env('global_timeout') });
  }

  static async clickOnElement(element, index = undefined, force = false) {
    if (force === true) {
      return await this.getElement(element, index).click({ force: true });
    } else {
      return await this.getElement(element, index).click();
    }
  }

  static verifyIfElementExists(element) {
    this.getElement(element).should('exist', { timeout: Cypress.env('global_timeout') });
  }

  static verifyIfElementIsHidden(element) {
    this.getElement(element).should('not.be.visible', { timeout: Cypress.env('global_timeout') });
  }

  static async waitElementAndSelectOption(element, option) {
    try {
      return await this.getElement(element)
        .should('be.visible')
        .select(option);
    } catch (error) {
      throw new Error(`element not be visible. ${error.message}`);
    }
  }

  static validateFirstElementOfArray(array, value) {
    cy.get(array)
      .first()
      .should('contain', value);
  }

  static clickInAllElementsInList(elementList) {
    cy.get(elementList, { timeout: Cypress.env('global_timeout') }).each(($el) => {
      cy.wrap($el).click();
    });
  }

  static clickInOneElementInList(elementList, value) {
    cy.get(elementList)
      .should('be.visible', { timeout: Cypress.env('global_timeout') })
      .each(($el) => {
        if (cy.wrap($el).should('contain', value)) {
          cy.get($el).click();
        }
      });
  }

  static typeForm(element, inputElements, values) {
    cy.get(element)
      .should('be.visible', { timeout: Cypress.env('global_timeout') })
      .within(($form) => {
        inputElements.forEach(($el) => {
          cy.get($el).type(cy.wrap(values).each($v));
        });
      });
  }

  static getListOfTextsElements(elementList, nameEnvList) {
    let texts = new Array();
    cy.get(elementList)
      .should('contain.html', { timeout: Cypress.env('global_timeout') })
      .each(($el) => {
        texts.push(cy.wrap($el).invoke('text'));
      });
    if (nameEnvList) {
      Cypress.env(nameEnvList, texts);
    }

    return texts;
  }
}
