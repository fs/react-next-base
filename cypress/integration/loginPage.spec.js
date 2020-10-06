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
    /*
    it('should pass correct user', () => {
      cy.get('#email').type(Cypress.env('CORRECT_EMAIL_FOR_E2E'));
      cy.get('#password').type(Cypress.env('CORRECT_PASSWORD_FOR_E2E'));
      cy.wait(1000);
      cy.get('#signIn').click();
      cy.wait(1000);
      cy.get('#userName').should('contain', Cypress.env('CORRECT_EMAIL_FOR_E2E'));
    });
*/
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
  /*
  describe('On logged user', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('#email').type(Cypress.env('CORRECT_EMAIL_FOR_E2E'));
      cy.get('#password').type(Cypress.env('CORRECT_PASSWORD_FOR_E2E'));
      cy.get('#signIn').click();
    });

    it('should show profile info ', () => {
      cy.get('#userName').click();
      cy.get('#userNavigationList li a')
        .eq(0)
        .click();
      cy.get('#profileFormTitle').should('be.visible');
    });
    
    it('should sign out by click', () => {
      cy.get('#userName').click();
      cy.get('#userNavigationList li button').then(el => el.eq(0).click());
      cy.wait(1000);
      cy.url().should('not.contain', 'login');
    });
    
  });*/
});
