/// <reference types="Cypress" />

//O bloco describe define a suíte de testes
describe('Central de Atendimento ao Cliente TAT', function() {
    //O bloco it define um caso de teste.
    it('Verificar o título da aplicação', function() {
        cy.visit('./src/index.html') //Comando para acessar o site
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') //Comando para confirmar o titulo do site
    })
  })
