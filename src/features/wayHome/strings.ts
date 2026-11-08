import type { AppLanguage } from '@/i18n/languages';

import type { Direction } from './maze';

type WayHomeStrings = {
  play: string;
  loading: string;
  title: string;
  gameLabel: string;
  instructions: string;
  close: string;
  level: (level: number) => string;
  moves: (moves: number) => string;
  best: (level: number) => string;
  open: (directions: string) => string;
  wall: string;
  directions: Record<Direction, string>;
  won: (moves: number, shortest: number) => string;
  next: string;
  home: string;
};

export const WAY_HOME_STRINGS: Record<AppLanguage, WayHomeStrings> = {
  en: {
    play: 'Lost anyway? Find your way home',
    loading: 'Building the maze…',
    title: 'Way home',
    gameLabel: 'Maze game',
    instructions:
      'Guide the glowing dot to the house with the arrow keys or WASD, by swiping, or with the buttons below. Esc closes the game.',
    close: 'Close the game',
    level: (level) => `Level ${level}`,
    moves: (moves) => `Moves: ${moves}`,
    best: (level) => `Best: level ${level}`,
    open: (directions) => `Open: ${directions}`,
    wall: 'Wall',
    directions: { up: 'up', right: 'right', down: 'down', left: 'left' },
    won: (moves, shortest) => `You are home! ${moves} moves, the shortest path is ${shortest}.`,
    next: 'Next maze',
    home: 'Go to the real home page',
  },
  ru: {
    play: 'Всё равно заблудились? Найдите путь домой',
    loading: 'Строю лабиринт…',
    title: 'Путь домой',
    gameLabel: 'Игра-лабиринт',
    instructions:
      'Доведите светящуюся точку до домика: стрелки или WASD, свайпы или кнопки ниже. Esc — закрыть игру.',
    close: 'Закрыть игру',
    level: (level) => `Уровень ${level}`,
    moves: (moves) => `Ходы: ${moves}`,
    best: (level) => `Рекорд: уровень ${level}`,
    open: (directions) => `Свободно: ${directions}`,
    wall: 'Стена',
    directions: { up: 'вверх', right: 'вправо', down: 'вниз', left: 'влево' },
    won: (moves, shortest) => `Вы дома! Ходов: ${moves}, кратчайший путь — ${shortest}.`,
    next: 'Следующий лабиринт',
    home: 'На настоящую главную',
  },
  pl: {
    play: 'Mimo to się zgubiłeś? Znajdź drogę do domu',
    loading: 'Buduję labirynt…',
    title: 'Droga do domu',
    gameLabel: 'Gra w labirynt',
    instructions:
      'Doprowadź świecącą kropkę do domku strzałkami lub WASD, przesunięciem palca albo przyciskami poniżej. Esc zamyka grę.',
    close: 'Zamknij grę',
    level: (level) => `Poziom ${level}`,
    moves: (moves) => `Ruchy: ${moves}`,
    best: (level) => `Rekord: poziom ${level}`,
    open: (directions) => `Wolne: ${directions}`,
    wall: 'Ściana',
    directions: { up: 'w górę', right: 'w prawo', down: 'w dół', left: 'w lewo' },
    won: (moves, shortest) => `Jesteś w domu! Ruchy: ${moves}, najkrótsza droga: ${shortest}.`,
    next: 'Następny labirynt',
    home: 'Na prawdziwą stronę główną',
  },
};
