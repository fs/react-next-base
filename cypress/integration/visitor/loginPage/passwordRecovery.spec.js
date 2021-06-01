describe('Password Recovery', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      this.user = validUser;
    });
  });

  it('Visitor resets his password with valid email', () => {
    const email = this.user.email;
    const expectedMessage = 'Password recovery instructions were sent if that account exists';

    cy.passwordRecovery({ email });

    cy.get('[data-cy=notifier]').should('contain', expectedMessage);
  });
});
