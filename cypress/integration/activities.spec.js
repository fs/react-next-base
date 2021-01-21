const EMAIL = 'marat.sadriev@flatstack.com';
const PASSWORD = 'Pwd21093';

describe('Activities', () => {
  it('should see activity page', () => {
    cy.visit('/login');
    cy.get('#email').type(EMAIL);
    cy.get('#password').type(PASSWORD);
    cy.get('#signIn').click();
    cy.intercept('/').as('mainPage');
    cy.wait('@mainPage');

    cy.get('[data-cy=dropdown-toggler]', { timeout: 1000 }).click();
    cy.contains('Activity').click();

    cy.get('[data-cy=test-activity-table]').should('be.visible');
    //cy.wait('@activityTable');
  });
});
