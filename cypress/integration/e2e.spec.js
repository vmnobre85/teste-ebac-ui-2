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
        cy.realizandoLogin(novoemail, Dados[0].password)
        cy.adicionandoProduto01(Dados[0].tamanho01, Dados[0].cor01, Dados[0].quantidade01)
        cy.adicionandoProduto02(Dados[0].tamanho02, Dados[0].cor02, Dados[0].quantidade01, Dados[0].quantidade02)
        cy.conferindoPedido(Dados[0].quantidade01, Dados[0].quantidade02)
        cy.finalizandoVenda(Dados[0].empresa, Dados[0].endereco, Dados[0].complemento, Dados[0].cidade, Dados[0].cep, Dados[0].telefone, Dados[0].informacoes, novoemail)
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