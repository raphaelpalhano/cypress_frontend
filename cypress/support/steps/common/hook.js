/// <reference types="cypress" />

import { Before, After } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.log('Start feature');
});

After(() => {
  cy.log('Finish feature');
});
