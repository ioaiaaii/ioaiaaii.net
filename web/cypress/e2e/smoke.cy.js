describe('ioaiaaii.net smoke test', () => {
  it('loads the Info page', () => {
    cy.visit('/');
    cy.contains('.wordmark', 'Ioannis Savvaidis');
    cy.contains('h2.section-label', 'Profile');
    cy.contains('h2.section-label', 'Contact');
    cy.get('.contact-email').should('have.attr', 'href').and('include', 'mailto:');
    cy.get('.info-side img').should('be.visible');
  });

  it('navigates to Works with the sections in order', () => {
    cy.visit('/');
    cy.get('nav.primary').contains('a', 'Works').click();
    cy.location('pathname').should('eq', '/works');
    cy.get('.works-main .section-label').then(($els) => {
      const labels = [...$els].map((el) => el.textContent.trim());
      expect(labels).to.deep.equal(['Releases', 'Selected works', 'Collaborations']);
    });
    cy.get('.work').its('length').should('be.gt', 0);
    cy.get('.works-side img').should('be.visible');
  });

  it('navigates to Live and lists performances', () => {
    cy.visit('/');
    cy.get('nav.primary').contains('a', 'Live').click();
    cy.location('pathname').should('eq', '/live');
    cy.get('#live .work').its('length').should('be.gt', 0);
    cy.get('#live .work').first().find('.year').should('not.be.empty');
  });

  it('shows a 404 for unknown routes and links home', () => {
    cy.visit('/does-not-exist', { failOnStatusCode: false });
    cy.contains('404');
    cy.contains('a', 'Back to Info').click();
    cy.location('pathname').should('eq', '/');
  });
});
