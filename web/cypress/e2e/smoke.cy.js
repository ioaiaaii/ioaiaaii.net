// Smoke tests against the production build (`npm run test:e2e` builds, serves it with
// vite preview, then runs these). The app scrolls an inner container (#scroll-root),
// not the window, so scroll positions are read and set there.

const scrollRoot = () => cy.get('#scroll-root');

// A linked work has landed when its top sits at its own scroll-margin (the
// --anchor-offset the app sets): at the top of the screen, like a heading link.
const landedOn = (id) =>
  cy.get(`#${id}`).should(($row) => {
    const top = $row[0].getBoundingClientRect().top;
    const margin = parseFloat(getComputedStyle($row[0]).scrollMarginTop);
    expect(Math.abs(top - margin), `#${id} top vs its scroll-margin`).to.be.lessThan(2);
  });

describe('pages', () => {
  // Info's Profile, Works' Releases and Live's Performances are headings for screen
  // readers only (sr-only), so those are checked to exist, not to be seen.
  [
    ['/', 'Info - Ioannis Savvaidis', 'Profile', 'exist'],
    ['/works', 'Works - Ioannis Savvaidis', 'Releases', 'exist'],
    ['/live', 'Live - Ioannis Savvaidis', 'Performances', 'exist'],
  ].forEach(([path, title, label, state]) => {
    it(`${path} renders with its tab title`, () => {
      cy.visit(path);
      cy.title().should('eq', title);
      cy.contains('h2', label).should(state);
    });
  });

  it('the header links move between pages', () => {
    cy.visit('/');
    cy.get('header nav').contains('a', 'Works').click();
    cy.location('pathname').should('eq', '/works');
    cy.get('header nav').contains('a', 'Live').click();
    cy.location('pathname').should('eq', '/live');
  });

  // The keyboard scrolls whatever holds focus, and the page scrolls #scroll-root, so
  // focus belongs inside <main>: after a load, after a header link (even to the page
  // already open), and a row opened on Works keeps it on its own + button. Cypress can't
  // press real keys, so this checks where focus is, which is what the keys follow.
  it('keeps keyboard focus in the page, so Page Down and the arrows scroll it', () => {
    cy.visit('/works');
    cy.focused().should('match', 'main');
    cy.get('header nav').contains('a', 'Live').click();
    cy.location('pathname').should('eq', '/live');
    cy.focused().should('match', 'main');
    cy.get('header nav').contains('a', 'Live').click();
    cy.focused().should('match', 'main');
    cy.visit('/works');
    cy.get('#dec-pdc > button').click();
    cy.focused().should('have.attr', 'aria-controls', 'dec-pdc-body');
  });

  it('an unknown path shows the 404, kept out of search', () => {
    cy.visit('/no-such-page');
    cy.title().should('eq', 'Page not found - Ioannis Savvaidis');
    cy.get('meta[name="robots"]').should('have.attr', 'content', 'noindex');
  });
});

// A player frame is sandboxed (src/lib/players.js): it may run its own code and open
// links in a new tab, never navigate this page.
const sandboxed = (frame) =>
  cy
    .get(frame)
    .should('have.attr', 'sandbox')
    .and('include', 'allow-scripts')
    .and('include', 'allow-popups')
    .and('not.include', 'allow-top-navigation');

