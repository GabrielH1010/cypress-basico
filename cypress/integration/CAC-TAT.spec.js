/// <reference types="Cypress" />

//O bloco describe define a suíte de testes
describe('Central de Atendimento ao Cliente TAT', function() {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla, urna in tristique cursus, ligula tortor tincidunt massa, ac feugiat arcu justo at libero. Proin tristique nunc sit amet justo euismod bibendum. Suspendisse potenti. Fusce eget sagittis arcu, a commodo nisl. Integer eget ex in justo vulputate condimentum.'

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
        cy.contains('button', 'Enviar').click()

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

        cy.contains('button', 'Enviar').click()

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
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos Nome, Sobrenome, E-mail e telefone', 
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
            .type('3499988546')
            .should('have.value', '3499988546')
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', 
    function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia formulário com sucesso usando um comando customizado', 
    function(){
        cy.fillMandatoryFieldAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (YouTube) por seu texto', 
    function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', 
    function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', 
    function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', 
    function(){
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
    })

    it('Marca todos os campos de atendimentos', 
    function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3) //Verificar tamanho do campo, nesse caso possui 3 opções
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
        })
    })

    it('Marcar ambos checkboxes, depois desmarca o último', 
    function(){
        cy.get('input[type="checkbox"]')
        .check() //Comando para marcar todos os check
        .should('be.checked')
        .last() //Pegando o ultimo check
        .uncheck() //Desmarcar todos os checkboxs
        .should('not.be.checked') //Verificar se todos os checks estão desmarcados
    })

    it('Seleciona um arquivo da pasta fixture', 
    function(){
        cy.get('input[type="file"]')
            .should('not.have.value') //Verificando se não tem nenhum arquvio
            .selectFile('./cypress/fixtures/example.json') //Selecionando o arquivo
            .should(function($input){   //Validando o arquivo
                expect($input[0].files[0].name).to.equal('example.json');
            })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', 
    function(){
        cy.get('input[type="file"]')
            .should('not.have.value') //Verificando se não tem nenhum arquvio
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) //Selecionando o arquivo e usando a ação de arrastar o arquivo para upload
            .should(function($input){   //Validando o arquivo
                expect($input[0].files[0].name).to.equal('example.json');
            })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', 
    function(){
       cy.fixture('example.json').as('sampleFile')
       cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
        })
    })
})
