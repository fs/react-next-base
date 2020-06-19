describe('Static Page', () => {
  beforeEach(() => {
    cy.visit('/static-page');
  });

  it('should render static page', () => {
    // Arrange
    // Act
    // Assert
    cy.get('[data-cy=static-page-title]')
      .should('be.visible')
      .should('have.css', 'text-align')
      .and('match', /center/);
  });
});
