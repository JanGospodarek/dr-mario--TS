// export class Pionek {
//   private boardDiv: HTMLDivElement;
//   public pionek!: HTMLDivElement;
//   private movingInterval: any;
//   private possibleColors = [
//     "#BB8FCE",
//     "#85C1E9",
//     "#F7DC6F",
//     "#F1948A",
//     "#E59866",
//   ];
//   private stop = false;
//   private checkBorderPionks: Function;
//   private renewGame: Function;
//   private manualMovingDown = false;
//   ///
//   public position = { x: 60, y: 0 };
//   public rotation = 0;

import { Cells } from "../types/interfaces";

//   constructor(
//     boardDiv: HTMLDivElement,
//     renew: Function,
//     checkBorderPionks: Function
//   ) {
//     this.boardDiv = boardDiv;
//     this.buildPionek();
//     this.moving();
//     this.addControls();
//     this.renewGame = renew;
//     this.checkBorderPionks = checkBorderPionks;
//   }
//   private getColor(except: number | null) {
//     let i = Math.floor(Math.random() * 5);

//     while (i == except) {
//       i = Math.floor(Math.random() * 5);
//     }
//     return i;
//   }
//   private buildPionek() {
//     this.pionek = document.createElement("div");
//     this.pionek.classList.add("pionek");
//     let fristColor: number | null = null;

//     for (let index = 0; index < 2; index++) {
//       const cell1 = document.createElement("div");

//       const colorIndex = this.getColor(fristColor);
//       fristColor = colorIndex;
//       cell1.style.backgroundColor = this.possibleColors[colorIndex];

//       cell1.classList.add("pionek-cell");
//       //   const pos = { x: 60, y: 0 };
//       //   cell1.setAttribute("data-position", JSON.stringify(pos));
//       this.pionek.append(cell1);
//     }

//     this.pionek.style.left = "60px";
//     this.boardDiv.append(this.pionek);
//   }

//   private moving() {
//     this.movingInterval = setInterval(() => {
//       if (this.manualMovingDown) return;

//       const y = 20 + Number(this.pionek.style.top.split("p")[0]);

//       if (this.chechForBorderCollisions(undefined, y, true)) {
//         clearInterval(this.movingInterval);
//         this.renewGame(this);
//         return;
//       }
//       this.position.y = y;
//       this.pionek.style.top = `${y}px`;
//       //   this.updateDatasets({ x: this.position.x, y: this.position.y });
//     }, 400);
//   }

//   private updateDatasets(obj) {
//     for (let index = 0; index < this.pionek.children.length; index++) {
//       const element = this.pionek.children[index];
//       element.setAttribute("data-position", JSON.stringify(obj));
//     }
//   }

//   private chechForBorderCollisions(x: any, y: number, autonomous: boolean) {
//     if (this.checkBorderPionks(this.position, this.rotation)) {
//       console.log("PIONEK!!!!");
//       this.stop = true;
//       return true;
//     }

//     if (autonomous) {
//       if (
//         y >= 300 ||
//         ((this.rotation == 90 || this.rotation == 270) && y >= 280)
//       ) {
//         this.stop = true;
//         return true;
//       }
//     } else {
//       if (x <= 0 || x >= 160) {
//         return true;
//       } else if (
//         y >= 300 ||
//         ((this.rotation == 90 || this.rotation == 270) && y >= 280)
//       ) {
//         this.stop = true;
//         return true;
//       }
//     }
//   }

//   private rotate() {
//     const prevRot = this.rotation;
//     if (prevRot == 360) this.rotation = 0;
//     this.rotation += 90;
//     if (this.rotation == 270 || this.rotation == 90) {
//       this.position.x += 10;
//       this.position.y -= 10;
//       this.pionek.style.left = `${this.position.x}px`;
//       this.pionek.style.top = `${this.position.y}px`;
//     }
//     if (this.rotation == 180 || this.rotation == 360) {
//       this.position.x -= 10;
//       this.position.y += 10;
//       this.pionek.style.top = `${this.position.y}px`;
//       this.pionek.style.left = `${this.position.x}px`;
//     }
//     // this.updateDatasets({ x: this.position.x, y: this.position.y });
//     this.pionek.style.transform = `rotate(${this.rotation}deg)`;
//   }

//   private addControls() {
//     document.addEventListener("keydown", (e: KeyboardEvent) => {
//       if (this.stop) return;
//       const key = e.key;

//       const x = +this.pionek.style.left.split("p")[0];
//       const y = +this.pionek.style.top.split("p")[0];

//       switch (key) {
//         case "ArrowLeft":
//           if (!this.chechForBorderCollisions(x, y, false)) {
//             const span = x - 20;
//             this.pionek.style.left = `${span}px`;
//             this.position.x = span;
//           }

//           break;
//         case "ArrowRight":
//           if (!this.chechForBorderCollisions(x + 40, y, false)) {
//             const span = x + 20;
//             this.pionek.style.left = `${span}px`;
//             this.position.x = span;
//           }

//           break;
//         case "ArrowDown":
//           if (!this.chechForBorderCollisions(x, y + 20, false)) {
//             this.manualMovingDown = true;
//             const span = y + 20;
//             this.pionek.style.top = `${span}px`;
//             this.position.y = span;
//           }

