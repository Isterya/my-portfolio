export type SlidesBreakpoint = {
  max: number;
  items: number;
};

export const getPageCount = (total: number, perPage: number) =>
  Math.max(1, Math.ceil(total / perPage));

export const getPageOf = (index: number, perPage: number) => Math.floor(index / perPage);

export const wrapPage = (page: number, pageCount: number) =>
  ((page % pageCount) + pageCount) % pageCount;

export const getItemsPerPage = (
  width: number,
  breakpoints: SlidesBreakpoint[],
  fallback: number,
) => {
  const match = [...breakpoints].sort((a, b) => a.max - b.max).find(({ max }) => width <= max);

  return match ? match.items : fallback;
};
