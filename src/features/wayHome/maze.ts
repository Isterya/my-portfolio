// Pure maze logic for the "Way home" mini-game: generation, moves and the shortest path.

export type Direction = 'up' | 'right' | 'down' | 'left';

export type Cell = { x: number; y: number };

export type Maze = {
  cols: number;
  rows: number;
  /** Bit mask of open sides per cell, index = y * cols + x. */
  passages: Uint8Array;
};

export const DIRECTIONS: Direction[] = ['up', 'right', 'down', 'left'];

const BIT: Record<Direction, number> = { up: 1, right: 2, down: 4, left: 8 };
const OPPOSITE: Record<Direction, Direction> = {
  up: 'down',
  right: 'left',
  down: 'up',
  left: 'right',
};
const DELTA: Record<Direction, Cell> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

/** Small seeded PRNG (mulberry32): the same seed always builds the same maze. */
export const createRandom = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const indexOf = (maze: Pick<Maze, 'cols'>, { x, y }: Cell) => y * maze.cols + x;

const isInside = (maze: Pick<Maze, 'cols' | 'rows'>, { x, y }: Cell) =>
  x >= 0 && y >= 0 && x < maze.cols && y < maze.rows;

export const step = ({ x, y }: Cell, direction: Direction): Cell => ({
  x: x + DELTA[direction].x,
  y: y + DELTA[direction].y,
});

/**
 * "Perfect" maze (exactly one path between any two cells) built with an iterative depth-first
 * search (recursive backtracker): long winding corridors, no stack overflow on large grids.
 */
export const generateMaze = (cols: number, rows: number, random: () => number): Maze => {
  const maze: Maze = { cols, rows, passages: new Uint8Array(cols * rows) };
  const visited = new Uint8Array(cols * rows);
  const stack: Cell[] = [{ x: 0, y: 0 }];
  visited[0] = 1;

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const options = DIRECTIONS.filter((direction) => {
      const next = step(current, direction);
      return isInside(maze, next) && !visited[indexOf(maze, next)];
    });

    if (options.length === 0) {
      stack.pop();
      continue;
    }

    const direction = options[Math.floor(random() * options.length)];
    const next = step(current, direction);

    maze.passages[indexOf(maze, current)] |= BIT[direction];
    maze.passages[indexOf(maze, next)] |= BIT[OPPOSITE[direction]];
    visited[indexOf(maze, next)] = 1;
    stack.push(next);
  }

  return maze;
};

export const canMove = (maze: Maze, cell: Cell, direction: Direction) =>
  isInside(maze, cell) && (maze.passages[indexOf(maze, cell)] & BIT[direction]) !== 0;

export const openDirections = (maze: Maze, cell: Cell) =>
  DIRECTIONS.filter((direction) => canMove(maze, cell, direction));

/** Number of moves on the shortest path (breadth-first search), or -1 if unreachable. */
export const shortestPathLength = (maze: Maze, from: Cell, to: Cell) => {
  const distance = new Int32Array(maze.cols * maze.rows).fill(-1);
  const queue: Cell[] = [from];
  distance[indexOf(maze, from)] = 0;

  for (let head = 0; head < queue.length; head++) {
    const cell = queue[head];
    if (cell.x === to.x && cell.y === to.y) return distance[indexOf(maze, cell)];

    for (const direction of openDirections(maze, cell)) {
      const next = step(cell, direction);
      if (distance[indexOf(maze, next)] === -1) {
        distance[indexOf(maze, next)] = distance[indexOf(maze, cell)] + 1;
        queue.push(next);
      }
    }
  }

  return -1;
};

/** Grid size for a level: wider screens and later levels get more cells. */
export const getMazeSize = (availableWidth: number, level: number) => {
  const baseCols = Math.max(6, Math.min(12, Math.floor(availableWidth / 40)));
  const cols = Math.min(baseCols + (level - 1) * 2, 20);
  const rows = Math.max(5, Math.round(cols * 0.65));

  return { cols, rows };
};
