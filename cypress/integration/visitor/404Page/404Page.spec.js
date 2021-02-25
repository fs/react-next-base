describe('404 Page', () => {
  it('Visitor sees 404 page title', () => {
    const expectedTitle = `The page you're looking for can't be found.`;

    cy.visit('/non-existant-page', { failOnStatusCode: false });

    cy.get('h1').should('contain', expectedTitle);
  });
});
