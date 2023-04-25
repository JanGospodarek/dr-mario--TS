import { Cells, Cell, PionekInter } from "../types/interfaces";
import genUniqueId from "./utils/genUniqueId";

export class Pionek implements PionekInter {
  id = genUniqueId();
  //prettier-ignore
  cells: Cells = {
    left: {x: 220,y: -50,div: null,color: "none",flag: "normal",id: this.id,},
    right: {x: 237,y: -50,div: null,color: "none",flag: "normal",id: this.id,},
  };
  possibleColors = ["red", "yellow", "blue"];

  CELL_WIDTH = 17;
  BOARD_WIDTH = 135;
  BOARD_HEIGHT = 255;

  stop = false;
  manualMovingDown = false;

  movingInterval: any;

  constructor(
    private boardDiv: HTMLDivElement,
    private checkBorderPionks: Function,
    private renewGame: Function,
    private checkCollisionsOnMove: Function,
    private getBackgroundUrl: Function,
    private data: any,
    private renderHand: Function,
    private renderPionek: Function
  ) {
    this.buildPionek();
    this.renderSkin();
    this.renderHand(0);
  }
  /**
   * throwing pill animation
   */
  public throwPill = () => {
    let index = 0;
    let i = setInterval(() => {
      if (index == this.data.throwPill.frames.length) {
        clearInterval(i);
        this.renderPionek();
        this.moving();
        this.addControls();
        return;
      }
      const frame = this.data.throwPill.frames[index];
      for (const key in this.cells) {
        const cell: Cell = this.cells[key];
        cell.x = frame[key].x;

        frame[key].y !== 0
          ? (cell.y = frame[key].y + 5)
          : (cell.y = frame[key].y);

        cell.div.style.top = `${String(cell.y)}px`;
        cell.div.style.left = `${String(cell.x)}px`;

        this.renderSkin();

        if (index < 8) this.renderHand(0);
        else if (index < 16) this.renderHand(1);
        else if (index < 25) this.renderHand(2);
      }
      index++;
    }, 60);
  };
  /**
   * Building pill
   */
  private buildPionek() {
    for (let index = 0; index < 2; index++) {
      const cell = document.createElement("div");

      const colorIndex = this.getColor();

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

  private getColor() {
    return Math.floor(Math.random() * 3);
  }
  /**
   * Moving down interval
   */
  private moving() {
    this.movingInterval = setInterval(() => {
      if (this.manualMovingDown) return;
      //prettier-ignore
      if (!this.stop) 
        this.updateBothCoordinates(undefined,this.cells.left.y + this.CELL_WIDTH,undefined,this.cells.right.y + this.CELL_WIDTH);

      if (this.checkBottomCollision()) {
        clearInterval(this.movingInterval);
        this.stop = true;
        this.renewGame(this);
        return;
      }
    }, 400);
  }
  /**
   * Cheks collisions on left side of pill
   * @returns true if collision occurs else false
   */
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

  /**
   * Cheks collisions on right side of pill
   * @returns true if collision occurs else false
   */
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
  /**
   * Cheks collisions on bottom side of pill
   * @returns true if collision occurs else false
   */
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
  /**
   * Adding controls to pill
   */
  private addControls() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (this.stop) return;
      const key = e.key;
      switch (key) {
        case "ArrowLeft":
          if (this.checkLeftCollision()) break;
          // prettier-ignore
          this.updateBothCoordinates(this.cells.left.x - this.CELL_WIDTH,undefined,this.cells.right.x - this.CELL_WIDTH,undefined);
          // prettier-ignore
          if (this.checkBottomCollision()) {clearInterval(this.movingInterval);this.stop = true;this.renewGame(this);return; }

          break;
        case "ArrowRight":
          if (this.checkRightCollision()) break;
          // prettier-ignore
          this.updateBothCoordinates(this.cells.left.x + this.CELL_WIDTH,undefined,this.cells.right.x + this.CELL_WIDTH,undefined);
          // prettier-ignore
          if (this.checkBottomCollision()) {clearInterval(this.movingInterval);this.stop = true;this.renewGame(this);return;}
          break;
        case "ArrowDown":
          this.manualMovingDown = true;

          if (this.checkBottomCollision()) {
            this.stop = true;
            break;
          }
          // prettier-ignore
          this.updateBothCoordinates(undefined,this.cells.left.y + this.CELL_WIDTH,undefined,this.cells.right.y + this.CELL_WIDTH);

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
      if (e.key == "ArrowDown")
        setTimeout(() => {
          this.manualMovingDown = false;
        }, 100);
    });
  }
  /**
   *  Rotating of pill
   * @param xSpan - x span of rotation
   * @param ySpan - y span of rotation
   * @param letter - "r" or "t" letter thath symbolises left or right rotation key
   */
  private rotate(xSpan, ySpan, letter) {
    //refactor!
    if (letter == "r") {
      if (xSpan == this.CELL_WIDTH && ySpan == 0) {
        //prettier-ignore
        if(!this.checkCollisionsOnMove(this.cells.left.x,this.cells.left.y-this.CELL_WIDTH))
        this.updateBothCoordinates(undefined,undefined,this.cells.left.x,this.cells.left.y-this.CELL_WIDTH)
      }
      if (xSpan == 0 && ySpan == -this.CELL_WIDTH) {
        //prettier-ignore
        if(!this.checkCollisionsOnMove(this.cells.left.x + this.CELL_WIDTH,this.cells.left.y)&&!this.checkCollisionsOnMove(this.cells.right.x, this.cells.right.y + this.CELL_WIDTH))
        this.updateBothCoordinates(this.cells.left.x + this.CELL_WIDTH,this.cells.left.y,this.cells.right.x, this.cells.right.y + this.CELL_WIDTH );
      }
      if (xSpan == -this.CELL_WIDTH && ySpan == 0) {
        //prettier-ignore
        if(!this.checkCollisionsOnMove(this.cells.right.x,this.cells.right.y-this.CELL_WIDTH))
        this.updateBothCoordinates(this.cells.right.x,this.cells.right.y-this.CELL_WIDTH,undefined,undefined)
      }
      if (xSpan == 0 && ySpan == this.CELL_WIDTH) {
        //prettier-ignore
        if(!this.checkCollisionsOnMove(this.cells.left.x,this.cells.left.y+this.CELL_WIDTH)&&!this.checkCollisionsOnMove(this.cells.left.x+this.CELL_WIDTH,this.cells.right.y))
        this.updateBothCoordinates(this.cells.left.x,this.cells.left.y+this.CELL_WIDTH,this.cells.left.x+this.CELL_WIDTH,this.cells.right.y)
      }
    }

    if (letter == "t") {
      if (xSpan == this.CELL_WIDTH && ySpan == 0) {
        //prettier-ignore
        if(!this.checkCollisionsOnMove(this.cells.right.x,this.cells.right.y-this.CELL_WIDTH))
        this.updateBothCoordinates(this.cells.right.x,this.cells.right.y-this.CELL_WIDTH,undefined,undefined)
      }
      if (xSpan == 0 && ySpan == -this.CELL_WIDTH) {
        //prettier-ignore
        if(!this.checkCollisionsOnMove(this.cells.left.x-this.CELL_WIDTH,this.cells.left.y)&&!this.checkCollisionsOnMove(this.cells.right.x,this.cells.right.y+this.CELL_WIDTH))
        this.updateBothCoordinates(this.cells.left.x-this.CELL_WIDTH,this.cells.left.y,this.cells.right.x,this.cells.right.y+this.CELL_WIDTH)
      }
      if (xSpan == -this.CELL_WIDTH && ySpan == 0) {
        //prettier-ignore
        if(!this.checkCollisionsOnMove(this.cells.left.x,this.cells.left.y)&&!this.checkCollisionsOnMove(this.cells.right.x+this.CELL_WIDTH,this.cells.left.y-this.CELL_WIDTH))
        this.updateBothCoordinates(this.cells.left.x,this.cells.left.y,this.cells.right.x+this.CELL_WIDTH,this.cells.left.y-this.CELL_WIDTH)
      }
      if (xSpan == 0 && ySpan == this.CELL_WIDTH) {
        //prettier-ignore
        if(!this.checkCollisionsOnMove(this.cells.left.x,this.cells.right.y)&&!this.checkCollisionsOnMove(this.cells.right.x-this.CELL_WIDTH,this.cells.right.y))
        this.updateBothCoordinates(this.cells.left.x,this.cells.right.y,this.cells.right.x-this.CELL_WIDTH,this.cells.right.y)
      }
    }
  }
  /**
   * Rendering pill skin from sprite
   */
  private renderSkin() {
    if (this.cells.left.y === this.cells.right.y - this.CELL_WIDTH) {
      this.cells.left.div.style.backgroundImage =
        "url('" + this.getBackgroundUrl("top", this.cells.left.color) + "')";
      this.cells.right.div.style.backgroundImage =
        "url('" +
        this.getBackgroundUrl("bottom", this.cells.right.color) +
        "')";
    }

    if (this.cells.left.y === this.cells.right.y + this.CELL_WIDTH) {
      this.cells.left.div.style.backgroundImage =
        "url('" + this.getBackgroundUrl("bottom", this.cells.left.color) + "')";
      this.cells.right.div.style.backgroundImage =
        "url('" + this.getBackgroundUrl("top", this.cells.right.color) + "')";
    }

    if (this.cells.left.x === this.cells.right.x - this.CELL_WIDTH) {
      this.cells.left.div.style.backgroundImage =
        "url('" + this.getBackgroundUrl("left", this.cells.left.color) + "')";
      this.cells.right.div.style.backgroundImage =
        "url('" + this.getBackgroundUrl("right", this.cells.right.color) + "')";
    }

    if (this.cells.left.x === this.cells.right.x + this.CELL_WIDTH) {
      this.cells.left.div.style.backgroundImage =
        "url('" + this.getBackgroundUrl("right", this.cells.left.color) + "')";
      this.cells.right.div.style.backgroundImage =
        "url('" + this.getBackgroundUrl("left", this.cells.right.color) + "')";
    }
  }
  /**
   * Updating pill coordinates
   * @param xLeft - new X position of Left cell in pill
   * @param yLeft - new Y position of Left cell in pill
   * @param xRight - new X position of Right cell in pill
   * @param yRight - new Y position of Right cell in pill
   */
  private updateBothCoordinates(
    xLeft: number | undefined,
    yLeft: number | undefined,
    xRight: number | undefined,
    yRight: number | undefined
  ) {
    //prettier-ignore
    if (yLeft > this.BOARD_HEIGHT ||yRight > this.BOARD_HEIGHT ||xLeft < 0 ||xLeft >= this.BOARD_WIDTH ||xRight < 0 ||xRight >= this.BOARD_WIDTH)
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
    this.renderSkin();
  }
}
