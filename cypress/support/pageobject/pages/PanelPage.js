import BasePage from '../BasePage'
import {PanelElement} from '../../components/PanelElement'

export class PanelPage extends BasePage {
    
    static filtrar_produtos(filtro){
        super.waitElementAndSelectOption(PanelElement.SELECTFILTER(), filtro)
    }
  
    static verificar_produto(name, price){
        super.validateFirstElementOfArray(PanelElement.ARRPRODUCTS(), name)
        super.validateFirstElementOfArray(PanelElement.ARRPRODUCTS(), price)
    }
}