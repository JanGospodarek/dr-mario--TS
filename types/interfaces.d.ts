export interface cellObj {
  x: number;
  y: number;
  id: string;
  color: string;
  div: HTMLElement | null;
}
export interface Cells {
  left: { x: number; y: number; div: HTMLDivElement | null };
  right: { x: number; y: number; div: HTMLDivElement | null };
}
