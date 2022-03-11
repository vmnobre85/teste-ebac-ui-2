class CadastroCLiente {

    DadosCliente(email, password, nome, sobrenome, novoemail){
        cy.get('.icon-user-unfollow').click()
        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type(password)
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nome)
        cy.get('#account_last_name').type(sobrenome)
        cy.get('#account_email').clear().type(novoemail)
        cy.get('.woocommerce-Button').click()
        cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2) > a').click()
    }

}

export default new CadastroCLiente()