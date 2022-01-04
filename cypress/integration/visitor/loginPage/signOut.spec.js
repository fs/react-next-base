describe('Sign out', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      this.user = validUser;
      cy.signin(validUser);
    });
  });
  it('User signs out', () => {
    cy.get('[data-cy=dropdown-toggler]').click();
    cy.get('[data-cy=sign-out]').click();

    cy.get('[data-cy=header-links]').should('contain', 'Sign In|Sign Up');
  });
});
