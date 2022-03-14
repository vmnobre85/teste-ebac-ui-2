// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('adicionarProduto', (novoemail, password) => {
    cy.get('.icon-user-unfollow').click()
    cy.get('#username').type(novoemail)
    cy.get('#password').type(password)
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
    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 2)
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
});

Cypress.Commands.add('finalizandoVenda', (empresa, endereco, complemento, cidade, cep, telefone, informacoes, novoemail) => {
    cy.get('.page-title').should('contain', 'Carrinho')
    cy.get(':nth-child(1) > .product-quantity > .quantity > .input-text').should('contain.value', 2)
    cy.get(':nth-child(2) > .product-quantity > .quantity > .input-text').should('contain.value', 2)
    cy.get('.checkout-button').click()
    cy.get('#billing_company').type(empresa)
    cy.get('#billing_address_1').type(endereco)
    cy.get('#billing_address_2').type(complemento)
    cy.get('#billing_city').type(cidade)
    cy.get('#billing_postcode').type(cep)
    cy.get('#billing_phone').type(telefone)
    cy.get('#order_comments').type(informacoes)
    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.get('.page-title').should('contain', 'Pedido recebido')
    cy.get('.woocommerce-order-overview__email > strong').contains(novoemail)
    cy.get('.woocommerce-order-overview__payment-method > strong').should('contain', 'Pagamento na entrega')
    cy.get(':nth-child(4) > td').should('contain', informacoes)
    cy.get('.woocommerce-customer-details--email').should('contain', novoemail)
});
