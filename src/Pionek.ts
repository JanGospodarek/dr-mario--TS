import { Cells, Cell } from "../types/interfaces";
import genUniqueId from "./utils/genUniqueId";

export class Pionek {
  private btn = <HTMLDivElement>document.getElementById("stop");
  id = genUniqueId();
  private movingInterval: any;
  CELL_WIDTH = 17;
  BOARD_WIDTH = 135;
  BOARD_HEIGHT = 255;
  private stop = false;
  private manualMovingDown = false;
  private possibleColors = ["#BB8FCE", "#85C1E9", "#F7DC6F", "#F1948A"];
  cells: Cells = {
    left: { x: 51, y: 0, div: null, color: "none", flag: "normal" },
    right: { x: 68, y: 0, div: null, color: "none", flag: "normal" },
  };

  constructor(
    private boardDiv: HTMLDivElement,
    private checkBorderPionks: Function,
    private renewGame: Function,
    private checkCollisionsOnMove: Function
  ) {
    this.buildPionek();
    this.moving();
    this.addControls();
    ///development proposes
    this.btn.addEventListener("click", () => {
      clearInterval(this.movingInterval);
    });
  }

  private buildPionek() {
    let fristColor: number | null = null;

    for (let index = 0; index < 2; index++) {
      const cell = document.createElement("div");

      // const colorIndex = this.getColor(fristColor);
      // fristColor = colorIndex;
      const colorIndex = this.getColor();
      cell.style.backgroundColor = this.possibleColors[colorIndex];
      cell.innerText = String(index);
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

  // private getColor(except: number | null) {
  //   let i = Math.floor(Math.random() * 5);
  //   while (i == except) {
  //     i = Math.floor(Math.random() * 5);
  //   }
  //   return i;
  // }
  private getColor() {
    return Math.floor(Math.random() * 4);
  }
  private moving() {
    this.movingInterval = setInterval(() => {
      if (this.manualMovingDown) return;
      if (!this.stop) {
        this.updateBothCoordinates(
          undefined,
          this.cells.left.y + this.CELL_WIDTH,
          undefined,
          this.cells.right.y + this.CELL_WIDTH
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
    let wynik1,
      wynik2 = false;
    for (const key in this.cells) {
      const cell: Cell = this.cells[key];
      if (this.checkCollisionsOnMove(cell.x - this.CELL_WIDTH, cell.y)) {
        wynik1 = true;
      }
    }

    if (this.cells.left.x <= 0) wynik2 = true;
    return wynik1 || wynik2;
  }

  private checkRightCollision() {
    let wynik1,
      wynik2 = false;
    for (const key in this.cells) {
      const cell: Cell = this.cells[key];
      if (this.checkCollisionsOnMove(cell.x + this.CELL_WIDTH, cell.y)) {
        wynik1 = true;
      }
    }

    if (this.cells.left.x >= this.BOARD_WIDTH - this.CELL_WIDTH) wynik2 = true;
    return wynik1 || wynik2;
  }

  private checkBottomCollision() {
    if (
      this.cells.left.y >= this.BOARD_HEIGHT - this.CELL_WIDTH ||
      this.cells.right.y >= this.BOARD_HEIGHT - this.CELL_WIDTH ||
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
            this.cells.left.x - this.CELL_WIDTH,
            undefined,
            this.cells.right.x - this.CELL_WIDTH,
            undefined
          );

          break;
        case "ArrowRight":
          // prettier-ignore
          if (this.checkRightCollision() ) break;
          this.updateBothCoordinates(
            this.cells.left.x + this.CELL_WIDTH,
            undefined,
            this.cells.right.x + this.CELL_WIDTH,
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
            this.cells.left.y + this.CELL_WIDTH,
            undefined,
            this.cells.right.y + this.CELL_WIDTH
          );

          break;
        case "r":
          const xSpan = this.cells.right.x - this.cells.left.x;
          const ySpan = this.cells.right.y - this.cells.left.y;
          this.rotate(xSpan, ySpan, "r");

          break;
        case "t":
          const xSpanR = this.cells.right.x - this.cells.left.x;
          const ySpanR = this.cells.right.y - this.cells.left.y;
          this.rotate(xSpanR, ySpanR, "t");

          break;
      }
    });

    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key == "ArrowDown") this.manualMovingDown = false;
    });
  }

  checkBordersOnRotation = (x: number) => {
    if (x <= 0 || x >= this.BOARD_WIDTH) return false;
    else return true;
  };

  private rotate(xSpan, ySpan, letter) {
    //refactor!
    if (letter == "r") {
      if (xSpan == this.CELL_WIDTH && ySpan == 0) {
        //prettier-ignore
        // this.updateBothCoordinates(undefined,undefined,this.cells.left.x,this.cells.left.y-this.CELL_WIDTH)
        this.updateBothCoordinates(undefined,undefined,this.cells.left.x,this.cells.left.y-this.CELL_WIDTH)
      }
      if (xSpan == 0 && ySpan == -this.CELL_WIDTH) {
        //prettier-ignore
        // this.updateBothCoordinates(undefined,undefined,this.cells.left.x-this.CELL_WIDTH,this.cells.left.y)
        this.updateBothCoordinates(
          this.cells.left.x + this.CELL_WIDTH,
          this.cells.left.y,
          this.cells.right.x,
          this.cells.right.y + this.CELL_WIDTH
        );
      }
      if (xSpan == -this.CELL_WIDTH && ySpan == 0) {
        //prettier-ignore
        this.updateBothCoordinates(this.cells.right.x,this.cells.right.y-this.CELL_WIDTH,undefined,undefined)
      }
      if (xSpan == 0 && ySpan == this.CELL_WIDTH) {
        //prettier-ignore
        this.updateBothCoordinates(this.cells.left.x,this.cells.left.y+this.CELL_WIDTH,this.cells.left.x+this.CELL_WIDTH,this.cells.right.y)
      }
    }

    if (letter == "t") {
      if (xSpan == this.CELL_WIDTH && ySpan == 0) {
        //prettier-ignore
        this.updateBothCoordinates(this.cells.right.x,this.cells.right.y-this.CELL_WIDTH,undefined,undefined)
      }
      if (xSpan == 0 && ySpan == -this.CELL_WIDTH) {
        //prettier-ignore
        this.updateBothCoordinates(this.cells.left.x-this.CELL_WIDTH,this.cells.left.y,this.cells.right.x,this.cells.right.y+this.CELL_WIDTH)
      }
      if (xSpan == -this.CELL_WIDTH && ySpan == 0) {
        //prettier-ignore
        this.updateBothCoordinates(this.cells.left.x,this.cells.left.y,this.cells.right.x+this.CELL_WIDTH,this.cells.left.y-this.CELL_WIDTH)
      }
      if (xSpan == 0 && ySpan == this.CELL_WIDTH) {
        //prettier-ignore
        this.updateBothCoordinates(this.cells.left.x,this.cells.right.y,this.cells.right.x-this.CELL_WIDTH,this.cells.right.y)
      }
    }
  }

  private updateBothCoordinates(
    xLeft: number | undefined,
    yLeft: number | undefined,
    xRight: number | undefined,
    yRight: number | undefined
  ) {
    if (
      yLeft > this.BOARD_HEIGHT ||
      yRight > this.BOARD_HEIGHT ||
      xLeft < 0 ||
      xLeft >= this.BOARD_WIDTH ||
      xRight < 0 ||
      xRight >= this.BOARD_WIDTH
    )
      return;
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
