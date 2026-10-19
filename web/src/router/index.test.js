import { describe, it, expect } from 'vitest';
import router from '@/router';
import indexHtml from '/index.html?raw';
import robotsTxt from '/public/robots.txt?raw';
import sitemapXml from '/public/sitemap.xml?raw';

// The tab titles live in two places (the routes and index.html's static <title>), and
// the per-route <head> is the kind of code a refactor breaks silently: losing the 404's
// noindex would get the page indexed, since the SPA serves it with a 200.
describe('router head', () => {
  it('titles every page "Page - Ioannis Savvaidis", and index.html matches Info', () => {
    const titles = Object.fromEntries(router.getRoutes().map((r) => [r.name, r.meta.title]));
    expect(titles).toEqual({
      Info: 'Info - Ioannis Savvaidis',
      Works: 'Works - Ioannis Savvaidis',
      Live: 'Live - Ioannis Savvaidis',
      NotFound: 'Page not found - Ioannis Savvaidis',
    });
    expect(indexHtml).toContain(`<title>${titles.Info}</title>`);
  });

  // The site description is written three times: Info's route meta and index.html's
  // description and og:description (for crawlers and link previews that don't run JS).
  // The site's address is written in five places: the router's canonical, index.html's
  // og:url and og:image, robots.txt and sitemap.xml. Moving to a new domain must change
  // them all, or search engines are pointed at the old one.
  it('uses one site address everywhere', async () => {
    await router.push('/');
    const origin = new URL(document.head.querySelector('link[rel="canonical"]').href).origin;
    expect(indexHtml).toContain(`<meta property="og:url" content="${origin}/">`);
    expect(indexHtml).toContain(`<meta property="og:image" content="${origin}/og.jpg">`);
    expect(robotsTxt).toContain(`Sitemap: ${origin}/sitemap.xml`);
    const locs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual([`${origin}/`, `${origin}/works`, `${origin}/live`]);
  });

  it("keeps index.html's descriptions the same as Info's", () => {
    const { description } = router.getRoutes().find((r) => r.name === 'Info').meta;
    expect(indexHtml).toContain(`<meta name="description" content="${description}">`);
    expect(indexHtml).toContain(`<meta property="og:description" content="${description}">`);
  });

  it('sets the title and a hash-free canonical, and noindexes only the 404', async () => {
    const robots = () => document.head.querySelector('meta[name="robots"]');
    const canonical = () => document.head.querySelector('link[rel="canonical"]')?.href ?? null;

    await router.push('/works#diataxis');
    expect(document.title).toBe('Works - Ioannis Savvaidis');
    expect(canonical()).toBe('https://ioannissavvaidis.com/works');
    expect(robots()).toBeNull();

    await router.push('/no-such-page');
    expect(robots()?.content).toBe('noindex');
    expect(canonical()).toBeNull();

    await router.push('/');
    expect(document.title).toBe('Info - Ioannis Savvaidis');
    expect(canonical()).toBe('https://ioannissavvaidis.com/');
    expect(robots()).toBeNull();
  });
});
