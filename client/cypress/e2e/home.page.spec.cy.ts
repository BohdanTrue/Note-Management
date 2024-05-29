/// <reference types="cypress" />

describe('Language Switcher', () => {
  it('should change the placeholder text when the language is switched', () => {
    cy.visit('/');
    
    cy.contains('button', 'English')
      .should('exist');

      cy.contains('button', 'Ukrainian')
      .should('exist');

    cy.get('input[placeholder="Enter your note..."]')
      .should('exist');

    cy.contains('button', 'Ukrainian').click();

    cy.contains('button', 'Українська')
      .should('exist');

    cy.contains('button', 'Англійська')
      .should('exist');
    
    cy.get('input[placeholder="Введіть своє завдання..."]')
      .should('exist');
    
    cy.contains('button', 'Англійська').click();
    
    cy.get('input[placeholder="Enter your note..."]')
      .should('exist');
  });
});