// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';

Cypress.Commands.add('signin', ({ email, password, path = '/' }) => {
  cy.visit('/signin');
  cy.get('[data-cy=input-email]').type(email);
  cy.get('[data-cy=input-password]').type(password);
  cy.get('[data-cy=submit-button]').click();
  cy.location('pathname').should('eq', path);
});

Cypress.Commands.add('signup', ({ email, password, firstName, lastName, path = '/' }) => {
  cy.visit('/signup');

  cy.get('[data-cy=input-firstName]').type(firstName);
  cy.get('[data-cy=input-lastName]').type(lastName);
  cy.get('[data-cy=input-email]').type(email);
  cy.get('[data-cy=input-password]').type(password);

  cy.get('[data-cy=submit-button]').click();
  cy.location('pathname').should('eq', path);
});

Cypress.Commands.add('passwordRecovery', ({ email }) => {
  cy.visit('/login');
  cy.get('[data-cy=tab-password-recovery]').click();

  cy.get('[data-cy=email]').type(email);

  cy.get('[data-cy=submit-button]').click();
});

Cypress.Commands.add('signout', () => {
  cy.get('body').then(($body) => {
    if ($body.find('[data-cy=dropdown-toggler]').length > 0) {
      cy.get('[data-cy=dropdown-toggler]').click();
      cy.get('[data-cy=sign-out]').click();
    }
  });
});
