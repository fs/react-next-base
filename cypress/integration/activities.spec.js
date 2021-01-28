describe('Activities', () => {
  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'));
    cy.get('[data-cy=dropdown-toggler]').click();
    cy.contains('Activity').click();
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
