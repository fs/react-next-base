describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('.loginFormTitle')
      .eq(0)
      .as('formHeaderTag');
    cy.get('.formToggler').as('formToggler');
  });

  describe('Sign in form', () => {
    //TODO: test sign in functionality
    it('should render sign in form by default', () => {
      cy.get('@formHeaderTag').should('be.visible');
      cy.get('@formHeaderTag').should('contain', 'Sign In');
    });
  });

  it('should render create an account form by click', () => {
    cy.get('@formToggler')
      .eq(1)
      .click();
    cy.get('@formHeaderTag').should('contain', 'Create an account');
  });

  it('should render recover form by click', () => {
    cy.get('@formToggler')
      .eq(2)
      .click();
    cy.get('@formHeaderTag').should('contain', 'Recover my password');
  });

  it('should render recover form by click', () => {
    cy.get('@formToggler')
      .eq(1)
      .click();

    cy.get('#firstName').type('testmail@test.test');
    cy.get('#lastName').type('testlastname');
    cy.get('#email').type('testmail@test.test');
    cy.get('#password').type('test');
    cy.get('#signUp').click();
    cy.getToken;
  });
});
