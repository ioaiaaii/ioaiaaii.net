// Normalize the content JSON into the ordered Works sections.
// Order is intentional: Releases → Selected works → Collaborations.
// Each item is flattened to a common shape { year, title, desc, meta, link }
// so the template renders every section with one row component.

export function buildSections(info, releases) {
  const releaseItems = (releases.releases || []).map((r) => ({
    year: r.releaseDate.slice(0, 4),
    title: r.title,
    desc: r.description,
    meta: r.label,
    link: r.bandcamp_link,
  }));

  const workItems = (info.selectedWorks || []).map((w) => ({
    year: w.date,
    title: w.title,
    desc: w.description || null,
    meta: w.released,
    link: w.link,
    // A work with a rich body renders that instead of a plain description.
    body: w.body || null,
  }));

  const collabItems = (info.collaborations || []).map((c) => ({
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
