/// <reference types="cypress" />

import {Before, After} from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.clearLocalStorage(); 
  console.log('before all, this!');
    
});

After(() => {
  console.log('After each, this!');
});