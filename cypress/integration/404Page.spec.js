describe('404 page testing', () => {
  it('should return 404-page status', () => {
    cy.request({
      url: '/non-existant-page',
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(404);
    });
  });

  it('should show 404-page title', () => {
    cy.visit('/non-existant-page', { failOnStatusCode: false });
    cy.get('h1').should('contain', "The page you're looking for can't be found.");
  });
});
