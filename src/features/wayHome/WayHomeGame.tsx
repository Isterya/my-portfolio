import { KeyboardEvent, PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useReducedMotion } from 'framer-motion';

import type { AppLanguage } from '@/i18n/languages';

import {
  Cell,
  Direction,
  Maze,
  canMove,
  createRandom,
  generateMaze,
  getMazeSize,
  openDirections,
  shortestPathLength,
  step,
} from './maze';
import { WAY_HOME_STRINGS } from './strings';

import './wayHome.scss';

type WayHomeGameProps = {
  language: AppLanguage;
  onClose: () => void;
};

type Level = {
  number: number;
  maze: Maze;
  goal: Cell;
  shortest: number;
};

type Point = { x: number; y: number };

const START: Cell = { x: 0, y: 0 };
const STEP_DURATION_MS = 110;
const MAX_MOVE_DURATION_MS = 400;
const SWIPE_THRESHOLD_PX = 24;
const BEST_LEVEL_KEY = 'wayHome.bestLevel';

const KEY_DIRECTIONS: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  w: 'up',
  d: 'right',
  s: 'down',
  a: 'left',
};

const PAD_BUTTONS: { direction: Direction; symbol: string }[] = [
  { direction: 'up', symbol: '↑' },
  { direction: 'left', symbol: '←' },
  { direction: 'down', symbol: '↓' },
  { direction: 'right', symbol: '→' },
];

const readBestLevel = () => {
  try {
    return Number(localStorage.getItem(BEST_LEVEL_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeBestLevel = (level: number): boolean => {
  try {
    localStorage.setItem(BEST_LEVEL_KEY, String(level));
    return true;
  } catch {
    return false;
  }
};

const createLevel = (number: number, width: number): Level => {
  const { cols, rows } = getMazeSize(width, number);
  const maze = generateMaze(cols, rows, createRandom(Math.floor(Math.random() * 2 ** 31)));
  const goal = { x: cols - 1, y: rows - 1 };

  return { number, maze, goal, shortest: shortestPathLength(maze, START, goal) };
};

const cellKey = ({ x, y }: Cell) => `${x},${y}`;
const isSameCell = (a: Cell, b: Cell) => a.x === b.x && a.y === b.y;

const drawBoard = (canvas: HTMLCanvasElement, level: Level, player: Point, trail: Set<string>) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  const { cols, rows } = level.maze;
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const wall = Math.max(2, width / cols / 14);
  const cell = (width - wall) / cols;
  const height = cell * rows + wall;

  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
  }

  context.setTransform(ratio, 0, 0, ratio, (wall / 2) * ratio, (wall / 2) * ratio);
  context.clearRect(-wall, -wall, width + wall, height + wall);

  const center = (value: number) => (value + 0.5) * cell;

  context.fillStyle = 'rgba(255, 127, 0, 0.35)';
  trail.forEach((key) => {
    const [x, y] = key.split(',').map(Number);
    context.beginPath();
    context.arc(center(x), center(y), cell * 0.08, 0, Math.PI * 2);
    context.fill();
  });

  const gx = center(level.goal.x);
  const gy = center(level.goal.y);
  const r = cell * 0.3;
  context.fillStyle = '#ffb547';
  context.beginPath();
  context.moveTo(gx - r, gy - r * 0.1);
  context.lineTo(gx, gy - r);
  context.lineTo(gx + r, gy - r * 0.1);
  context.lineTo(gx + r * 0.7, gy - r * 0.1);
  context.lineTo(gx + r * 0.7, gy + r * 0.8);
  context.lineTo(gx - r * 0.7, gy + r * 0.8);
  context.lineTo(gx - r * 0.7, gy - r * 0.1);
  context.closePath();
  context.fill();

  context.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  context.lineWidth = wall;
  context.lineCap = 'round';
  context.beginPath();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!canMove(level.maze, { x, y }, 'up')) {
        context.moveTo(x * cell, y * cell);
        context.lineTo((x + 1) * cell, y * cell);
      }
      if (!canMove(level.maze, { x, y }, 'left')) {
        context.moveTo(x * cell, y * cell);
        context.lineTo(x * cell, (y + 1) * cell);
      }
    }
  }
  context.moveTo(cols * cell, 0);
  context.lineTo(cols * cell, rows * cell);
  context.lineTo(0, rows * cell);
  context.stroke();

  context.save();
  context.shadowColor = 'rgba(255, 127, 0, 0.9)';
  context.shadowBlur = cell * 0.6;
  context.fillStyle = '#ff7f00';
  context.beginPath();
  context.arc(center(player.x), center(player.y), cell * 0.22, 0, Math.PI * 2);
  context.fill();
  context.restore();
};

