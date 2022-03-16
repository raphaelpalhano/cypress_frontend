Feature: Filtrar produtos pelo nome e preços




    Background: Iniciar na página de exemplo
      Given o acesso a plataforma



     @test
    Scenario Outline: Filtrar produtos no painel de produtos
      Given efetue login com "standard_user"
      When filtrar os produtos por "<filtro>"
      Then deverá ser mostrado o primeiro produto com nome "<nome>" e preço "<preço>"
      Examples:
        | filtro              | value | nome                              | preço  |
        | Price (high to low) | hilo  | Sauce Labs Fleece Jacket          | $49.99 |
        | Price (low to high) | lohi  | Sauce Labs Onesie                 | $7.99  |
        | Name (A to Z)       | az    | Sauce Labs Backpack               | $29.99 |
        | Name (Z to A)       | za    | Test.allTheThings() T-Shirt (Red) | $15.99 |


# Dado ou Given == Pré requisito
# Quando ou When == Ações
# Então ou Then == validações das ações
