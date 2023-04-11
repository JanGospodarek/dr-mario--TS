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
import genUniqueId from "./utils/genUniqueId";

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

export class Pionek {
  private boardDiv: HTMLDivElement;
  public cells: Cells = {
    left: { x: 60, y: 0, div: null, color: "none" },
    right: { x: 80, y: 0, div: null, color: "none" },
  };
  public id = genUniqueId();

  private movingInterval: any;
  private possibleColors = [
    "#BB8FCE",
    "#85C1E9",
    "#F7DC6F",
    "#F1948A",
    "#E59866",
  ];
  private stop = false;
  private manualMovingDown = false;
  ///
  constructor(
    boardDiv: HTMLDivElement,
    private checkBorderPionks: Function,
    private renewGame: Function
  ) {
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
      this.boardDiv.append(cell);

      let key = "";
      index == 0 ? (key = "left") : (key = "right");

      cell.style.left = this.cells[key].x + "px";
      cell.style.top = this.cells[key].y + "px";

      this.cells[key].div = cell;
      this.cells[key].color = this.possibleColors[colorIndex];
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
      if (!this.stop) {
        this.updateBothCoordinates(
          undefined,
          this.cells.left.y + 20,
          undefined,
          this.cells.right.y + 20
        );
      }

      if (this.checkBottomCollision()) {
        clearInterval(this.movingInterval);
        this.stop = true;
        this.renewGame(this);
        return;
      }
    }, 400);
  }

  private checkLeftCollision() {
    if (this.cells.left.x <= 0) return true;
    else return false;
  }

  private checkRightCollision() {
    if (this.cells.right.x >= 140) return true;
    else return false;
  }

  private checkBottomCollision() {
    if (
      this.cells.left.y >= 280 ||
      this.cells.right.y >= 280 ||
      this.checkBorderPionks(this)
    ) {
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
          this.manualMovingDown = true;

          if (this.checkBottomCollision()) {
            this.stop = true;
            break;
          }
          this.updateBothCoordinates(
            undefined,
            this.cells.left.y + 20,
            undefined,
            this.cells.right.y + 20
          );

          break;
        case "r":
          const xSpan = this.cells.right.x - this.cells.left.x;
          const ySpan = this.cells.right.y - this.cells.left.y;
          this.rotate(xSpan, ySpan);

          break;
        case "t":
          const xSpanR = this.cells.left.x - this.cells.right.x;
          const ySpanR = this.cells.left.y - this.cells.right.y;
          this.rotate(xSpanR, ySpanR);

          break;
      }
    });

    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key == "ArrowDown") this.manualMovingDown = false;
    });
  }

  private rotate(xSpan, ySpan) {
    //refactor!
    if (xSpan == 20 && ySpan == 0) {
      //prettier-ignore
      this.updateBothCoordinates(undefined,undefined,this.cells.left.x,this.cells.left.y-20)
    }
    if (xSpan == 0 && ySpan == -20) {
      //prettier-ignore
      this.updateBothCoordinates(undefined,undefined,this.cells.left.x-20,this.cells.left.y)
    }
    if (xSpan == -20 && ySpan == 0) {
      //prettier-ignore
      this.updateBothCoordinates(undefined,undefined,this.cells.left.x,this.cells.left.y+20)
    }
    if (xSpan == 0 && ySpan == 20) {
      //prettier-ignore
      this.updateBothCoordinates(undefined,undefined,this.cells.left.x+20,this.cells.left.y)
    }
  }

  private updateBothCoordinates(
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
