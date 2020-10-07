describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#loginFormTitle')
      .eq(0)
      .as('formHeaderTag');
    cy.get('.formToggler li').as('formTogglers');
  });

  describe('Sign in form', () => {
    it('should render sign in form by default', () => {
      cy.get('@formHeaderTag').should('be.visible');
      cy.get('@formHeaderTag').should('contain', 'Sign In');
    });

    it('should not pass incorrect user', () => {
      cy.get('#email').type('incorrect@mail.com');
      cy.get('#password').type('incorrectPassword');
      cy.get('#signIn').click();
      cy.get('@formHeaderTag').should('contain', 'Sign In');
    });
  });

  describe('Create an account form', () => {
    it('should render create an account form by click', () => {
      cy.get('@formTogglers')
        .eq(1)
        .click();
      cy.get('@formHeaderTag').should('contain', 'Create an account');
    });
  });

  describe('Recover my password form', () => {
    it('should render recover form by click', () => {
      cy.get('@formTogglers')
        .eq(2)
        .click();
      cy.get('@formHeaderTag').should('contain', 'Recover my password');
    });

    it('should show success message when user clicks "Recover Password"', () => {
      cy.get('@formTogglers')
        .eq(2)
        .click();
      cy.get('#email').type('test@mail.com');
      cy.get('#passwordRecovery').click();
      cy.get('#recoverPasswordMessage').should(
        'contain',
        'Password recovery instructions were sent if that account exists',
      );
    });
  });
});
