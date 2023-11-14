describe('Testes no site Pet Store', () => {
  before(() => {
    cy.visit('https://petstore.octoperf.com/');
  });
  
  it('Caso de Teste 1: Realizar Cadastro de Novo Usuário', () => {
    cy.visit('https://petstore.octoperf.com/');
    
    cy.get('a').contains('Enter the Store').click();
    
    cy.get('a').contains('Sign In').click();
    
    cy.get('a').contains('Register Now!').click();

    cy.get('input[name="username"]').type(info);
    cy.get('input[name="password"]').type('Password123');
    cy.get('input[name="repeatedPassword"]').type('Password123');
    cy.get('input[name="account.firstName"]').type('PrimeiroNome');
    cy.get('input[name="account.lastName"]').type('UltimoNome');
    cy.get('input[name="account.email"]').type('usuarioexemplo@teste.com');
    cy.get('input[name="account.phone"]').type('123456789');
    cy.get('input[name="account.address1"]').type('EnderecoLinha1');
    cy.get('input[name="account.address2"]').type('EnderecoLinha2');
    cy.get('input[name="account.city"]').type('NomeDaCidade');
    cy.get('input[name="account.state"]').type('NomeDoEstado');
    cy.get('input[name="account.zip"]').type('12345');
    cy.get('input[name="account.country"]').type('NomeDoPais');

    cy.get('input[name="newAccount"]').click();
  });
  
  it.skip('Caso de Teste 2: Realizar Login com Usuário Cadastrado', () => {
    cy.visit('https://petstore.octoperf.com/actions/Account.action?signonForm=');
    cy.get('a').contains('Sign In').click();
    cy.get('input[name="username"]').type(info);
    cy.get('input[name="password"]').clear().type('Password123');
    cy.get('input[name="signon"]').click();
    cy.get('#WelcomeContent').should('contain.text', 'Welcome PrimeiroNome!')
  });  

  it.skip('Caso de Teste 3: Navegar no Catálogo e Acessar Detalhes do Item', () => {
    
    cy.visit('https://petstore.octoperf.com/');

    cy.get('a').contains('Enter the Store').click();

    const topics = ['Fish', 'Dogs', 'Cats', 'Reptiles', 'Birds'];

    for (const topic of topics) {
        cy.get('[name="searchProducts"]').should('be.visible');

        cy.get('[size="14"]').click();
        
        cy.get('[size="14"]').type(topic);
        
        cy.get('[name="searchProducts"]').click();
        
        cy.url().should('include', '/actions/Catalog.action', { timeout: 10000 });
        cy.get('#Catalog').should('be.visible'); 

        cy.get('[size="14"]').click();
        cy.get('[size="14"]').clear();
    }
  });

  it.skip('Caso de Teste 4: Adicionar Item ao Carrinho', () => {
    cy.visit('https://petstore.octoperf.com/actions/Account.action?signonForm=');
    cy.get('a').contains('Sign In').click();
    cy.get('input[name="username"]').type(info);
    cy.get('input[name="password"]').clear().type('Password123');
    cy.get('input[name="signon"]').click();

    cy.visit('https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH');
    cy.get('table').contains('FI-SW-01').click();
    cy.get('table').contains('Add to Cart').click();
    cy.get('#Cart').contains('Proceed to Checkout').click();

    cy.get('[name="newOrder"]').click();
    cy.get('.Button').click();
    cy.get('li').contains('Thank you, your order has been submitted.');
  });

  it.skip('Caso de Teste 5: Verificar se o cadastro ocorre mesmo se a confirmação estiver errada', ()=>{
    cy.visit('https://petstore.octoperf.com/');
 
    cy.get('a').contains('Enter the Store').click();
 
    cy.get('a').contains('Sign In').click();
 
    cy.get('a').contains('Register Now!').click();
 
    const uniqueUsername = 'testuser' + new Date().getTime();
 
    cy.get('input[name="username"]').type(uniqueUsername);
    cy.get('input[name="password"]').type('Password123');
    cy.get('input[name="repeatedPassword"]').type('PasswordErrada2');
    cy.get('input[name="account.firstName"]').type('PrimeiroNome2');
    cy.get('input[name="account.lastName"]').type('UltimoNome2');
    cy.get('input[name="account.email"]').type('usuarioexemplo2@teste.com');
    cy.get('input[name="account.phone"]').type('123456789');
    cy.get('input[name="account.address1"]').type('EnderecoLinha1');
    cy.get('input[name="account.address2"]').type('EnderecoLinha2');
    cy.get('input[name="account.city"]').type('NomeDaCidade');
    cy.get('input[name="account.state"]').type('NomeDoEstado');
    cy.get('input[name="account.zip"]').type('12345');
    cy.get('input[name="account.country"]').type('NomeDoPais');

    cy.get('input[name="newAccount"]').click();

    cy.get('#WelcomeContent').should('not.contain.text', 'Welcome PrimeiroNome2!')
  });

  it(('Caso de Teste 6: Verificar se o login é permitido com senha errada'), () =>{
    cy.visit('https://petstore.octoperf.com/actions/Account.action?signonForm=');
    cy.get('a').contains('Sign In').click();
    cy.get('input[name="username"]').type(info.usuario);
    cy.get('input[name="password"]').type('PasswordErrada');
    cy.get('input[name="signon"]').click();
    cy.get('li').invoke('text').then((actualText) => {
      console.log('Texto Real:', actualText);
    });
    
  });
});

function criarusuario(){
 
  let horas = new Date().getHours().toString()
  let minutos = new Date().getMinutes().toString()
  let segundos = new Date().getSeconds().toString()
  let usuario = horas + minutos + segundos + 'id'
  let userinfo = usuario
 
  return userinfo
}
let info = criarusuario()