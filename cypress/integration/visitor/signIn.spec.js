describe('Sign In', () => {
  beforeEach(() => {
    cy.fixture('users').then(users => {
      this.users = users;
    });
  });

  it('Visitor singns in with valid credentials', () => {
    const validCredentials = this.users.validUser;

    cy.login(validCredentials);

    cy.location('pathname').should('eq', '/');
    cy.get('[data-cy=dropdown-toggler]').should('contain', validCredentials.email);
  });

  it('Visitor singns in with invalid credentials', () => {
    const invalidCredentials = this.users.invalidUser;

    cy.login({ ...invalidCredentials, path: '/login' });

    cy.get('[data-cy=default-template]').should('contain', 'Invalid credentials');
  });
});
