describe('Update Profile', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      this.user = validUser;
      cy.login(validUser);

      cy.get('[data-cy=dropdown-toggler]').click();
      cy.contains('Profile').click();
    });
  });

  it('User updates his profile', () => {
    const { firstName, lastName } = this.user;
    const timestamp = +new Date();

    cy.get('[data-cy=profile-update-form]').should('be.visible');

    cy.get('[data-cy=first-name]')
      .clear()
      .type(`${firstName}-${timestamp}`);
    cy.get('[data-cy=last-name]')
      .clear()
      .type(`${lastName}-${timestamp}`);

    cy.fixture('cat.jpeg').then(fileContent => {
      cy.get('[data-testid=avatar]').attachFile({ fileContent, fileName: 'cat.jpeg', mimeType: 'image/jpeg' });
    });

    cy.get('[data-cy=update-button]').click();

    cy.get('[data-cy=profile-updating-loader]').should('be.visible');
    cy.get('[data-cy=notifier]').should('contain', 'Profile updated successfully');
  });
});
