describe('Update Profile', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      this.user = validUser;
      cy.login(validUser);

      cy.get('[data-cy=dropdown-toggler]').click();
      cy.contains('Profile').click();
    });
  });

  it('User sees profile update form', () => {
    const { firstName, lastName } = this.user;
    const timestamp = +new Date();

    cy.get('[data-cy=profile-update-form]').should('be.visible');

    cy.get('[data-cy=first-name]').type(`${firstName}-${timestamp}`);
    cy.get('[data-cy=last-name]').type(`${lastName}-${timestamp}`);
    cy.get('[data-cy=update-button]').click();

    cy.get('[data-cy=profile-updating-loader]').should('be.visible');
    cy.get('[data-cy=notifier]').should('contain', 'Profile updated successfully');
  });
});
