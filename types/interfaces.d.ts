export interface Cells {
  left: Cell;
  right: Cell;
}
export interface Cell {
  x: number;
  y: number;
  div: HTMLDivElement | null;
  color: string;
  flag: string;
  id: string;
}
// export interface PionekInter {
//   boardDiv: HTMLDivElement;
//   btn: HTMLDivElement;
//   id: string;
//   movingInterval: any;
//   stop: boolean;
//   manualMovingDown: boolean;
//   possibleColors: string[];
//   cells: Cells;
// }
export interface GameInter {
  CELL_WIDTH: number;
  score: number;
  bestScore: number;
  destId: string;
  gameId: string;
  stop: boolean;
  first: boolean;
  allCells: Cell[];
  cellsToDelete: Cell[];
  pionek: Pionek;
  aliveViruses: number;
  steps: string[];
  possibleColors: string[];
  data: any;
  img: any;
  boardGraphicCoords: frame;
}
export interface PionekInter {
  id: string;
  cells: Cells;
  possibleColors: string[];
  CELL_WIDTH: number;
  BOARD_WIDTH: number;
  BOARD_HEIGHT: number;
  stop: boolean;
  manualMovingDown: boolean;
  movingInterval: any;
}
export interface frame {
  x0: number;
  y0: number;
  w: number;
  h: number;
}
