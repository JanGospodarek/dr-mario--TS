import { cellObj } from "../types/interfaces";
import { Pionek } from "./Pionek";
import genUniqueId from "./utils/genUniqueId";

export class Game {
  private boardCon = <HTMLDivElement>document.getElementById("board");
  public pionks: Pionek[] = [];
  public cells: cellObj[] = [];
  public cellsToDelete: cellObj[] = [];
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
        this.cells.push({
          x: 20 * x + 8,
          y: 20 * y + 8,
          color: "none",
          id: genUniqueId(),
          div: null,
        });
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
      //   const obj: cellObj = {
      //     id: Date.now(),
      //     x: pos.x,
      //     y: pos.y,
      //     color: color,
      //   };
      console.log(element);

      const i = this.cells.findIndex(
        (el) => el.x == pos.x - 20 && el.y == pos.y - 20
      );
      this.cells[i].color = color;
      this.cells[i].div = element;
      this.checkForZbicie(this.cells[i]);
      element.classList.add("stopped-cell");
      element.style.top = pos.y - 8 + "px";
      element.style.left = pos.x - 8 + "px";

      this.boardCon.append(element);
      //   this.stoppedCells.push(obj);
    }
    // pionek.pionek.remove();
    this.renderPionek();
  };
  public checkForZbicie(obj: cellObj) {
    const indexLeft = this.cells.findIndex(
      (el) => el.x == obj.x - 20 && el.y == obj.y
    );
    const indexTop = this.cells.findIndex(
      (el) => el.x == obj.x && el.y == obj.y - 20
    );
    const indexRight = this.cells.findIndex(
      (el) => el.x == obj.x + 20 && el.y == obj.y
    );
    const indexBottom = this.cells.findIndex(
      (el) => el.x == obj.x && el.y == obj.y + 20
    );

    const indexes = [indexLeft, indexRight, indexTop, indexBottom];

    const checkInRow = (element: cellObj, vectorX: number, vectorY: number) => {
      this.cellsToDelete = [element];
      let bool = true;
      for (let index = 1; index < 3; index++) {
        const l = this.cells.findIndex(
          (el) =>
            el.x == obj.x + vectorX * index && el.y == obj.y + vectorY * index
        );
        // console.log(this.cells[l]);

        if (l == -1) {
          bool = false;
          break;
        }
        if (this.cells[l].div == null) {
          bool = false;
          break;
        }

        if (this.cells[l].color !== obj.color) {
          bool = false;
          break;
        }
        this.cellsToDelete.push(this.cells[l]);
      }
      return bool;
    };

    // console.log(indexes[key]);
    indexes.forEach((e) => {
      if (e == -1) return;
      const element = this.cells[e];
      // if (element.div == null) return;

      const vectorX = obj.x - element.x;
      const vectorY = obj.y - element.y;

      // console.log(obj, vectorX, vectorY);

      if (checkInRow(obj, vectorX, vectorY)) {
        console.log("znaleziono!", obj.color);
        this.cellsToDelete.forEach((cell) => {
          cell.div.style.display = "none";
          cell.color = "none";
        });
      }
    });
  }

  public checkBorderPionks = (
    pos: { x: number; y: number },
    rotation: number
  ): boolean => {
    let xLeft, xRight, y, x;
    if (rotation == 90 || rotation == 270) {
      xLeft = pos.x - 10;
      xRight = pos.x + 10;
      y = pos.y + 30;
    } else {
      xLeft = pos.x - 20;
      xRight = pos.x + 20;
      y = pos.y + 20;
    }

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
//dupa
