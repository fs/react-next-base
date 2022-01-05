describe('Sign In', () => {
  beforeEach(() => {
    cy.fixture('users').then((users) => {
      this.users = users;
    });
  });

  afterEach(() => {
    cy.signout();
  });

  it('Visitor signs in with valid credentials', () => {
    const validCredentials = this.users.validUser;

    cy.signin(validCredentials);

    cy.get('[data-cy=dropdown-toggler]').should('contain', validCredentials.email);
  });

  it('Authorized user visits auth page', () => {
    const validCredentials = this.users.validUser;

    cy.signin(validCredentials);

    cy.visit('/signin');

    cy.location('pathname').should('equal', '/');
  });

  it('Visitor signs in with invalid credentials', () => {
    const invalidCredentials = this.users.invalidUser;

    cy.signin({ ...invalidCredentials, path: '/signin' });

    cy.get('[data-cy=notifier]').should('contain', 'Invalid credentials');
  });
});
