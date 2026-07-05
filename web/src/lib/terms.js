// Split prose into plain/term segments so the phrases in `terms` can render
// as inline emphasis (IBM Plex Serif italic) without dangerouslySetInnerHTML.
// Returns an ordered list of { text, term } segments; joining every `text`
// reproduces the original string exactly.

export function splitTerms(text, terms) {
  const source = String(text ?? '');
  if (!terms || !terms.length) return [{ text: source, term: false }];

  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'g');

  return source
    .split(re)
    .filter((s) => s !== '')
    .map((s) => ({ text: s, term: terms.includes(s) }));
}
