// Split prose into plain/term segments so the phrases in `terms` can render
// as inline emphasis (Newsreader italic) without v-html.
// Returns an ordered list of { text, term } segments; joining every `text`
// reproduces the original string exactly.

export function splitTerms(text, terms) {
  const source = String(text ?? '');
  if (!terms || !terms.length) return [{ text: source, term: false }];

  // Longest first, so a term that is a substring of another can't be shadowed by it.
  // \w-boundaries, so a term doesn't fire inside a larger word — "trusted" must not
  // match inside "entrusted". The boundaries are zero-width and outside the capture
  // group, so the split stays lossless (joining every `text` still reproduces input).
  const escaped = [...terms]
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(?<!\\w)(${escaped.join('|')})(?!\\w)`, 'g');

  return source
    .split(re)
    .filter((s) => s !== '')
    .map((s) => ({ text: s, term: terms.includes(s) }));
}
