export interface cellObj {
  x: number;
  y: number;
  id: string;
  color: string;
  div: HTMLElement | null;
}
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
  boardCon: HTMLDivElement;
  scoreCon: x;
  pionks: Pionek[];
  allCells: Cell[];
  score: number;
  cellsToDelete: Cell[];
}
export interface frame {
  x0: number;
  y0: number;
  w: number;
  h: number;
}
