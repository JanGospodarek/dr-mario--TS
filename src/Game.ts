import { cellObj } from "../types/interfaces";
import { Pionek } from "./Pionek";
export class Game {
  private boardCon = <HTMLDivElement>document.getElementById("board");
  public pionks: Pionek[] = [];
  public stoppedCells: cellObj[] = [];
  constructor() {
    this.renderBoard();
    this.renderPionek();
  }
  private renderBoard() {
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 8; x++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.style.left = `${20 * x}px`;
        div.style.top = `${20 * y}px`;
        this.boardCon.append(div);
      }
    }
  }
  public renew = (pionek: Pionek) => {
    const cells = pionek.pionek.children as HTMLCollectionOf<HTMLElement>;
    console.log(cells);

    for (let index = 0; index < cells.length; index++) {
      const element = cells[index];
      const pos = element.getBoundingClientRect();
      const color = element.style.backgroundColor;
      const obj: cellObj = {
        id: Date.now(),
        x: pos.x,
        y: pos.y,
        color: color,
      };
      //   console.log(pos);

      //   element.style.top = pos.y + "px";
      //   element.style.left = pos.x + "px";

      //   this.boardCon.append(element);
      this.stoppedCells.push(obj);
    }
    // pionek.pionek.style.display = "none";
    console.log(this.stoppedCells);

    this.renderPionek();
  };
  public checkBorderPionks = (
    pos: { x: number; y: number },
    rotation: number
  ): boolean => {
    let xLeft, xRight, y, x;
    if (rotation == 90 || rotation == 270) {
      xLeft = pos.x - 10;
      xRight = pos.x + 10;
      y = pos.y + 30;
      //  this.position.x += 10;
      // this.position.y -= 10;
    } else {
      xLeft = pos.x - 20;
      xRight = pos.x + 20;
      y = pos.y + 20;
    }

    // const index=this.pionks.findIndex(el=>(el.position.x==xLeft||el.position.x==xRight)&&el.position.y==y)
    let index: number | null = null;
    this.pionks.forEach((el, i) => {
      if (
        (el.rotation == 90 || el.rotation == 270) &&
        (el.position.x == xRight - 10 ||
          el.position.x == xLeft + 10 ||
          el.position.x - 10 == x) &&
        el.position.y == y + 10
      ) {
        index = i;
      }
      if (
        (el.position.x == xRight ||
          el.position.x == xLeft ||
          el.position.x == pos.x) &&
        el.position.y == y
      ) {
        index = i;
      }
    });

    if (index != null) return true;
    else return false;
  };
  r;
  private renderPionek() {
    const pionek = new Pionek(
      this.boardCon,
      this.renew,
      this.checkBorderPionks
    );
    this.pionks.push(pionek);
  }
}
