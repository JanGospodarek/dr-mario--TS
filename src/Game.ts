import { Cell, GameInter, cellObj } from "../types/interfaces";
import { Pionek } from "./Pionek";
import genUniqueId from "./utils/genUniqueId";
import { frame } from "../types/interfaces";
import { Anim } from "./Anim";
export class Game implements GameInter {
  boardCon = <HTMLDivElement>document.getElementById("board");
  scoreCon = <HTMLDivElement>document.getElementById("score");
  curScoreCon = <HTMLDivElement>document.getElementById("cur-cont");
  bestScoreCon = <HTMLDivElement>document.getElementById("bestScore");
  boardGraphicCoords: frame;
  CELL_WIDTH = 17;
  data: any;
  img: any;
  destId = "board-img-cont";
  pionks: Pionek[] = [];
  allCells: Cell[] = [];
  viruses = {
    red: <HTMLDivElement>document.getElementById("red"),
    blue: <HTMLDivElement>document.getElementById("blue"),
    yellow: <HTMLDivElement>document.getElementById("yellow"),
  };
  steps = [
    "first-step",
    "second-step",
    "third-step",
    "fourth-step",
    "fifth-step",
    "sixth-step",
  ];
  score = 0;
  bestScore = 0;
  private possibleColors = ["#FF0000", "#FFFF00", "#0000FF"];
  cellsToDelete: Cell[] = [];
  gameId = genUniqueId();
  constructor() {
    this.bestScore = +localStorage.getItem("best");

    fetch("./data/animations.json")
      .then((res) => res.json())
      .then((data) => {
        let imgsArray: Anim[] = []; // tablica z animacjami
        let anim = function () {
          for (let i = 0; i < imgsArray.length; i++) imgsArray[i].goAnim();
          window.requestAnimationFrame(anim); // z definicji 60 klatek/s
        };
        this.data = data;
        this.img = new Image();
        this.img.src = "./img/spritesheet.png";
        this.img.onload = () => {
          this.boardGraphicCoords = data.board.pos;
          imgsArray.push(new Anim(this.img, data.blue, "blue"));
          imgsArray.push(new Anim(this.img, data.yellow, "yellow"));
          imgsArray.push(new Anim(this.img, data.red, "red"));
          anim();
          this.renderBoard();
          this.renderPionek();
          this.renderViruses(data);
          this.renderScore();
          this.animateViruses();
        };
      });
  }

