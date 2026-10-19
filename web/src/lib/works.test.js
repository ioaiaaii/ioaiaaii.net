import { describe, it, expect } from 'vitest';
import { buildWorks, slugify } from './works.js';
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

describe('buildWorks', () => {
  it('returns one list, releases then selected works, and the collaborations apart', () => {
    const { works, collaborations } = buildWorks(info, releases);
    expect(works.map((w) => [w.kind, w.title])).toEqual([
      ['release', 'Diataxis'],
      ['work', 'Inter-process Communication'],
    ]);
    expect(collaborations.map((c) => c.title)).toEqual(['“Stone Age”']);
  });

  it('takes a release year from the ISO releaseDate and its label as meta', () => {
    const [item] = buildWorks(info, releases).works;
    expect(item).toMatchObject({
      id: 'diataxis',
      year: '2019',
      title: 'Diataxis',
      meta: 'JUNE Records',
      link: 'http://bc/diataxis',
      desc: 'desc-diataxis',
    });
  });

  it('gives a release its Bandcamp player only when it has an album id', () => {
    const withId = { releases: [{ ...releases.releases[0], bandcamp_album_id: '2845458959' }] };
    expect(buildWorks(info, withId).works[0].player).toEqual({
      kind: 'bandcamp',
      id: '2845458959',
      height: null,
    });
    expect(buildWorks(info, releases).works[0].player).toBeNull();
  });

  it("carries the player's height from the data", () => {
    const sized = {
      releases: [
        { ...releases.releases[0], bandcamp_album_id: '2845458959', bandcamp_player_height: 274 },
      ],
    };
    expect(buildWorks(info, sized).works[0].player.height).toBe(274);
  });

  it('gives a work its SoundCloud player only when it has a SoundCloud url', () => {
    const url = 'https://api.soundcloud.com/playlists/1?secret_token=s-x';
    const withUrl = {
      selectedWorks: [
        { ...info.selectedWorks[0], soundcloud_url: url, soundcloud_player_height: 450 },
      ],
    };
    expect(buildWorks(withUrl, releases).works[1].player).toEqual({
      kind: 'soundcloud',
      url,
      height: 450,
    });
    expect(buildWorks(info, releases).works[1].player).toBeNull();
  });

  it('gives a selected work a 4-digit year and `released` as meta', () => {
    const item = buildWorks(info, releases).works[1];
    expect(item).toMatchObject({
      year: '2025',
      meta: 'Unreleased',
      link: 'sc://ipc',
      desc: 'desc-ipc',
    });
  });

  it('keeps a collaboration to its line: year, title, type, where and link', () => {
    expect(buildWorks(info, releases).collaborations[0]).toEqual({
      year: '2022',
      title: '“Stone Age”',
      type: 'Film Scoring',
      where: 'Typical Organization',
      link: 'http://collab',
    });
  });

  it('leaves the year empty when a date is missing, never "unde"', () => {
    const undated = {
      selectedWorks: [{ title: 'Untitled' }],
      collaborations: [{ title: 'Someone' }],
    };
    const { works, collaborations } = buildWorks(undated, { releases: [{ title: 'Record' }] });
    expect(works.map((w) => w.year)).toEqual(['', '']);
    expect(collaborations[0].year).toBe('');
  });

  it('tolerates missing arrays without throwing', () => {
    expect(buildWorks({}, {})).toEqual({ works: [], collaborations: [] });
  });

  it('prefers an explicit slug and never leaks it onto the item', () => {
    const greek = { selectedWorks: [{ title: 'Δέσμη Φωτός', slug: 'desmi-fotos', date: '2023' }] };
    const [item] = buildWorks(greek, {}).works;
    expect(item.id).toBe('desmi-fotos');
    expect(item).not.toHaveProperty('slug');
  });

  it('keeps anchors unique and falls back when a title slugs to nothing', () => {
    const clash = {
      selectedWorks: [
        { title: 'Diataxis', date: '2019' },
        { title: 'ΨΥΧΥ', date: '2020' },
        { title: 'ΨΥΧΥ', date: '2021' },
      ],
    };
    const ids = buildWorks(clash, releases).works.map((w) => w.id);
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
    const ids = buildWorks(realInfo, realReleases).works.map((w) => w.id);
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
