import { describe, expect, it } from 'vitest';

import { toAppLanguage } from './languages';

describe('toAppLanguage', () => {
  it('keeps supported base languages', () => {
    expect(toAppLanguage('en')).toBe('en');
    expect(toAppLanguage('ru')).toBe('ru');
    expect(toAppLanguage('pl')).toBe('pl');
  });

  it('strips the region from browser language tags', () => {
    expect(toAppLanguage('ru-RU')).toBe('ru');
    expect(toAppLanguage('pl-PL')).toBe('pl');
    expect(toAppLanguage('en-US')).toBe('en');
  });

  it('falls back to English for unsupported or missing languages', () => {
    expect(toAppLanguage('de-DE')).toBe('en');
    expect(toAppLanguage('')).toBe('en');
    expect(toAppLanguage(undefined)).toBe('en');
  });
});
