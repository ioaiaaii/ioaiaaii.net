// Normalize the content JSON into what Works renders: one list of works, releases
// first (releases.json) then selected works (info.json), newest first within each as
// the data lists them, and the collaborations after it.
// Each work is flattened to a common shape { id, kind, year, title, desc, meta, link,
// body, player } so the template renders every row with one component. `id` is the
// row's link anchor (/works#diataxis). `kind` is 'release' or 'work': a release's
// actions are LISTEN ↘ · BUY ↗, a work's LISTEN ↘ alone. `meta` is a release's label
// or a work's "Unreleased"; the row shows it before `year`, a 4-digit string, never a
// month ("JUNE RECORDS, 2019"). `player` is the player its Listen opens, or null: { kind: 'bandcamp',
// id, height } for a release, or { kind: 'soundcloud', url, height } for a work. Its
// height (from the embed code) fits the tracklist, so it doesn't scroll inside.
// A collaboration is { year, title, type, where, link }: other people's work, not
// linked or opened, shown on one line with its VIEW ↗.

// A title as a URL fragment: /works#diataxis, #dec-pdc, #nsa-trusted-networks.
// Accents are stripped and anything that isn't a Latin letter or digit becomes a
// hyphen, so a link survives being pasted anywhere. Non-Latin titles (Δέσμη Φωτός)
// reduce to nothing here; they carry an explicit `slug` in the data instead.
export function slugify(title) {
  return String(title)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// The 4-digit year of a date ("2019-05-18", "2025–26", 2023), or '' when there is none,
// which the rows then leave out rather than print "unde" from String(undefined).
const yearOf = (date) => (date ? String(date).slice(0, 4) : '');

export function buildWorks(info, releases) {
  // Each work gets a page-unique anchor id. An explicit `slug` wins; otherwise the
  // title's slug. A clash (or a title that slugs to nothing) gets a numeric suffix, so
  // two rows never share an id and a link lands on exactly one row. Releases are
  // numbered before selected works, so a release keeps the plain id.
  const used = new Set();
  const anchorId = (slug, title) => {
    const base = slug || slugify(title) || 'work';
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    return id;
  };

  const releaseItems = (releases.releases || []).map((r) => ({
    id: anchorId(r.slug, r.title),
    kind: 'release',
    year: yearOf(r.releaseDate),
    title: r.title,
    desc: r.description || null,
    meta: r.label,
    link: r.bandcamp_link,
    body: null,
    player: r.bandcamp_album_id
      ? { kind: 'bandcamp', id: r.bandcamp_album_id, height: r.bandcamp_player_height || null }
      : null,
  }));

  const workItems = (info.selectedWorks || []).map((w) => ({
    id: anchorId(w.slug, w.title),
    kind: 'work',
    year: yearOf(w.date),
    title: w.title,
    desc: w.description || null,
    meta: w.released,
    link: w.link,
    // A work with a rich body renders that instead of a plain description.
    body: w.body || null,
    player: w.soundcloud_url
      ? { kind: 'soundcloud', url: w.soundcloud_url, height: w.soundcloud_player_height || null }
      : null,
  }));

  const collaborations = (info.collaborations || []).map((c) => ({
    year: yearOf(c.date),
    title: c.title,
    type: c.type || null,
    where: c.where || null,
    link: c.link,
  }));

  return { works: [...releaseItems, ...workItems], collaborations };
}
