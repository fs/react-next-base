describe('Sign In', () => {
  beforeEach(() => {
    cy.fixture('users').then((users) => {
      this.users = users;
    });
  });

  afterEach(() => {
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy=dropdown-toggler]').length > 0) {
        cy.get('[data-cy=dropdown-toggler]').click();
        cy.get('[data-cy=sign-out]').click();
      }
    });
  });

  it('Visitor signs in with valid credentials', () => {
    const validCredentials = this.users.validUser;

    cy.login(validCredentials);

    cy.get('[data-cy=dropdown-toggler]').should('contain', validCredentials.email);
  });

  it('Visitor should be redirected to home page if authorized', () => {
    const validCredentials = this.users.validUser;

    cy.login(validCredentials);

    cy.visit('/login');

    cy.location('pathname').should('equal', '/');
  });

  it('Visitor signs in with invalid credentials', () => {
    const invalidCredentials = this.users.invalidUser;

    cy.login({ ...invalidCredentials, path: '/login' });

    cy.get('[data-cy=notifier]').should('contain', 'Invalid credentials');
  });
});