//           break;
//         case "r":
//           this.rotate();
//       }
//       //   this.updateDatasets({ x: this.position.x, y: this.position.y });
//     });

//     document.addEventListener("keyup", (e: KeyboardEvent) => {
//       if (e.key == "ArrowDown") this.manualMovingDown = false;
//     });
//   }
// }
export class Pionek {
  private boardDiv: HTMLDivElement;
  public cells: Cells = {
    left: { x: 60, y: 0, div: null },
    right: { x: 80, y: 0, div: null },
  };
  private movingInterval: any;
  private possibleColors = [
    "#BB8FCE",
    "#85C1E9",
    "#F7DC6F",
    "#F1948A",
    "#E59866",
  ];
  private stop = false;
  // private checkBorderPionks: Function;
  // private renewGame: Function;
  private manualMovingDown = false;
  ///
  constructor(boardDiv: HTMLDivElement) {
    this.boardDiv = boardDiv;
    this.buildPionek();
    this.moving();
    this.addControls();
  }
  private buildPionek() {
    let fristColor: number | null = null;

    for (let index = 0; index < 2; index++) {
      const cell = document.createElement("div");

      const colorIndex = this.getColor(fristColor);
      fristColor = colorIndex;
      cell.style.backgroundColor = this.possibleColors[colorIndex];

      cell.classList.add("pionek-cell");

      //   cell.setAttribute("data-position", JSON.stringify(pos));
      this.boardDiv.append(cell);

      let key = "";
      index == 0 ? (key = "left") : (key = "right");

      cell.style.left = this.cells[key].x + "px";
      cell.style.top = this.cells[key].y + "px";

      this.cells[key].div = cell;
    }
  }

  private getColor(except: number | null) {
    let i = Math.floor(Math.random() * 5);

    while (i == except) {
      i = Math.floor(Math.random() * 5);
    }
    return i;
  }

  private moving() {
    this.movingInterval = setInterval(() => {
      if (this.manualMovingDown) return;

      const newY = 20 + this.cells.left.y;
      // this.cells.left.y = newY;

      this.updateBothCoordinates(undefined, newY, undefined, newY);
      // prettier-ignore
      if (this.checkBottomCollision()) {
        clearInterval(this.movingInterval);
        // this.renewGame(this);
        return;
      }
    }, 400);
  }

  // private chechForBorderCollisions(
  //   y,
  //   xLeft,
  //   xRight,
  //   autonomous: boolean = false
  // ): boolean {
  //   // if (this.checkBorderPionks(this.position, this.rotation)) {
  //   //   console.log("PIONEK!!!!");
  //   //   this.stop = true;
  //   //   return true;
  //   // }
  //   if (autonomous) {
  //     if (y >= 280) {
  //       this.stop = true;
  //       return true;
  //     }
  //   } else {
  //     if (xLeft <= 0 || xRight >= 140) {
  //       return true;
  //     } else if (y >= 280) {
  //       this.stop = true;
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  private checkLeftCollision() {
    if (this.cells.left.x <= 0) return true;
    else return false;
  }
  private checkRightCollision() {
    if (this.cells.right.x >= 140) return true;
    else return false;
  }
  private checkBottomCollision() {
    if (this.cells.left.y >= 280) {
      this.stop = true;
      return true;
    } else {
      return false;
    }
  }

  private addControls() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (this.stop) return;
      const key = e.key;
      switch (key) {
        case "ArrowLeft":
          // prettier-ignore
          if (this.checkLeftCollision()) break;
          this.updateBothCoordinates(
            this.cells.left.x - 20,
            undefined,
            this.cells.right.x - 20,
            undefined
          );

          break;
        case "ArrowRight":
          // prettier-ignore
          if (this.checkRightCollision()) break;
          this.updateBothCoordinates(
            this.cells.left.x + 20,
            undefined,
            this.cells.right.x + 20,
            undefined
          );

          break;
        case "ArrowDown":
          // prettier-ignore

          if (this.checkBottomCollision()) break;
          this.manualMovingDown = true;
          this.updateBothCoordinates(
            undefined,
            this.cells.left.y + 20,
            undefined,
            this.cells.right.y + 20
          );

          break;
        case "r":
        // this.rotate();
      }
    });

    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key == "ArrowDown") this.manualMovingDown = false;
    });
  }
  updateBothCoordinates(
    xLeft: number | undefined,
    yLeft: number | undefined,
    xRight: number | undefined,
    yRight: number | undefined
  ) {
    if (yLeft !== undefined) {
      this.cells.left.y = yLeft;
      this.cells.left.div.style.top = yLeft + "px";
    }
    if (xLeft !== undefined) {
      this.cells.left.x = xLeft;
      this.cells.left.div.style.left = xLeft + "px";
    }
    if (yRight !== undefined) {
      this.cells.right.y = yRight;
      this.cells.right.div.style.top = yRight + "px";
    }
    if (xRight !== undefined) {
      this.cells.right.x = xRight;
      this.cells.right.div.style.left = xRight + "px";
    }
  }
}
