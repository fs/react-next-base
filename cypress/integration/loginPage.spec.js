describe('Static Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('.loginFormTitle')
      .eq(0)
      .as('formHeaderTag');
    cy.get('.formToggler').as('formToggler');
  });

  it('should render sign in form by default', () => {
    cy.get('@formHeaderTag').should('be.visible');
    cy.get('@formHeaderTag').should('contain', 'Sign In');
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
});
