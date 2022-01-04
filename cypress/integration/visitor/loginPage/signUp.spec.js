describe('Sign Up', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      this.user = validUser;
    });
  });

  afterEach(() => {
    cy.signout();
  });

  it('Visitor singns up with valid credentials', () => {
    const timestamp = +new Date();
    const { firstName, lastName } = this.user;

    const validCredentials = {
      firstName,
      lastName,
      email: `${firstName}-${timestamp}@test.com`,
      password: `Password + ${timestamp}`,
    };

    cy.signup(validCredentials);

    cy.get('[data-cy=dropdown-toggler]').should('contain', validCredentials.email);
  });

  it('Visitor singns up with existed email', () => {
    const timestamp = +new Date();
    const { firstName, lastName, email } = this.user;

    const invalidCredentials = {
      firstName,
      lastName,
      email,
      password: `Password + ${timestamp}`,
      path: '/signup',
    };

    cy.signup(invalidCredentials);

    cy.get('[data-cy=notifier]').should('contain', 'Record Invalid');
  });
});
