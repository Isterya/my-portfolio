export type SlidesBreakpoint = {
  /** Upper viewport width bound (inclusive), in px. */
  max: number;
  items: number;
};

export const getPageCount = (total: number, perPage: number) =>
  Math.max(1, Math.ceil(total / perPage));

/** Page that contains the item at `index`. */
export const getPageOf = (index: number, perPage: number) => Math.floor(index / perPage);

/** Wraps a page number into [0, pageCount), so "previous" from the first page is the last one. */
export const wrapPage = (page: number, pageCount: number) =>
  ((page % pageCount) + pageCount) % pageCount;

/** Items per page for a viewport width: the narrowest matching breakpoint wins. */
export const getItemsPerPage = (
  width: number,
  breakpoints: SlidesBreakpoint[],
  fallback: number,
) => {
  const match = [...breakpoints].sort((a, b) => a.max - b.max).find(({ max }) => width <= max);

  return match ? match.items : fallback;
};
