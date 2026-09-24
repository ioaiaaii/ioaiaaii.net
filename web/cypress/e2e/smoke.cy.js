// Smoke tests against the production build (`npm run test:e2e` builds, serves it with
// vite preview, then runs these). The app scrolls an inner container (#scroll-root),
// not the window, so scroll positions are read and set there.

const scrollRoot = () => cy.get('#scroll-root');
const HIDDEN_HEADER = '-translate-y-[115%]';

// A linked work has landed when its top sits at its own scroll-margin (the
// --anchor-offset the app sets): at the top of the screen, like a heading link.
const landedOn = (id) =>
  cy.get(`#${id}`).should(($row) => {
    const top = $row[0].getBoundingClientRect().top;
    const margin = parseFloat(getComputedStyle($row[0]).scrollMarginTop);
    expect(Math.abs(top - margin), `#${id} top vs its scroll-margin`).to.be.lessThan(2);
  });

describe('pages', () => {
  [
    ['/', 'Info - Ioannis Savvaidis', 'Profile'],
    ['/works', 'Works - Ioannis Savvaidis', 'Releases'],
    ['/live', 'Live - Ioannis Savvaidis', 'Performances'],
  ].forEach(([path, title, label]) => {
    it(`${path} renders with its tab title`, () => {
      cy.visit(path);
      cy.title().should('eq', title);
      cy.contains('h2', label).should('be.visible');
    });
  });

  it('the header links move between pages', () => {
    cy.visit('/');
    cy.get('header nav').contains('a', 'Works').click();
    cy.location('pathname').should('eq', '/works');
    cy.get('header nav').contains('a', 'Live').click();
    cy.location('pathname').should('eq', '/live');
  });

  it('an unknown path shows the 404, kept out of search', () => {
    cy.visit('/no-such-page');
    cy.title().should('eq', 'Page not found - Ioannis Savvaidis');
    cy.get('meta[name="robots"]').should('have.attr', 'content', 'noindex');
  });
});

describe('work links', () => {
  it('a shared link lands on the work, tinted, with the header out of the way', () => {
    cy.visit('/works#dec-pdc');
    landedOn('dec-pdc');
    cy.get('#dec-pdc').should('have.class', 'bg-row-hover');
    cy.get('#dec-pdc a[href="/works#dec-pdc"]').should('have.attr', 'aria-current', 'location');
    cy.get('header').should('have.class', HIDDEN_HEADER);

    // Scrolling up brings the header back, as on any page. Wait for the fonts first:
    // until then the app may re-land (a scripted scroll isn't visitor input).
    cy.document().then((doc) => doc.fonts.ready);
    scrollRoot().then(($root) => $root[0].scrollBy(0, -200));
    cy.get('header').should('not.have.class', HIDDEN_HEADER);
  });

  it('clicking a title, or anywhere in a row, sets the URL and lands on it', () => {
    cy.visit('/works');
    cy.get('#ethertype a[href="/works#ethertype"]').click();
    cy.location('hash').should('eq', '#ethertype');
    landedOn('ethertype');

    cy.get('#inter-process-communication p').click();
    cy.location('hash').should('eq', '#inter-process-communication');
    landedOn('inter-process-communication');
  });

  it('clicking the work the URL already names returns to it', () => {
    cy.visit('/works#dec-pdc');
    landedOn('dec-pdc');
    cy.document().then((doc) => doc.fonts.ready);
    scrollRoot().then(($root) => $root[0].scrollBy(0, 1500));
    // trigger without scrolling (force: it is off-screen now): a real click would
    // scroll the title into view itself, which is what's under test.
    cy.get('#dec-pdc a[href="/works#dec-pdc"]').trigger('click', {
      force: true,
      scrollBehavior: false,
    });
    landedOn('dec-pdc');
  });

  it("leaves a row's Buy/Listen links alone and gives Collaborations no links", () => {
    cy.visit('/works');
    cy.get('#nsa-trusted-networks a[href*="bandcamp"]')
      .then(($a) => $a.on('click', (e) => e.preventDefault())) // stay on the page
      .click();
    cy.location('hash').should('eq', '');

    cy.contains('h2', 'Collaborations').parent().find('a[href^="/works#"]').should('not.exist');
  });
});

describe('layout', () => {
  it('Works and Live titles start at the same x', () => {
    const titleX = () =>
      cy
        .get('main li')
        .first()
        .children()
        .eq(1)
        .then(($title) => Math.round($title[0].getBoundingClientRect().left));

    [
      [375, 812],
      [1440, 900],
    ].forEach(([w, h]) => {
      cy.viewport(w, h);
      cy.visit('/works');
      titleX().then((worksX) => {
        cy.visit('/live');
        titleX().should('eq', worksX);
      });
    });
  });

  it('on a phone, Info orders the photo, then the profile, then contact', () => {
    cy.viewport(375, 812);
    cy.visit('/');
    const top = ($el) => $el[0].getBoundingClientRect().top;
    cy.get('main figure').then(($photo) => {
      cy.contains('h2', 'Profile').then(($profile) => {
        cy.contains('h2', 'Contact').then(($contact) => {
          expect(top($photo)).to.be.lessThan(top($profile));
          expect(top($profile)).to.be.lessThan(top($contact));
        });
      });
    });
  });

  it('Superluminal Motion sets its maths with full-size operator hats', () => {
    cy.visit('/works#superluminal-motion');
    cy.get('#superluminal-motion math[display="block"]').should('have.length', 1);
    cy.get('#superluminal-motion mover').each(($hat) => {
      expect($hat.attr('accent')).to.eq('true');
    });
  });
});
