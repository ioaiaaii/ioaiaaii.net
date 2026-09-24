import { afterEach, describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import WorkRow from './WorkRow.vue';

// The row-click rules and the "current" marking are easy to break in a refactor and
// only show up in a browser, so they are pinned here against a memory router.
async function setup({ path = '/works', anchor = 'diataxis' } = {}) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/works', component: { render: () => null } }],
  });
  await router.push(path);
  await router.isReady();
  const wrapper = mount(WorkRow, {
    props: { year: '2019', title: 'Diataxis', anchor },
    // No href: clicking a real external link would make jsdom try to navigate.
    slots: { links: '<a class="buy">Buy</a>' },
    global: { plugins: [router] },
  });
  return { router, wrapper };
}

const at = (router) => router.currentRoute.value.fullPath;

describe('WorkRow links', () => {
  afterEach(() => vi.restoreAllMocks());

  it('a click anywhere in the row sets the URL to the work', async () => {
    const { router, wrapper } = await setup();
    await wrapper.find('li > div').trigger('click'); // the year cell
    await flushPromises();
    expect(at(router)).toBe('/works#diataxis');
  });

  it("leaves the row's own links alone", async () => {
    const { router, wrapper } = await setup();
    await wrapper.find('a.buy').trigger('click');
    await flushPromises();
    expect(at(router)).toBe('/works');
  });

  it('ignores modified clicks', async () => {
    const { router, wrapper } = await setup();
    await wrapper.find('li > div').trigger('click', { metaKey: true });
    await flushPromises();
    expect(at(router)).toBe('/works');
  });

  it('ignores a click that ends a text selection', async () => {
    const { router, wrapper } = await setup();
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected words' });
    await wrapper.find('li > div').trigger('click');
    await flushPromises();
    expect(at(router)).toBe('/works');
  });

  it('marks only the linked row as the current location, never "page"', async () => {
    const linked = await setup({ path: '/works#diataxis' });
    expect(linked.wrapper.get('a[href="/works#diataxis"]').attributes('aria-current')).toBe(
      'location',
    );
    expect(linked.wrapper.get('li').classes()).toContain('bg-row-hover');

    const other = await setup({ path: '/works#dec-pdc' });
    expect(
      other.wrapper.get('a[href="/works#diataxis"]').attributes('aria-current'),
    ).toBeUndefined();
    expect(other.wrapper.get('li').classes()).not.toContain('bg-row-hover');
  });

  it('a row without an anchor has no title link and no click behaviour', async () => {
    const { router, wrapper } = await setup({ anchor: null });
    expect(wrapper.find('a[href^="/works#"]').exists()).toBe(false);
    await wrapper.find('li > div').trigger('click');
    await flushPromises();
    expect(at(router)).toBe('/works');
  });
});
