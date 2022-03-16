/// <reference types="cypress" />

import {Before, Given, And} from 'cypress-cucumber-preprocessor/steps';
import {LoginPage} from '../pageobject/pages/LoginPage';


/***
 * Os 'before' que se aplicam para todos as features e steps estão armazenados na pasta 'step_definitions/common'
 */

Before({ tags: '@tag'}, () => {
  console.log(`before scenarios with tag '@tag'`);
});

Given('o acesso a plataforma', () => {
  LoginPage.acessarSauceDemo();

});


And('efetue login com {string}', (user_type) => {
  LoginPage.preencherCampos(user_type);
  LoginPage.clicarNoBotao();
});
