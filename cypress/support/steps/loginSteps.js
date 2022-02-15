/// <reference types="cypress" />

import {Before, Given, And} from 'cypress-cucumber-preprocessor/steps'
import {LoginPage} from '../pageobject/pages/LoginPage'


/*** 
 * Os 'before' que se aplicam para todos as features e steps estão armazenados na pasta 'step_definitions/common'
 */

Before({ tags: "@tag"}, () => {
	console.log("before scenarios with tag '@tag'")
})

Given(`o acesso a plataforma`, () => {
	LoginPage.acessar_sauce_demo();
	
});


And(`efetue login com {string}`, (user_type) => {
	LoginPage.preencher_campos(user_type);
	LoginPage.clicar_no_botao()
});
