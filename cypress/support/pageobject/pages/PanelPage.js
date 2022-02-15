import BasePage from '../BasePage'
import {PanelElement} from '../../components/PanelElement'

export class PanelPage extends BasePage {
    
    static filtrar_produtos(filtro){
        super.waitElementAndSelectOption(PanelElement.selectFilter(), filtro)
    }
  
    static verificar_produto(name, price){
        super.validateFirstElementOfArray(PanelElement.arrProducts(), name)
        super.validateFirstElementOfArray(PanelElement.arrProducts(), price)
    }
}