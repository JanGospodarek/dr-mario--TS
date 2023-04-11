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
}