const WayHomeGame = ({ language, onClose }: WayHomeGameProps) => {
  const strings = WAY_HOME_STRINGS[language];
  const prefersReducedMotion = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const swipeStartRef = useRef<Point | null>(null);
  const trailRef = useRef(new Set([cellKey(START)]));
  const drawnPositionRef = useRef<Point>({ ...START });

  const [width, setWidth] = useState(0);
  const [level, setLevel] = useState<Level | null>(null);
  const [player, setPlayer] = useState<Cell>(START);
  const [moves, setMoves] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const [bestLevel, setBestLevel] = useState(readBestLevel);

  const isWon = level !== null && isSameCell(player, level.goal);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(([entry]) => {
      const measuredWidth = entry.contentRect.width;
      setWidth(measuredWidth);
      if (measuredWidth > 0) {
        setLevel((current) => current ?? createLevel(1, measuredWidth));
      }
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !level || width === 0) return;

    const from = { ...drawnPositionRef.current };
    const distance = Math.abs(player.x - from.x) + Math.abs(player.y - from.y);

    if (prefersReducedMotion || distance === 0 || distance > level.maze.cols + level.maze.rows) {
      drawnPositionRef.current = { ...player };
      drawBoard(canvas, level, player, trailRef.current);
      return;
    }

    const duration = Math.min(STEP_DURATION_MS * distance, MAX_MOVE_DURATION_MS);
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      const position = {
        x: from.x + (player.x - from.x) * eased,
        y: from.y + (player.y - from.y) * eased,
      };

      drawnPositionRef.current = position;
      drawBoard(canvas, level, position, trailRef.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      drawnPositionRef.current = { ...player };
    };
  }, [level, player, width, prefersReducedMotion]);

  useEffect(() => {
    if (isWon) nextButtonRef.current?.focus();
  }, [isWon]);

  const move = useCallback(
    (direction: Direction, slide = false) => {
      if (!level || isWon) return;

      if (!canMove(level.maze, player, direction)) {
        setAnnouncement(strings.wall);
        return;
      }

      let next = player;
      let steps = 0;

      do {
        next = step(next, direction);
        trailRef.current.add(cellKey(next));
        steps += 1;
      } while (
        slide &&
        !isSameCell(next, level.goal) &&
        canMove(level.maze, next, direction) &&
        openDirections(level.maze, next).length === 2
      );

      const total = moves + steps;
      setPlayer(next);
      setMoves(total);

      if (isSameCell(next, level.goal)) {
        setAnnouncement(strings.won(total, level.shortest));
        if (level.number > bestLevel) {
          setBestLevel(level.number);
          writeBestLevel(level.number);
        }
        return;
      }

      const open = openDirections(level.maze, next).map((dir) => strings.directions[dir]);
      setAnnouncement(strings.open(open.join(', ')));
    },
    [level, isWon, player, moves, bestLevel, strings],
  );

  const startNextLevel = () => {
    if (!level) return;

    trailRef.current = new Set([cellKey(START)]);
    drawnPositionRef.current = { ...START };
    setLevel(createLevel(level.number + 1, width));
    setPlayer(START);
    setMoves(0);
    setAnnouncement(strings.level(level.number + 1));
    rootRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    const direction = KEY_DIRECTIONS[event.key.length === 1 ? event.key.toLowerCase() : event.key];
    if (!direction) return;

    event.preventDefault();
    move(direction);
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_THRESHOLD_PX) return;

    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left', true);
    else move(dy > 0 ? 'down' : 'up', true);
  };

  return (
    <div
      ref={rootRef}
      className="way-home"
      role="application"
      aria-label={strings.gameLabel}
      aria-describedby="way-home-instructions"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="way-home__header">
        <h2 className="way-home__title">{strings.title}</h2>
        <button
          type="button"
          className="way-home__close"
          aria-label={strings.close}
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <p className="way-home__stats">
        {level && strings.level(level.number)} · {strings.moves(moves)}
        {bestLevel > 0 && ` · ${strings.best(bestLevel)}`}
      </p>

      <p id="way-home-instructions" className="way-home__instructions">
        {strings.instructions}
      </p>

      <canvas
        ref={canvasRef}
        className="way-home__board"
        aria-hidden="true"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (swipeStartRef.current = null)}
      />

      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>

      {isWon && level ? (
        <div className="way-home__result">
          <p>{strings.won(moves, level.shortest)}</p>
          <div className="way-home__actions">
            <button
              ref={nextButtonRef}
              type="button"
              className="way-home__button"
              onClick={startNextLevel}
            >
              {strings.next}
            </button>
            <Link to="/" className="way-home__button way-home__button--secondary">
              {strings.home}
            </Link>
          </div>
        </div>
      ) : (
        <div className="way-home__pad">
          {PAD_BUTTONS.map(({ direction, symbol }) => (
            <button
              key={direction}
              type="button"
              className={`way-home__pad-button way-home__pad-button--${direction}`}
              aria-label={strings.directions[direction]}
              onClick={() => move(direction)}
            >
              {symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WayHomeGame;
