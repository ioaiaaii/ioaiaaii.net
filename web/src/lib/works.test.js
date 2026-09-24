import { describe, it, expect } from 'vitest';
import { buildSections, slugify } from './works.js';
import realInfo from '@/data/info.json';
import realReleases from '@/data/releases.json';

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

  it('gives releases and selected works a link anchor, collaborations none', () => {
    const [rel, works, collabs] = buildSections(info, releases);
    expect(rel.items[0].id).toBe('diataxis');
    expect(works.items[0].id).toBe('inter-process-communication');
    expect(collabs.items[0].id).toBeNull();
  });

  it('prefers an explicit slug and never leaks it onto the item', () => {
    const greek = { selectedWorks: [{ title: 'Δέσμη Φωτός', slug: 'desmi-fotos', date: '2023' }] };
    const item = buildSections(greek, {})[1].items[0];
    expect(item.id).toBe('desmi-fotos');
    expect(item).not.toHaveProperty('slug');
  });

  it('keeps anchors unique across sections and falls back when a title slugs to nothing', () => {
    const clash = {
      selectedWorks: [
        { title: 'Diataxis', date: '2019' },
        { title: 'ΨΥΧΥ', date: '2020' },
        { title: 'ΨΥΧΥ', date: '2021' },
      ],
    };
    const ids = buildSections(clash, releases)
      .flatMap((s) => s.items)
      .map((i) => i.id);
    expect(ids).toEqual(['diataxis', 'diataxis-2', 'work', 'work-2']);
  });
});

describe('the shipped data', () => {
  // Guards the links people share. A work added with a non-Latin title and no `slug`
  // would silently get /works#work; a title in both releases and selected works would
  // push one of them to a -2 suffix and break links already shared.
  it('gives every linked work its natural anchor', () => {
    const natural = [...realReleases.releases, ...realInfo.selectedWorks].map(
      (w) => w.slug || slugify(w.title),
    );
    expect(natural.every(Boolean)).toBe(true);
    const ids = buildSections(realInfo, realReleases)
      .flatMap((s) => s.items)
      .map((i) => i.id)
      .filter(Boolean);
    expect(ids).toEqual(natural);
  });
});

describe('slugify', () => {
  it('lowercases, strips accents and hyphenates everything else', () => {
    expect(slugify('DEC/PDC')).toBe('dec-pdc');
    expect(slugify('NSA Trusted Networks')).toBe('nsa-trusted-networks');
    expect(slugify('Inter-process Communication')).toBe('inter-process-communication');
    expect(slugify('Café  Noir!')).toBe('cafe-noir');
  });

  it('reduces non-Latin titles to nothing, for the caller to override', () => {
    expect(slugify('Δέσμη Φωτός')).toBe('');
  });
});
