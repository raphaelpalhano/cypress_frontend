import BasePage from '../BasePage'
import {LoginElement} from '../../components/LoginElement'


export class LoginPage extends BasePage{
    
    static acessar_sauce_demo(){
        cy.visit('/')
    }
    

    static preencher_campos(user_type){
     
        super.typeValue(LoginElement.INPUT('username'), user_type)
        super.typeValue(LoginElement.INPUT('password'), 'secret_sauce')
        
    
    }

    static clicar_no_botao(){
        super.clickOnElement(LoginElement.BUTTON('login-button'))
    }
}