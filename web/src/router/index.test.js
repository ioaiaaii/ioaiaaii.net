import { describe, it, expect } from 'vitest';
import router from '@/router';
import indexHtml from '/index.html?raw';

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

  it('sets the title and a hash-free canonical, and noindexes only the 404', async () => {
    const robots = () => document.head.querySelector('meta[name="robots"]');
    const canonical = () => document.head.querySelector('link[rel="canonical"]').href;

    await router.push('/works#diataxis');
    expect(document.title).toBe('Works - Ioannis Savvaidis');
    expect(canonical()).toBe('https://ioaiaaii.net/works');
    expect(robots()).toBeNull();

    await router.push('/no-such-page');
    expect(robots()?.content).toBe('noindex');

    await router.push('/');
    expect(document.title).toBe('Info - Ioannis Savvaidis');
    expect(robots()).toBeNull();
  });
});
