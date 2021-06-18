describe('Activities Page', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      cy.login(validUser);

      cy.get('[data-cy=dropdown-toggler]').click();
      cy.contains('Activity').click();
    });
  });

  afterEach(() => {
    cy.signout();
  });

  it('User sees activities table', () => {
    cy.get('[data-cy=activity-table]').should('be.visible');

    cy.get('[data-cy=activity-row]').its('length').should('be.eq', 5);
  });

  it('User changes activity page size', () => {
    cy.get('[data-cy=activity-size-dropdown]').select('25');

    cy.get('[data-cy=activity-row]').its('length').should('be.eq', 25);
  });

  it('User selects event', () => {
    cy.get('[data-cy=activity-event-dropdown]').select('User logged in');

    cy.get('[data-cy=activity-row]').each((item) =>
      cy.get(item).children('td').eq(1).should('contain', 'User Logged In'),
    );
  });

  it('User changes page', () => {
    cy.get('[data-cy=activity-row]').then((firstPageRows) => {
      const ids = firstPageRows.map((i, el) => el.getAttribute('data-id'));
      cy.get('[data-cy=next-pagination]').click();
      cy.get('[data-cy=activity-row]').then((secondPageRows) => {
        const expectedIds = [];
        Array.from(secondPageRows).forEach((row) => {
          expectedIds.push(row.getAttribute('data-id'));
        });
        expect(ids.get()).not.to.deep.eq(expectedIds);
        expect(expectedIds.length).not.to.eq(0);
      });
    });
  });
});
