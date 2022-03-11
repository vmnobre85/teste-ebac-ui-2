/// <reference types="cypress" />

import Cadastro from '../support/page_objects/nome-funcionliada.page'
import Dados from '../fixtures/dadoscomprador.json'

var faker = require('@faker-js/faker')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    let novoemail = faker.faker.internet.email()

    before(() => {
        cy.visit('/')
    });
 
    it('Deve realizar o preencher os dados cadastrais', () => {
        let email = faker.faker.internet.email('johnconnors.cyberdine')
        Cadastro.DadosCliente(
            email,
            Dados[0].password,
            Dados[0].nome,
            Dados[0].sobrenome,
            novoemail)
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.get('.icon-user-unfollow').click()
        cy.get('#username').type(novoemail)
        cy.get('#password').type(Dados[0].password)
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click()
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]').first().click()
        cy.get('.button-variable-item-S').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.input-text').clear().type(2)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', '2')
        cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.')
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain',2)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]').last().click()
        cy.get('.button-variable-item-S').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.plus').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 4)
        cy.get('.woocommerce-message').should('contain', '2')
        cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.page-title').should('contain', 'Carrinho')
        cy.get(':nth-child(1) > .product-quantity > .quantity > .input-text').should('contain.value', 2)
        cy.get(':nth-child(2) > .product-quantity > .quantity > .input-text').should('contain.value', 2)
        cy.get('.checkout-button').click()
        cy.get('#billing_company').type(Dados[0].empresa)
        cy.get('#billing_address_1').type(Dados[0].endereco)
        cy.get('#billing_address_2').type(Dados[0].complemento)
        cy.get('#billing_city').type(Dados[0].cidade)
        cy.get('#billing_postcode').type(Dados[0].cep)
        cy.get('#billing_phone').type(Dados[0].telefone)
        cy.get('#order_comments').type(Dados[0].informacoes)
        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.page-title').should('contain', 'Pedido recebido')
        cy.get('.woocommerce-order-overview__email > strong').contains(novoemail)
        cy.get('.woocommerce-order-overview__payment-method > strong').should('contain', 'Pagamento na entrega')
        cy.get(':nth-child(4) > td').should('contain', Dados[0].informacoes)
        cy.get('.woocommerce-customer-details--email').should('contain', novoemail)
    });

    after(() => {
        cy.screenshot()
    });

})


/*  Como cliente
    Quero acessar a Loja EBAC 
    Para fazer um pedido de 4 produtos 
    Fazendo a escolha dos produtos
    Adicionando ao carrinho
    Preenchendo todas opções no checkout
    E validando minha compra ao final */