import { Cell, cellObj } from "../types/interfaces";
import { Pionek } from "./Pionek";
import genUniqueId from "./utils/genUniqueId";

// export class Game {
//   private boardCon = <HTMLDivElement>document.getElementById("board");
//   public pionks: Pionek[] = [];
//   public cells: cellObj[] = [];
//   public cellsToDelete: cellObj[] = [];

//   constructor() {
//     this.renderBoard();
//     this.renderPionek();
//   }

//   private renderBoard() {
//     for (let y = 0; y < 15; y++) {
//       for (let x = 0; x < 8; x++) {
//         const div = document.createElement("div");
//         div.classList.add("cell");
//         div.style.left = `${20 * x}px`;
//         div.style.top = `${20 * y}px`;
//         this.cells.push({
//           x: 20 * x + 8,
//           y: 20 * y + 8,
//           color: "none",
//           id: genUniqueId(),
//           div: null,
//         });
//         this.boardCon.append(div);
//       }
//     }
//   }

//   public renew = (pionek: Pionek) => {
//     const cells = pionek.pionek.children as HTMLCollectionOf<HTMLElement>;
//     console.log(cells);

//     for (let index = 0; index < cells.length; index++) {
//       const element = cells[index];
//       const pos = element.getBoundingClientRect();
//       const color = element.style.backgroundColor;
//       //   const obj: cellObj = {
//       //     id: Date.now(),
//       //     x: pos.x,
//       //     y: pos.y,
//       //     color: color,
//       //   };
//       console.log(element);

//       const i = this.cells.findIndex(
//         (el) => el.x == pos.x - 20 && el.y == pos.y - 20
//       );
//       this.cells[i].color = color;
//       this.cells[i].div = element;
//       this.checkForZbicie(this.cells[i]);
//       element.classList.add("stopped-cell");
//       element.style.top = pos.y - 8 + "px";
//       element.style.left = pos.x - 8 + "px";

//       this.boardCon.append(element);
//       //   this.stoppedCells.push(obj);
//     }
//     // pionek.pionek.remove();
//     this.renderPionek();
//   };

//   public checkForZbicie(obj: cellObj) {
//     const indexLeft = this.cells.findIndex(
//       (el) => el.x == obj.x - 20 && el.y == obj.y
//     );
//     const indexTop = this.cells.findIndex(
//       (el) => el.x == obj.x && el.y == obj.y - 20
//     );
//     const indexRight = this.cells.findIndex(
//       (el) => el.x == obj.x + 20 && el.y == obj.y
//     );
//     const indexBottom = this.cells.findIndex(
//       (el) => el.x == obj.x && el.y == obj.y + 20
//     );

//     const indexes = [indexLeft, indexRight, indexTop, indexBottom];

//     const checkInRow = (element: cellObj, vectorX: number, vectorY: number) => {
//       this.cellsToDelete = [element];
//       let bool = true;
//       for (let index = 1; index < 3; index++) {
//         const l = this.cells.findIndex(
//           (el) =>
//             el.x == obj.x + vectorX * index && el.y == obj.y + vectorY * index
//         );
//         // console.log(this.cells[l]);

//         if (l == -1) {
//           bool = false;
//           break;
//         }
//         if (this.cells[l].div == null) {
//           bool = false;
//           break;
//         }

//         if (this.cells[l].color !== obj.color) {
//           bool = false;
//           break;
//         }
//         this.cellsToDelete.push(this.cells[l]);
//       }
//       return bool;
//     };

//     // console.log(indexes[key]);
//     indexes.forEach((e) => {
//       if (e == -1) return;
//       const element = this.cells[e];
//       // if (element.div == null) return;

//       const vectorX = obj.x - element.x;
//       const vectorY = obj.y - element.y;

//       // console.log(obj, vectorX, vectorY);

//       if (checkInRow(obj, vectorX, vectorY)) {
//         console.log("znaleziono!", obj.color);
//         this.cellsToDelete.forEach((cell) => {
//           cell.div.style.display = "none";
//           cell.color = "none";
//         });
//       }
//     });
//   }

