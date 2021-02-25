describe('Activities', () => {
  beforeEach(() => {
    cy.fixture('users').then(users => {
      cy.login(users.validUser);

      cy.get('[data-cy=dropdown-toggler]').click();
      cy.contains('Activity').click();
    });
  });

  it('user sees activities table', () => {
    cy.get('[data-cy=test-activity-table]').should('be.visible');

    cy.get('[data-cy=activity-row]')
      .its('length')
      .should('be.eq', 5);
  });

  it('user changes activity page size', () => {
    cy.get('[data-cy=activity-size-dropdown]').select('25');

    cy.get('[data-cy=activity-row]')
      .its('length')
      .should('be.eq', 25);
  });

  it('user selects event', () => {
    cy.get('[data-cy=activity-event-dropdown]').select('User logged in');

    cy.get('[data-cy=activity-row]').each(item =>
      cy
        .get(item)
        .children('td')
        .eq(1)
        .should('contain', 'User Logged In'),
    );
  });

  it('user change page', () => {
    cy.get('[data-cy=activity-row]').then($rows => {
      const ids = $rows.map((i, el) => el.getAttribute('data-id'));
      cy.get('[data-cy=next-pagination]').click();
      cy.get('[data-cy=activity-row]').then($rows => {
        const expectedIds = [];
        for (let i = 0; i < $rows.length; i++) {
          expectedIds.push($rows[i].getAttribute('data-id'));
        }
        expect(ids.get()).not.to.deep.eq(expectedIds);
        expect(expectedIds.length).not.to.eq(0);
      });
    });
  });
});