  private renderBoard() {
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 8; x++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        // div.innerText = String(this.allCells.length);
        div.style.left = `${this.CELL_WIDTH * x}px`;
        div.style.top = `${this.CELL_WIDTH * y}px`;
        this.allCells.push(<Cell>{
          x: this.CELL_WIDTH * x,
          y: this.CELL_WIDTH * y,
          color: "none",
          div: null,
          flag: "normal",
        });

        this.boardCon.append(div);
      }
    }
    // //drawing graphics
    let canvas = document.createElement("canvas");
    canvas.width = this.boardGraphicCoords.w;
    canvas.height = this.boardGraphicCoords.h;
    let ctx = canvas.getContext("2d");

    ctx.drawImage(
      this.img,
      this.boardGraphicCoords.x0,
      this.boardGraphicCoords.y0,
      this.boardGraphicCoords.w,
      this.boardGraphicCoords.h,
      0,
      0,
      this.boardGraphicCoords.w,
      this.boardGraphicCoords.h
    );

    let url = canvas.toDataURL();
    let dest = document.getElementById(this.destId);
    dest.style.backgroundImage = "url('" + url + "')";
  }

  private renderPionek() {
    const pionek = new Pionek(
      this.boardCon,
      this.checkBorderPionks,
      this.renew,
      this.checkCollisionsOnMove
    );
    this.pionks.push(pionek);
  }

  private renderViruses(data) {
    const indexes = [];
    while (indexes.length < 3) {
      const index = 40 + Math.floor(Math.random() * 60);
      if (indexes.indexOf(index) === -1) indexes.push(index);
    }
    indexes.forEach((index, i) => {
      const div = document.createElement("div");

      div.classList.add("cell");
      div.style.left = `${this.allCells[index].x}px`;
      div.style.top = `${this.allCells[index].y}px`;

      // div.style.backgroundColor = this.possibleColors[i];
      const url = this.getBackgroundUrlVirus(data, this.possibleColors[i]);

      div.style.backgroundImage = "url('" + url + "')";

      this.boardCon.append(div);

      this.allCells[index].flag = "virus";
      this.allCells[index].color = this.possibleColors[i];
      this.allCells[index].div = div;
      // console.log(this.allCells[index]);
    });
  }

  private animateViruses() {
    let iterator = 1;
    let i = setInterval(() => {
      if (iterator == 7) iterator = 1;
      for (const key in this.viruses) {
        const virus = <HTMLDivElement>this.viruses[key];

        let newClass = this.steps[iterator];
        let oldClass = this.steps[iterator - 1];

        if (this.steps[iterator - 1] == "sixth-step") {
          newClass = this.steps[0];
        }

        virus.classList.replace(oldClass, newClass);
      }
      iterator++;
    }, 2000);
  }

  private getBackgroundUrlVirus(data, color) {
    let canvas = document.createElement("canvas");
    canvas.width = 15;
    canvas.height = 15;
    let ctx = canvas.getContext("2d");

    //prettier-ignore

    switch (color) {
      case "#FF0000":      
      console.log(data.virusRed);
      
        ctx.drawImage( this.img,data.virusRed.pos.x0,data.virusRed.pos.y0, data.virusRed.pos.w,data.virusRed.pos.h,0,0,data.virusRed.pos.w,data.virusRed.pos.h);

        break;
        case '#0000FF':
          ctx.drawImage( this.img,data.virusBlue.pos.x0,data.virusBlue.pos.y0, data.virusBlue.pos.w,data.virusBlue.pos.h,0,0,data.virusBlue.pos.w,data.virusBlue.pos.h);
  
          break; 
        case '#FFFF00':
          ctx.drawImage( this.img,data.virusYellow.pos.x0,data.virusYellow.pos.y0, data.virusYellow.pos.w,data.virusYellow.pos.h,0,0,data.virusYellow.pos.w,data.virusYellow.pos.h);
  
          break;
     
    }

    let url = canvas.toDataURL();
    return url;
    // let dest = document.getElementById(this.destId);
    // dest.style.backgroundImage = "url('" + url + "')";
  }

  private checkCollisionsOnMove = (x, y) => {
    const index = this.allCells.findIndex(
      (el) => el.x == x && el.y == y && el.div !== null
    );
    if (index == -1) return false;
    else return true;
  };

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

    this.allCells.forEach((element) => {
      for (const key in pionek.cells) {
        const pos = pionek.cells[key];
        if (
          pos.x == element.x &&
          pos.y + this.CELL_WIDTH == element.y &&
          element.div !== null
        ) {
          wynik = true;
        }
      }
    });

    return wynik;
  };

  private checkForZbicie(pionek: Pionek) {
    const checkInRow = (element: Cell, vectorX: number, vectorY: number) => {
      this.cellsToDelete = [element];
      let bool = true;

      for (let index = 1; index < 4; index++) {
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
        (el) => el.x == obj.x - this.CELL_WIDTH && el.y == obj.y
      );
      const indexTop = this.allCells.findIndex(
        (el) => el.x == obj.x && el.y == obj.y - this.CELL_WIDTH
      );
      const indexRight = this.allCells.findIndex(
        (el) => el.x == obj.x + this.CELL_WIDTH && el.y == obj.y
      );
      const indexBottom = this.allCells.findIndex(
        (el) => el.x == obj.x && el.y == obj.y + this.CELL_WIDTH
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

          this.checkIfVirusWasKilled();

          this.cellsToDelete.forEach((cell) => {
            const index = this.allCells.findIndex(
              (el) => el.x == cell.x && el.y == cell.y
            );
            const cellToDelete = this.allCells[index];

            cellToDelete.div.remove();
            cellToDelete.div = null;
            cellToDelete.color = "none";
            cellToDelete.flag = "zbite";

            this.spadamyPanowie();
          });
        }
      });
    }
  }

  private checkIfVirusWasKilled() {
    const indexOfVirus = this.cellsToDelete.findIndex(
      (el) => el.flag == "virus"
    );
    if (indexOfVirus !== -1) {
      this.score += 100;
      if (this.score > this.bestScore) this.bestScore = this.score;

      localStorage.setItem("best", String(this.score));

      this.renderScore();
    }
  }

  private spadamyPanowie() {
    // let opadlo;
    // const opadanie = () => {
    //   opadlo = false;
    //   for (let index = this.allCells.length - 1; index > 0; index--) {
    //     const cell: Cell = this.allCells[index];
    //     if (cell.div == null) continue;
    //     const indexBelow = this.allCells.findIndex(
    //       (el) => el.x == cell.x && el.y - 20 == cell.y
    //     );
    //     if (indexBelow == -1) continue;
    //     const cellBellow = this.allCells[indexBelow];
    //     if (cellBellow.flag == "zbite") {
    //       //zejdz w dol
    //       console.log(";c");
    //       // cell.flag = "normal";
    //       cellBellow.flag = "normal";
    //       cellBellow.color = cell.color;
    //       cell.color = "none";
    //       cellBellow.div = cell.div;
    //       cell.div = null;
    //       opadlo = true;
    //     }
    //     if (opadlo) {
    //       opadanie();
    //     } else {
    //       //update interface
    //       this.reRender();
    //     }
    //   }
    // };
    // opadanie();
  }

  // private reRender() {
  //   this.allCells.forEach((cell) => {
  //     if (cell.div == null) return;
  //     cell.div.style.top = cell.x + "px";
  //   });
  // }
  private renderScore() {
    const curStr = String(this.score).padStart(8, "0");
    this.scoreCon.innerText = curStr;
    this.bestScoreCon.innerText = String(this.bestScore).padStart(8, "0");
    curStr.split("").forEach((letter, i) => {
      const pos = this.data.numbers.pos[Number(letter)];

      let canvas = document.createElement("canvas");
      canvas.width = 192;
      canvas.height = 23;
      let ctx = canvas.getContext("2d");
      console.log(pos);

      ctx.drawImage(
        this.img,
        pos.x0,
        pos.y0,
        pos.w,
        pos.h,
        i * 24,
        0,
        pos.w,
        pos.h
      );

      let url = canvas.toDataURL();
      this.curScoreCon.style.backgroundImage = "url('" + url + "')";
    });
  }
}