//   public checkBorderPionks = (
//     pos: { x: number; y: number },
//     rotation: number
//   ): boolean => {
//     let xLeft, xRight, y, x;
//     if (rotation == 90 || rotation == 270) {
//       xLeft = pos.x - 10;
//       xRight = pos.x + 10;
//       y = pos.y + 30;
//     } else {
//       xLeft = pos.x - 20;
//       xRight = pos.x + 20;
//       y = pos.y + 20;
//     }

//     let index: number | null = null;
//     this.pionks.forEach((el, i) => {
//       if (
//         (el.rotation == 90 || el.rotation == 270) &&
//         (el.position.x == xRight - 10 ||
//           el.position.x == xLeft + 10 ||
//           el.position.x - 10 == x) &&
//         el.position.y == y + 10
//       ) {
//         index = i;
//       }
//       if (
//         (el.position.x == xRight ||
//           el.position.x == xLeft ||
//           el.position.x == pos.x) &&
//         el.position.y == y
//       ) {
//         index = i;
//       }
//     });

//     if (index != null) return true;
//     else return false;
//   };

//   private renderPionek() {
//     const pionek = new Pionek(
//       this.boardCon,
//       this.renew,
//       this.checkBorderPionks
//     );
//     this.pionks.push(pionek);
//   }
// }
//dupa
export class Game {
  private boardCon = <HTMLDivElement>document.getElementById("board");
  public pionks: Pionek[] = [];
  allCells = [];
  public cellsToDelete: Cell[] = [];

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
      console.log(pionek);

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
          console.log("duipa!");
          wynik = true;
        }
      }
    });
    return wynik;
  };

  public checkForZbicie(pionek: Pionek) {
    // let cellLeft, cellTop, cellRight, cellBottom;

    const cells: Cell[] = [];
    this.pionks.forEach((pionek) => {
      for (const key in pionek.cells) {
        cells.push(pionek.cells[key]);
      }
    });

    const checkInRow = (element: Cell, vectorX: number, vectorY: number) => {
      this.cellsToDelete = [element];
      let bool = true;
      for (let index = 1; index < 3; index++) {
        const l = this.allCells.findIndex(
          (el) =>
            el.x == element.x + vectorX * index &&
            el.y == element.y + vectorY * index
        );
        console.log(this.allCells[l]);

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

      indexes.forEach((element) => {
        if (element == -1) return;
        const cellObj: Cell = this.allCells[element];

        if (cellObj.div == null) return;
        const vectorX = obj.x - cellObj.x;
        const vectorY = obj.y - cellObj.y;
        // for (const key in element.cells) {
        //   const obj = element.cells[key];

        if (checkInRow(obj, vectorX, vectorY)) {
          console.log("znaleziono!", obj.color);
          // this.cellsToDelete.forEach((cell) => {
          //   cell.div.style.display = "none";
          //   cell.color = "none";
          // });
        }
        // }
      });
    }

    // for (const key in pionek.cells) {
    //   const cell = pionek.cells[key];
    //   this.pionks.forEach((el, i) => {
    //     for (const k in el.cells) {
    //       const cellToCompare = el.cells[k];
    //       if (cellToCompare.x + 20 == cell.x && cellToCompare.y == cell.y) {
    //         cellLeft = cellToCompare;
    //       }
    //       if (cellToCompare.x == cell.x && cellToCompare.y + 20 == cell.y) {
    //         cellTop = cellToCompare;
    //       }
    //       if (cellToCompare.x - 20 == cell.x && cellToCompare.y == cell.y) {
    //         cellRight = cellToCompare;
    //       }
    //       if (cellToCompare.x == cell.x && cellToCompare.y - 20 == cell.y) {
    //         cellBottom = cellToCompare;
    //       }
    //     }
    //   });
    // const indexes: Pionek[] = [cellLeft, cellRight, cellTop, cellBottom];
    // console.log(indexes);

    // }
  }
}
