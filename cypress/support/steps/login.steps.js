import { Before, Given, And } from 'cypress-cucumber-preprocessor/steps';
import { LoginPage } from '../pageobject/pages/LoginPage';

/***
 * Os 'before' que se aplicam para todos as features e steps estão armazenados na pasta 'step_definitions/common'
 */

Before({ tags: '@tag' }, () => {
  //cy.setLocalStorage('acessoRetaguarda', 'true');
  //cy.setCookie('version', 'v6-beta');
  //cy.on('window:load').as('window');
  //if(cy.wait('@window')){
  //cy.reload();
  //}
  console.log(`before scenarios with tag '@tag'`);
});

Given('o acesso a plataforma', () => {
  LoginPage.acessarSauceDemo();
});

And('efetue login com {string}', (user_type) => {
  LoginPage.preencherCampos(user_type);
  LoginPage.clicarNoBotao();
});
