describe('Static Page', () => {
  beforeEach(() => {
    cy.visit('/static-page');
  });

  it('Visitor sees static page', () => {
    cy.get('[data-cy=static-page-title]').should('be.visible');
  });
});
