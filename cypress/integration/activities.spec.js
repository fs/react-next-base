const EMAIL = 'marat.sadriev@flatstack.com';
const PASSWORD = 'Pwd21093';

describe('Activities', () => {
  it('should see activity page', () => {
    cy.visit('/login');
    cy.get('#email').type(EMAIL);
    cy.get('#password').type(PASSWORD);
    cy.get('#signIn').click();
    cy.get('[data-cy=dropdown-toggler]').click();
    cy.get('[data-cy=activity]', { timeout: 10000 }).click();

    cy.get('[data-cy=test-activity-table]').should('be.visible');
    //cy.wait('@activityTable');
  });
});
