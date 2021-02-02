describe('Activities', () => {
  beforeEach(() => {
    cy.fixture('users').then(users => {
      cy.login(users.validUser);

      cy.get('[data-cy=dropdown-toggler]').click();
      cy.contains('Activity').click();
    });
  });

  it('should see activity page', () => {
    cy.get('[data-cy=test-activity-table]').should('be.visible');
  });

  it('should see activity page', () => {
    cy.get('[data-cy=activity-row]')
      .its('length')
      .should('be.eq', 5);
  });
});
