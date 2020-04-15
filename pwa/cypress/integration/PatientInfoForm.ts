// Testing for the Patient Info Form fields
/// <reference types="cypress" />

describe('female-only fields show only if Female is selected', () => {
  const femaleOnlyFormFields = [
    'Pregnant?',
    'LMP',
    'Wants Planning?'
  ]

  it('does not display fields is no slection is made', function () {
    cy.visit('http://localhost:3000');
    femaleOnlyFormFields.forEach((fieldText) => {
      cy.contains(fieldText).should('not.exist');
    })
  });

  it('does not display fields if Male is selected', function () {
    cy.visit('http://localhost:3000');
    cy.get('#male-button').click();
    femaleOnlyFormFields.forEach((fieldText) => {
      cy.contains(fieldText).should('not.exist');
    })
  });

  it('displays fields if Female is selected', function () {
    cy.visit('http://localhost:3000');
    cy.get('#female-button').click();
    femaleOnlyFormFields.forEach((fieldText) => {
      cy.contains(fieldText);
    })
  });
});

export { };