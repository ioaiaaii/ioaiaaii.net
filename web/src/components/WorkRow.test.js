import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import WorkRow from './WorkRow.vue';

// The disclosure's wiring (the head as a button that names its body, the body inert
// while closed, the toggle left to the parent) is easy to break in a refactor and
// only shows up with a keyboard or a screen reader, so it is pinned here.
const row = (props = {}, slots = {}) =>
  mount(WorkRow, {
    props: { anchor: 'diataxis', year: '2019', title: 'Diataxis', meta: 'JUNE Records', ...props },
    slots,
  });

describe('WorkRow', () => {
  it('is one line closed: the title, then "META, YEAR", in a button', () => {
    const head = row().get('li > button');
    expect(head.attributes('type')).toBe('button');
    expect(head.text()).toContain('Diataxis');
    expect(head.text()).toContain('JUNE Records, 2019');
  });

  it('takes the anchor as its id, for /works#diataxis', () => {
    expect(row().get('li').attributes('id')).toBe('diataxis');
  });

  it('names its body, which is inert while closed', () => {
    const wrapper = row();
    const head = wrapper.get('li > button');
    expect(head.attributes('aria-expanded')).toBe('false');
    expect(head.attributes('aria-controls')).toBe('diataxis-body');
    expect(wrapper.get('#diataxis-body').attributes()).toHaveProperty('inert');
  });

  it('opens when the parent says so', () => {
    const wrapper = row({ open: true });
    expect(wrapper.get('li > button').attributes('aria-expanded')).toBe('true');
    expect(wrapper.get('#diataxis-body').attributes()).not.toHaveProperty('inert');
  });

  it('leaves opening to the parent: a click on the head only asks', async () => {
    const wrapper = row();
    await wrapper.get('li > button').trigger('click');
    expect(wrapper.emitted('toggle')).toHaveLength(1);
    expect(wrapper.get('li > button').attributes('aria-expanded')).toBe('false');
  });

  it('sets the description with its terms in italic, then the actions and the image', () => {
    const wrapper = row(
      { desc: 'A record called Diataxis.', terms: ['Diataxis'], open: true },
      { actions: '<a class="buy">Buy</a>', media: '<img class="cover">' },
    );
    const body = wrapper.get('#diataxis-body');
    expect(body.get('p span.italic').text()).toBe('Diataxis');
    expect(body.find('a.buy').exists()).toBe(true);
    expect(body.find('img.cover').exists()).toBe(true);
  });

  it('marks a Greek title as Greek, so it uppercases without accents', () => {
    const wrapper = row({ anchor: 'desmi-fotos', title: 'Δέσμη Φωτός' });
    expect(wrapper.get('li > button span[lang="el"]').text()).toBe('Δέσμη Φωτός');
  });
});
