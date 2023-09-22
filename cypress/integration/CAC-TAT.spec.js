/// <reference types="Cypress" />

//O bloco describe define a suíte de testes
describe('Central de Atendimento ao Cliente TAT', function() {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla, urna in tristique cursus, ligula tortor tincidunt massa, ac feugiat arcu justo at libero. Proin tristique nunc sit amet justo euismod bibendum. Suspendisse potenti. Fusce eget sagittis arcu, a commodo nisl. Integer eget ex in justo vulputate condimentum.'
    const phone = '34998985542'

    //Este é um beforeEach global, que será executado antes de cada teste neste describe
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    //O bloco it define um caso de teste.
    it('Verificar o título da aplicação', 
    function() {
        //Comando para confirmar o título do site
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
    })

    //No caso do it.only significa que você está trabalhando somente nesse teste, ou seja, não precisa mais verificar e acessar o site se ele já está acessado
    it('Preencher os campos obrigatórios e enviar o formulário', 
    function() {
        cy.get('input[type="text"][name="firstName"]') //Comando para pegar o parametro a ser preenchido
            .should('be.visible') //Comando para afirmar que o campo está visivel
            .type('Gabriel') //Comando para preencher o campo
            .should('have.value', 'Gabriel') //Comando para comparar o valor que está preenchido

        cy.get('input[type="text"][name="lastName"]')
            .should('be.visible')
            .type('Henrique')
            .should('have.value', 'Henrique')

        cy.get('input[type="email"]')
            .should('be.visible')
            .type('gabrielhdeoliveira@gmail.com')
            .should('have.value', 'gabrielhdeoliveira@gmail.com')

        //Comando delay: 0 é pra retirar o delay do desse campo, o campo demoraria mais para ser preenchido por ser um texto longo
        cy.get('textarea[name="open-text-area"]')
            .should('be.visible')
            .type(longText, { delay: 0}) 

        //Comando para clicar no botão
        cy.get('button[type="submit"]').click()

        //Comando para verificar se a mensagem de sucesso foi exibida
        cy.get('.success').should('be.visible')
    })

    it('Exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', 
    function(){
        cy.get('#firstName') //Essa é uma outra forma de pegar um componente, direto pelo cypress
            .should('be.visible')
            .type('Gabriel')

        cy.get('#lastName')
            .should('be.visible')
            .type('Henrique')

        cy.get('#email')
            .should('be.visible')
            .type('gabrielhdeoliveira@gmail,com') //Nesse caso o email está em um formato incorreto (,)

        cy.get('#open-text-area')
            .should('be.visible')
            .type(longText, { delay: 0}) 

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo de telefone só aceita números, se um valor não-numérico for digitado, seu valor continuará vazio.', 
    function(){
        cy.get('#phone')
            .type('abcdefg')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', 
    function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Henrique')
        cy.get('#email').type('gabrielhdeoliveira@gmail,com') 
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type(longText, { delay: 0}) 
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it.only('Preenche e limpa os campos Nome, Sobrenome, E-mail e telefone', 
    function(){
        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')
            .clear() //Comando para limpar o campo
            .should('have.value', '') //Validando se o campo foi limpado

        cy.get('#lastName')
            .type('Henrique')
            .should('have.value', 'Henrique')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('gabrielhdeoliveira@gmail,com')
            .should('have.value', 'gabrielhdeoliveira@gmail,com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type(phone)
            .should('have.value', phone)
            .clear()
            .should('have.value', '')
    })

})
