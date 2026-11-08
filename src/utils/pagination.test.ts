import { describe, expect, it } from 'vitest';

import { getItemsPerPage, getPageCount, getPageOf, wrapPage } from './pagination';

describe('pagination', () => {
  it('counts a partial last page', () => {
    expect(getPageCount(15, 3)).toBe(5);
    expect(getPageCount(15, 2)).toBe(8);
    expect(getPageCount(6, 4)).toBe(2);
    expect(getPageCount(0, 3)).toBe(1);
  });

  it('keeps pages aligned when the item count is not a multiple of the page size', () => {
    const perPage = 2;
    const pageCount = getPageCount(15, perPage);
    const firstIndexes: number[] = [];
    let page = 0;

    for (let step = 0; step < pageCount + 2; step++) {
      firstIndexes.push(page * perPage);
      page = wrapPage(page + 1, pageCount);
    }

    expect(firstIndexes).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 0, 2]);
  });

  it('wraps previous from the first page to the last one', () => {
    expect(wrapPage(-1, 8)).toBe(7);
    expect(wrapPage(8, 8)).toBe(0);
  });

  it('keeps the first visible item on screen when the page size changes', () => {
    expect(getPageOf(6, 2)).toBe(3);
    expect(getPageOf(7, 2)).toBe(3);
  });

  it('picks items per page from the narrowest matching breakpoint', () => {
    const breakpoints = [
      { max: 1024, items: 2 },
      { max: 640, items: 1 },
    ];

    expect(getItemsPerPage(375, breakpoints, 3)).toBe(1);
    expect(getItemsPerPage(640, breakpoints, 3)).toBe(1);
    expect(getItemsPerPage(800, breakpoints, 3)).toBe(2);
    expect(getItemsPerPage(1440, breakpoints, 3)).toBe(3);
  });
});