describe('works', () => {
  const head = (id) => cy.get(`#${id} > button`);
  const box = (el) => (el.jquery ? el[0] : el).getBoundingClientRect();

  it('a shared link opens the work and lands on it, with the header out of the way', () => {
    cy.visit('/works#dec-pdc');
    landedOn('dec-pdc');
    head('dec-pdc').should('have.attr', 'aria-expanded', 'true');
    cy.get('header').should('have.attr', 'data-hidden');

    // Scrolling up brings the header back, as on any page. Wait for the fonts first:
    // until then the app may re-land (a scripted scroll isn't visitor input).
    cy.document().then((doc) => doc.fonts.ready);
    scrollRoot().then(($root) => $root[0].scrollBy(0, -200));
    cy.get('header').should('not.have.attr', 'data-hidden');
  });

  // Closed, a row is one line and its body is inert. Open (+ → ×), its text sits on
  // the left, level with its image on the right; on a phone the image comes first.
  it('opens a row on +, its text beside its image, and closes it again', () => {
    cy.viewport(1440, 900);
    cy.visit('/works');
    head('diataxis').should('have.attr', 'aria-expanded', 'false');
    cy.get('#diataxis-body').should('have.attr', 'inert');
    head('diataxis').click().should('have.attr', 'aria-expanded', 'true');
    cy.get('#diataxis-body').should('not.have.attr', 'inert');
    cy.get('#diataxis img').should(($img) => {
      const text = box(Cypress.$('#diataxis p'));
      expect(box($img).left, 'image right of the text').to.be.greaterThan(text.right);
      expect(Math.abs(box($img).top - text.top), 'image level with the text').to.be.lessThan(2);
    });
    head('diataxis').click().should('have.attr', 'aria-expanded', 'false');
    cy.get('#ethertype img').should('not.exist');

    cy.viewport(375, 812);
    cy.visit('/works');
    head('dec-pdc').click();
    cy.get('#dec-pdc img').should(($img) => {
      expect(box($img).bottom, 'image above the text').to.be.at.most(
        box(Cypress.$('#dec-pdc p')).top,
      );
    });
  });

  it("leaves a release's Buy alone, and Collaborations only link out", () => {
    cy.visit('/works');
    head('nsa-trusted-networks').click();
    cy.get('#nsa-trusted-networks a[href*="bandcamp"]')
      .then(($a) => $a.on('click', (e) => e.preventDefault())) // stay on the page
      .click();
    cy.location('hash').should('eq', '');

    cy.contains('h2', 'Collaborations')
      .parent()
      .within(() => {
        cy.get('a[href^="/works#"]').should('not.exist');
        cy.get('li').each(($li) => expect($li.find('a[target="_blank"]')).to.have.length(1));
      });
  });

  // Nothing from Bandcamp loads until Listen: no frame before, one bandcamp.com frame
  // after, gone again on Close, and gone with its row; the URL is left alone.
  // Listen↘ (it opens here, below; Buy↗ leaves the site), and Close↖ once open.
  it("opens a release's Bandcamp player only on Listen, and closes it", () => {
    const arrow = ($button) => getComputedStyle($button[0], '::after').content;
    cy.viewport(1440, 900);
    cy.visit('/works');
    head('diataxis').click();
    cy.get('#diataxis iframe').should('not.exist');
    cy.get('#diataxis')
      .contains('button', 'Listen')
      .should(($b) => expect(arrow($b)).to.include('↘'))
      .click();
    cy.get('#diataxis')
      .contains('button', 'Close')
      .should(($b) => expect(arrow($b)).to.include('↖'));
    // The player opens under the text, in its column.
    cy.get('#diataxis iframe').should(($frame) => {
      const desc = box(Cypress.$('#diataxis p'));
      expect(Math.abs(box($frame).left - desc.left)).to.be.lessThan(2);
      expect(box($frame).top).to.be.greaterThan(desc.bottom);
    });
    cy.location('hash').should('eq', '');
    cy.get('#diataxis iframe')
      .should('have.attr', 'src')
      .and('match', /^https:\/\/bandcamp\.com\/EmbeddedPlayer\/album=\d+\//)
      .and('include', '/tracklist=true/');
    sandboxed('#diataxis iframe');
    cy.get('#diataxis').contains('button', 'Close').click();
    cy.get('#diataxis iframe').should('not.exist');

    // Closing the row closes its player too, so nothing plays unseen.
    cy.get('#diataxis').contains('button', 'Listen').click();
    cy.get('#diataxis iframe').should('exist');
    head('diataxis').click();
    cy.get('#diataxis iframe').should('not.exist');
  });

  // A work's player is SoundCloud's, and its Listen is its only action.
  it("opens a work's SoundCloud player on Listen, in place of a link", () => {
    cy.visit('/works');
    head('superluminal-motion').click();
    cy.get('#superluminal-motion a[href*="soundcloud"]').should('not.exist');
    cy.get('#superluminal-motion iframe').should('not.exist');
    cy.get('#superluminal-motion').contains('button', 'Listen').click();
    cy.get('#superluminal-motion iframe')
      .should('have.attr', 'src')
      .and('match', /^https:\/\/w\.soundcloud\.com\/player\/\?url=/);
    sandboxed('#superluminal-motion iframe');
    cy.get('#superluminal-motion').contains('button', 'Close').click();
    cy.get('#superluminal-motion iframe').should('not.exist');
  });

  it('Superluminal Motion sets its maths with full-size operator hats', () => {
    cy.visit('/works#superluminal-motion');
    cy.get('#superluminal-motion math[display="block"]').should('have.length', 1).and('be.visible');
    cy.get('#superluminal-motion mover').each(($hat) => {
      expect($hat.attr('accent')).to.eq('true');
    });
  });
});

describe('layout', () => {
  // Everything starts on one line, after the + sign of a Works row (the indent): the
  // works' titles, the Collaborations, Live's titles and Info's text. On a phone the
  // indent goes: Live and Info start at the page edge, under the wordmark.
  it('titles and text start on one line on every page', () => {
    const left = ($el) => Math.round($el[0].getBoundingClientRect().left);
    const starts = {};
    const record = (key, selector) =>
      cy
        .get(selector)
        .first()
        .then(($el) => (starts[key] = left($el)));
    [
      [1440, 900, 31],
      [375, 812, 0],
    ].forEach(([w, h, indent]) => {
      cy.viewport(w, h);
      cy.visit('/works');
      record('mark', 'header a');
      cy.contains('#ethertype > button span', 'EtherType').then(($el) => (starts.work = left($el)));
      cy.visit('/live');
      record('live', 'main li > span');
      cy.visit('/');
      record('info', 'main p');
      cy.then(() => {
        expect(starts.live, `Live at ${w}`).to.eq(starts.mark + indent);
        expect(starts.info, `Info at ${w}`).to.eq(starts.mark + indent);
        // The + sign stays on a phone, so a work's title keeps its 31px.
        expect(starts.work, `Works at ${w}`).to.eq(starts.mark + 31);
      });
    });
  });

  // The + keeps its own column: when a long title pushes its "YEAR · META" onto a
  // second line, that line starts under the title.
  it("on a phone, a long title's year and label wrap under the title", () => {
    cy.viewport(375, 812);
    cy.visit('/works');
    cy.contains('#inter-process-communication > button span', 'Inter-process').then(($title) => {
      cy.get('#inter-process-communication > button .mono-meta').should(($meta) => {
        const title = $title[0].getBoundingClientRect();
        const meta = $meta[0].getBoundingClientRect();
        expect(meta.top, 'on its own line').to.be.greaterThan(title.bottom - 1);
        expect(Math.round(meta.left), 'under the title').to.eq(Math.round(title.left));
      });
    });
  });

  it('Live puts each date first, as DD.MM.YYYY', () => {
    cy.visit('/live');
    cy.get('main li').first().children().first().should('have.text', '16.04.2026');
    cy.contains('main li', 'KOCMOC').children().first().should('have.text', '03.12.2022');
  });

  // A Live event's links sit at the right edge, as Collaborations' VIEW does; when
  // they don't fit beside it (a long name, a phone), they wrap onto their own line,
  // still at the right, and the event keeps the column's full width.
  it("Live's links sit at the right edge, and wrap under the event on a phone", () => {
    const box = ($el) => $el[0].getBoundingClientRect();
    const row = () => cy.contains('main li', 'Devika');
    [
      [1440, 900, 'on the same line'],
      [375, 812, 'under the event'],
    ].forEach(([w, h, where]) => {
      cy.viewport(w, h);
      cy.visit('/live');
      row().then(($li) => {
        cy.wrap($li).within(() => {
          cy.contains('span', 'Devika').then(($name) => {
            cy.contains('a', 'Listen').should(($listen) => {
              expect(Math.round(box($listen).right), 'at the right edge').to.eq(
                Math.round(box($li).right),
              );
              if (w > 760) expect(box($listen).top, where).to.be.closeTo(box($name).top, 4);
              else expect(box($listen).top, where).to.be.greaterThan(box($name).bottom - 1);
            });
          });
        });
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
});
