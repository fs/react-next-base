describe('Password Recovery', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      this.user = validUser;
    });
  });

  it('Visitor resets his password', () => {
    const email = this.user.email;
    const expectedMessage = 'Password recovery instructions were sent if that account exists';

    cy.passwordRecovery({ email });

    cy.get('[data-cy=password-recovery-message]').should('contain', expectedMessage);
  });
});
