//Esse comando é para repetir o teste 3 vezes validando a estabilidade do componente
Cypress._.times(3, function(){
    it('Teste de página da politica de privacidade de forma indenpendente', 
    function(){
    cy.visit('./src/privacy.html')
        //Verificando se o texto é exibido no termo
        cy.contains('Talking About Testing').should('be.visible') 
    })
})