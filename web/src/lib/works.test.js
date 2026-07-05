import { describe, it, expect } from 'vitest';
import { buildSections } from './works.js';

const info = {
  selectedWorks: [
    {
      title: 'Inter-process Communication',
      date: '2025–26',
      released: 'Unreleased',
      link: 'sc://ipc',
      description: 'desc-ipc',
    },
  ],
  collaborations: [
    {
      title: '“Stone Age”',
      date: '2022',
      type: 'Film Scoring',
      where: 'Typical Organization',
      link: 'http://collab',
    },
  ],
};

const releases = {
  releases: [
    {
      title: 'Diataxis',
      releaseDate: '2019-05-18',
      label: 'JUNE Records',
      bandcamp_link: 'http://bc/diataxis',
      description: 'desc-diataxis',
    },
  ],
};

describe('buildSections', () => {
  it('orders sections Releases → Selected works → Collaborations', () => {
    expect(buildSections(info, releases).map((s) => s.label)).toEqual([
      'Releases',
      'Selected works',
      'Collaborations',
    ]);
  });

  it('assigns the correct action label per section', () => {
    const byLabel = Object.fromEntries(
      buildSections(info, releases).map((s) => [s.label, s.action]),
    );
    expect(byLabel).toEqual({
      Releases: 'Buy',
      'Selected works': 'Listen',
      Collaborations: 'View',
    });
  });

  it('derives the release year from the ISO releaseDate', () => {
    const item = buildSections(info, releases)[0].items[0];
    expect(item).toMatchObject({
      year: '2019',
      title: 'Diataxis',
      meta: 'JUNE Records',
      link: 'http://bc/diataxis',
      desc: 'desc-diataxis',
    });
  });

  it('maps selected works with `released` as the meta label', () => {
    const item = buildSections(info, releases)[1].items[0];
    expect(item).toMatchObject({
      year: '2025–26',
      meta: 'Unreleased',
      link: 'sc://ipc',
      desc: 'desc-ipc',
    });
  });

  it('maps collaborations with `type` as meta and no description', () => {
    const item = buildSections(info, releases)[2].items[0];
    expect(item).toMatchObject({ year: '2022', meta: 'Film Scoring', link: 'http://collab' });
    expect(item.desc).toBeNull();
  });

  it('tolerates missing arrays without throwing', () => {
    expect(buildSections({}, {}).map((s) => s.items.length)).toEqual([0, 0, 0]);
  });
});
