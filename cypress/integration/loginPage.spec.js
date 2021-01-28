describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy=login-form-title]')
      .eq(0)
      .as('formHeaderTag');
    cy.get('[data-cy=form-toggler] li').as('formToggler');
  });

  describe('Sign in form', () => {
    it('should render sign in form by default', () => {
      cy.get('@formHeaderTag').should('be.visible');
      cy.get('@formHeaderTag').should('contain', 'Sign In');
    });

    it('should not pass incorrect user', () => {
      cy.get('[data-cy=email]').type('incorrect@mail.com');
      cy.get('[data-cy=password]').type('incorrectPassword');
      cy.get('[data-cy=submit-button]').click();
      cy.get('@formHeaderTag').should('contain', 'Sign In');
    });
  });

  describe('Create an account form', () => {
    it('should render create an account form by click', () => {
      cy.get('@formToggler')
        .eq(1)
        .click();
      cy.get('@formHeaderTag').should('contain', 'Create an account');
    });
  });

  describe('Recover my password form', () => {
    it('should render recover form by click', () => {
      cy.get('@formToggler')
        .eq(2)
        .click();
      cy.get('@formHeaderTag').should('contain', 'Recover my password');
    });

    it('should show success message when user clicks "Recover Password"', () => {
      cy.get('@formToggler')
        .eq(2)
        .click();
      cy.get('[data-cy=email]').type('test@mail.com');
      cy.get('[data-cy=submit-button]').click();
      cy.get('[data-cy=password-recovery-message]').should(
        'contain',
        'Password recovery instructions were sent if that account exists',
      );
    });
  });
});
