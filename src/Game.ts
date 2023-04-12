import { Cell, cellObj } from "../types/interfaces";
import { Pionek } from "./Pionek";
import genUniqueId from "./utils/genUniqueId";

export class Game {
  private boardCon = <HTMLDivElement>document.getElementById("board");
  private scoreCon = <HTMLDivElement>document.getElementById("score");
  public pionks: Pionek[] = [];
  private allCells = [];
  public score = 0;
  public cellsToDelete: Cell[] = [];
  constructor() {
    this.renderBoard();
    this.renderPionek();
    this.scoreCon.innerText = "0".repeat(8);
  }

  private renderBoard() {
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 8; x++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        // div.innerText = String(this.allCells.length);
        div.style.left = `${20 * x}px`;
        div.style.top = `${20 * y}px`;
        this.allCells.push(<Cell>{
          x: 20 * x,
          y: 20 * y,
          color: "none",
          div: null,
        });
        this.boardCon.append(div);
      }
    }
  }

  private renderPionek() {
    const pionek = new Pionek(
      this.boardCon,
      this.checkBorderPionks,
      this.renew
    );
    this.pionks.push(pionek);
  }

  public renew = (pionek) => {
    for (const key in pionek.cells) {
      const c = pionek.cells[key];
      const index = this.allCells.findIndex((el) => el.x == c.x && el.y == c.y);
      this.allCells[index].x = c.x;
      this.allCells[index].y = c.y;

      this.allCells[index].color = c.color;
      this.allCells[index].div = c.div;
    }

    this.checkForZbicie(pionek);
    this.renderPionek();
  };

  public checkBorderPionks = (pionek: Pionek) => {
    let wynik = false;
    this.pionks.forEach((element) => {
      for (const key in pionek.cells) {
        const pos = pionek.cells[key];

        if (pionek.id == element.id) return;
        if (
          (pos.x == element.cells.left.x || pos.x == element.cells.right.x) &&
          (pos.y == element.cells.left.y - 20 ||
            pos.y == element.cells.right.y - 20)
        ) {
          wynik = true;
        }
      }
    });

    return wynik;
  };

  public checkForZbicie(pionek: Pionek) {
    const checkInRow = (element: Cell, vectorX: number, vectorY: number) => {
      this.cellsToDelete = [element];
      let bool = true;
      for (let index = 1; index < 3; index++) {
        const l = this.allCells.findIndex(
          (el) =>
            el.x == element.x - vectorX * index &&
            el.y == element.y - vectorY * index
        );

        if (l == -1) {
          bool = false;
          break;
        }
        if (this.allCells[l].div == null) {
          bool = false;
          break;
        }

        if (this.allCells[l].color !== element.color) {
          bool = false;
          break;
        }
        this.cellsToDelete.push(this.allCells[l]);
      }
      return bool;
    };

    for (const key in pionek.cells) {
      const obj = pionek.cells[key];

      const indexLeft = this.allCells.findIndex(
        (el) => el.x == obj.x - 20 && el.y == obj.y
      );
      const indexTop = this.allCells.findIndex(
        (el) => el.x == obj.x && el.y == obj.y - 20
      );
      const indexRight = this.allCells.findIndex(
        (el) => el.x == obj.x + 20 && el.y == obj.y
      );
      const indexBottom = this.allCells.findIndex(
        (el) => el.x == obj.x && el.y == obj.y + 20
      );
      const indexes = [indexLeft, indexRight, indexTop, indexBottom];

      ////////////

      indexes.forEach((element, i) => {
        if (element == -1) return;
        const cellObj: Cell = this.allCells[element];

        if (cellObj.div == null) return;
        const vectorX = obj.x - cellObj.x;
        const vectorY = obj.y - cellObj.y;

        if (checkInRow(obj, vectorX, vectorY)) {
          console.log("znaleziono!", obj.color);
          this.score += 1000;
          this.renderScore();
          this.cellsToDelete.forEach((cell) => {
            cell.div.remove();
            cell.div = null;
            cell.color = "none";
            cell.flag = "zbite";
            this.spadamyPanowie();
          });
        }
      });
    }
  }
  spadamyPanowie() {
    let opadlo = false;
    const opadanie = () => {
      opadlo = false;
      for (let index = this.allCells.length - 1; index > 0; index--) {
        const cell: Cell = this.allCells[index];

        const indexBelow = this.allCells.findIndex(
          (el) => el.x == cell.x && el.y - 20 == cell.y
        );

        if (indexBelow == -1) break;
        const cellBellow = this.allCells[indexBelow];
        console.log(cellBellow);

        if (cellBellow.flag == "zbite") {
          //zejdz w dol
          console.log(";c");

          cell.flag = "zbite";
          cellBellow.flag = "normal";

          cellBellow.div = cell.div;
          cell.div = null;

          opadlo = true;
        }
        if (opadlo) {
          opadanie();
        } else {
          //update interface
          this.reRender();
        }
      }
    };
    opadanie();
  }

  reRender() {
    this.allCells.forEach((cell) => {
      if (cell.div == null) return;
      cell.div.style.top = cell.x + "px";
    });
  }
  renderScore() {
    this.scoreCon.innerText = String(this.score).padStart(8, "0");
  }
}
