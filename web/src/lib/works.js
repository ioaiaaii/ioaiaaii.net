// Normalize the content JSON into the ordered Works sections.
// Order is intentional: Releases → Selected works → Collaborations.
// Each item is flattened to a common shape { id, year, title, desc, meta, link }
// so the template renders every section with one row component. `id` is the row's
// link anchor, or null for Collaborations, which aren't linked.

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

export function buildSections(info, releases) {
  // Each linked row gets a page-unique anchor id. An explicit `slug` wins; otherwise
  // the title's slug. A clash (or a title that slugs to nothing) gets a numeric
  // suffix, so two rows never share an id and a link lands on exactly one row.
  // Releases are numbered before selected works, so a release keeps the plain id.
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
    year: r.releaseDate.slice(0, 4),
    title: r.title,
    desc: r.description,
    meta: r.label,
    link: r.bandcamp_link,
  }));

  const workItems = (info.selectedWorks || []).map((w) => ({
    id: anchorId(w.slug, w.title),
    year: w.date,
    title: w.title,
    desc: w.description || null,
    meta: w.released,
    link: w.link,
    // A work with a rich body renders that instead of a plain description.
    body: w.body || null,
  }));

  const collabItems = (info.collaborations || []).map((c) => ({
    id: null,
    year: c.date,
    title: c.title,
    desc: null,
    meta: c.type,
    link: c.link,
  }));

  return [
    { label: 'Releases', action: 'Buy', items: releaseItems },
    { label: 'Selected works', action: 'Listen', items: workItems },
    { label: 'Collaborations', action: 'View', items: collabItems },
  ];
}
