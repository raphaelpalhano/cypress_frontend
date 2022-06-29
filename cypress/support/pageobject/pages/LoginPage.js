import BasePage from '../BasePage';
import { LoginElement } from '../../components/LoginElement';

export class LoginPage extends BasePage {
  static acessarSauceDemo() {
    cy.visit('/');
  }

  static preencherCampos(user_type) {
    super.typeValue(LoginElement.INPUT('username'), user_type);
    super.typeValue(LoginElement.INPUT('password'), 'secret_sauce');
  }

  static clicarNoBotao() {
    super.clickOnElement(LoginElement.BUTTON('login-button'));
  }
}
