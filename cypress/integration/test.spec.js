import config from '../../cypress.json';

describe('react-worker-render', () => {
  it('init works', () => {
    cy.visit(config.baseUrl);
    cy.get('#t-input').should('to.have.value','1');
    cy.get('#t-count').should('to.have.text','1');
    cy.get('#t-title').should('to.have.text','react-worker-render@1');;
  });

  it('control input works',()=>{
    cy.visit(config.baseUrl);
    cy.get('#t-input').type('o');
    cy.get('#t-input').should('to.have.value','1');
    cy.get('#t-input').type('{selectAll}22');
    cy.get('#t-input').should('to.have.value','22');
    cy.get('#t-count').should('to.have.text','22');
  });

  it('event works',()=>{
    cy.visit(config.baseUrl);
    cy.get('#t-click').click();
    cy.get('#t-title').click();
    cy.get('#t-input').should('to.have.value','2');
    cy.get('#t-count').should('to.have.text','2');
    cy.get('#t-title').should('to.have.text','react-worker-render@2');;
  });
});