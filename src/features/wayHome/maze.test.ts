import { describe, expect, it } from 'vitest';

import {
  DIRECTIONS,
  canMove,
  createRandom,
  generateMaze,
  getMazeSize,
  openDirections,
  shortestPathLength,
  step,
} from './maze';

const countPassages = (maze: ReturnType<typeof generateMaze>) => {
  let open = 0;
  for (let y = 0; y < maze.rows; y++) {
    for (let x = 0; x < maze.cols; x++) open += openDirections(maze, { x, y }).length;
  }
  return open / 2;
};

describe('maze', () => {
  it('is deterministic for a seed', () => {
    const a = generateMaze(12, 8, createRandom(42));
    const b = generateMaze(12, 8, createRandom(42));
    const c = generateMaze(12, 8, createRandom(43));

    expect(Array.from(a.passages)).toEqual(Array.from(b.passages));
    expect(Array.from(a.passages)).not.toEqual(Array.from(c.passages));
  });

  it.each([1, 7, 2026])('builds a perfect maze: connected and without loops (seed %i)', (seed) => {
    const maze = generateMaze(14, 9, createRandom(seed));
    const goal = { x: maze.cols - 1, y: maze.rows - 1 };

    expect(countPassages(maze)).toBe(maze.cols * maze.rows - 1);
    for (let y = 0; y < maze.rows; y++) {
      for (let x = 0; x < maze.cols; x++) {
        expect(shortestPathLength(maze, { x, y }, goal)).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('keeps passages symmetric and never opens the outer border', () => {
    const maze = generateMaze(10, 6, createRandom(5));

    for (let y = 0; y < maze.rows; y++) {
      for (let x = 0; x < maze.cols; x++) {
        for (const direction of DIRECTIONS) {
          if (!canMove(maze, { x, y }, direction)) continue;

          const next = step({ x, y }, direction);
          expect(next.x).toBeGreaterThanOrEqual(0);
          expect(next.y).toBeGreaterThanOrEqual(0);
          expect(next.x).toBeLessThan(maze.cols);
          expect(next.y).toBeLessThan(maze.rows);
          expect(openDirections(maze, next).length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('measures the shortest path with BFS', () => {
    const maze = generateMaze(2, 1, createRandom(1));

    expect(shortestPathLength(maze, { x: 0, y: 0 }, { x: 1, y: 0 })).toBe(1);
    expect(shortestPathLength(maze, { x: 0, y: 0 }, { x: 0, y: 0 })).toBe(0);
  });

  it('grows with the screen and the level within limits', () => {
    expect(getMazeSize(320, 1)).toEqual({ cols: 8, rows: 5 });
    expect(getMazeSize(600, 1)).toEqual({ cols: 12, rows: 8 });
    expect(getMazeSize(600, 3)).toEqual({ cols: 16, rows: 10 });
    expect(getMazeSize(600, 20).cols).toBe(20);
  });
});
