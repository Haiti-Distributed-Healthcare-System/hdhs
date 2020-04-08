// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Homepage', () => {
  it('shows login button', function () {
    cy.visit('http://localhost:3000')
    cy.get('.am-button').contains('Login')
  })
})

export {};