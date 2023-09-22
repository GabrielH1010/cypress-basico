const firstName = 'Gabriel';
const lastName = 'Henrique';
const email = 'gabrielhdeoliveira17@gmail.com'
const longText = 'Testando 1 2 3';

Cypress.Commands.add('fillMandatoryFieldAndSubmit', function(){
    cy.get('#firstName').type(firstName).should('have.value', 'Gabriel')
    cy.get('#lastName').type(lastName).should('have.value', lastName)
    cy.get('#email').type(email).should('have.value', email)
    cy.get('#open-text-area').type(longText, { delay: 0}) 
    cy.contains('button', 'Enviar').click()
})