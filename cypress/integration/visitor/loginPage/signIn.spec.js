describe('Sign In', () => {
  beforeEach(() => {
    cy.fixture('users').then((users) => {
      this.users = users;
    });
  });

  it('Visitor signs in with valid credentials', () => {
    const validCredentials = this.users.validUser;

    cy.login(validCredentials);

    cy.get('[data-cy=dropdown-toggler]').should('contain', validCredentials.email);
  });

  it('Visitor should be redirected to home page if authorized', () => {
    cy.visit('/login');

    cy.location('pathname').should('equal', '/');
  });

  it('Visitor signs in with invalid credentials', () => {
    const invalidCredentials = this.users.invalidUser;

    cy.get('[data-cy=dropdown-toggler]').click();
    cy.get('[data-cy=sign-out]').click();

    cy.login({ ...invalidCredentials, path: '/login' });

    cy.get('[data-cy=notifier]').should('contain', 'Invalid credentials');
  });
});
