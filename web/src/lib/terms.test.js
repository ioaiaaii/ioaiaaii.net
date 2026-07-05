import { describe, it, expect } from 'vitest';
import { splitTerms } from './terms.js';

const TERMS = ['Tensor Music', 'apparent Superluminal Motion', 'Quantum nonlocality'];

describe('splitTerms', () => {
  it('returns a single plain segment when there are no terms', () => {
    expect(splitTerms('hello world', [])).toEqual([{ text: 'hello world', term: false }]);
    expect(splitTerms('hello world', undefined)).toEqual([{ text: 'hello world', term: false }]);
  });

  it('marks a matched term in the middle', () => {
    expect(splitTerms('the concept of Tensor Music — an approach', ['Tensor Music'])).toEqual([
      { text: 'the concept of ', term: false },
      { text: 'Tensor Music', term: true },
      { text: ' — an approach', term: false },
    ]);
  });

  it('matches a term at the start and end of the string', () => {
    expect(splitTerms('Tensor Music', ['Tensor Music'])).toEqual([
      { text: 'Tensor Music', term: true },
    ]);
    expect(splitTerms('about Quantum nonlocality', ['Quantum nonlocality'])).toEqual([
      { text: 'about ', term: false },
      { text: 'Quantum nonlocality', term: true },
    ]);
  });

  it('marks multiple distinct terms in one string', () => {
    const segments = splitTerms(
      'focused on apparent Superluminal Motion and Quantum nonlocality today',
      TERMS,
    );
    expect(segments.filter((s) => s.term).map((s) => s.text)).toEqual([
      'apparent Superluminal Motion',
      'Quantum nonlocality',
    ]);
  });

  it('leaves text untouched when no term is present', () => {
    expect(splitTerms('nothing to see here', TERMS)).toEqual([
      { text: 'nothing to see here', term: false },
    ]);
  });

  it('escapes regex-special characters so terms match literally', () => {
    expect(splitTerms('value a.b and axb', ['a.b'])).toEqual([
      { text: 'value ', term: false },
      { text: 'a.b', term: true },
      { text: ' and axb', term: false },
    ]);
  });

  it('is lossless — joining the segments reconstructs the original', () => {
    const input = 'focused on apparent Superluminal Motion and Quantum nonlocality: warped';
    const rebuilt = splitTerms(input, TERMS)
      .map((s) => s.text)
      .join('');
    expect(rebuilt).toBe(input);
  });
});
