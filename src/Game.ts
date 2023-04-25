import { Cell, GameInter, cellObj } from "../types/interfaces";
import { Pionek } from "./Pionek";
import genUniqueId from "./utils/genUniqueId";
import { frame } from "../types/interfaces";
import { Anim } from "./Anim";
export class Game implements GameInter {
  boardCon = <HTMLDivElement>document.getElementById("board");
  curScoreCon = <HTMLDivElement>document.getElementById("cur-cont");
  bestScoreCon = <HTMLDivElement>document.getElementById("top-cont");
  handCont = <HTMLDivElement>document.getElementById("hand-cont");
  aliveNumCont = <HTMLDivElement>document.getElementById("alive-num");
  alertCon = <HTMLDivElement>document.getElementById("alert");
  alertLooseCon = <HTMLDivElement>document.getElementById("alertLoose");
  viruses = {
    red: <HTMLDivElement>document.getElementById("red"),
    blue: <HTMLDivElement>document.getElementById("blue"),
    yellow: <HTMLDivElement>document.getElementById("yellow"),
  };

  CELL_WIDTH = 17;
  score = 0;
  bestScore = 0;
  destId = "board-img-cont";
  gameId = genUniqueId();
  stop = false;
  first = true;
  allCells: Cell[] = [];
  cellsToDelete: Cell[] = [];
  pionek: Pionek;
  aliveViruses = 4;
  steps = [
    "first-step",
    "second-step",
    "third-step",
    "fourth-step",
    "fifth-step",
    "sixth-step",
  ];
  possibleColors = ["red", "yellow", "blue", "blue"];

  data: any;
  img: any;
  boardGraphicCoords: frame;

  constructor() {
    this.bestScore = +localStorage.getItem("best");

    fetch("./data/animations.json")
      .then((res) => res.json())
      .then((data) => {
        let imgsArray: Anim[] = [];

        let anim = function () {
          for (let i = 0; i < imgsArray.length; i++) imgsArray[i].goAnim();
          window.requestAnimationFrame(anim);
        };

        this.data = data;
        this.img = new Image();
        this.img.src = "./img/spritesheet.png";

        this.img.onload = () => {
          this.boardGraphicCoords = data.board.pos;

          new Set(this.possibleColors).forEach((color) =>
            imgsArray.push(new Anim(this.img, data[color], color))
          );

          anim();
          ////
          this.renderBoard();
          this.renderPionek();
          this.renderViruses(data);
          this.renderScore();
          this.renderScore();
          this.renderScoreHelper(
            String(this.aliveViruses).padStart(2, "0"),
            this.aliveNumCont
          );
          this.animateViruses();
          this.renderHand(2);
        };
      });
  }

  private renderBoard() {
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 8; x++) {
        const div = document.createElement("div");

        div.classList.add("cell");
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

    let canvas = document.createElement("canvas");
    canvas.width = this.boardGraphicCoords.w;
    canvas.height = this.boardGraphicCoords.h;
    let ctx = canvas.getContext("2d");

    //prettier-ignore
    ctx.drawImage(this.img,this.boardGraphicCoords.x0,this.boardGraphicCoords.y0,this.boardGraphicCoords.w,this.boardGraphicCoords.h,0, 0,this.boardGraphicCoords.w,this.boardGraphicCoords.h);

    let url = canvas.toDataURL();
    let dest = document.getElementById(this.destId);
    dest.style.backgroundImage = "url('" + url + "')";
  }

  private renderPionek = () => {
    if (this.stop) return;

    //prettier-ignore
    this.pionek = new Pionek(this.boardCon,this.checkBorderPionks,this.renew,this.checkCollisionsOnMove,this.getBackgroundUrl,this.checkBordersOnRotation,this.data,this.renderHand,this.renderPionek);
    if (this.first) {
      this.pionek.throwPill();
      this.first = false;
    }
  };

  renderHand = (index: number) => {
    const frames = this.data.hand.frames[index];
    let canvas = document.createElement("canvas");

    canvas.width = 60;
    canvas.height = 90;

    let ctx = canvas.getContext("2d");
    if (index == 2) {
      const frame = frames["top"];
      //prettier-ignore
      ctx.drawImage(this.img,frame.x0,frame.y0,frame.w,frame.h,35,50,frame.w,frame.h);
    } else {
      let i = 0;
      let x,
        y = 0;
      if (index == 0) {
        x = 36;
        y = 3;
      } else {
        x = 12;
        y = 24;
      }
      for (const key in frames) {
        const frame = frames[key];
        //prettier-ignore
        ctx.drawImage(this.img,frame.x0,frame.y0,frame.w,frame.h,x,y + frame.h * i,frame.w,frame.h);
        i++;
      }
    }

    let url = canvas.toDataURL();
    this.handCont.style.backgroundImage = "url('" + url + "')";
  };

  private renderViruses(data) {
    const indexes = [];

    while (indexes.length < 4) {
      const index = 60 + Math.floor(Math.random() * 60);
      if (indexes.indexOf(index) === -1) indexes.push(index);
    }

    indexes.forEach((index, i) => {
      const div = document.createElement("div");

      div.classList.add("cell");
      div.style.left = `${this.allCells[index].x}px`;
      div.style.top = `${this.allCells[index].y}px`;

      const url = this.getBackgroundUrl(undefined, this.possibleColors[i]);

      div.style.backgroundImage = "url('" + url + "')";

      this.boardCon.append(div);

      this.allCells[index].flag = "virus";
      this.allCells[index].color = this.possibleColors[i];
      this.allCells[index].div = div;
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

  private checkIfVirusWasKilled() {
    const indexOfVirus = this.cellsToDelete.findIndex(
      (el) => el.flag == "virus"
    );

    if (indexOfVirus !== -1) {
      const virusCell: Cell = this.cellsToDelete[indexOfVirus];
      const id = virusCell.id;

      const indexOfVirus2 = this.cellsToDelete.findIndex(
        (el) => el.flag == "virus" && el.id != id
      );

      if (indexOfVirus2 !== -1) {
        this.aliveViruses -= 2;
        this.score += 200;
      } else {
        this.aliveViruses--;
        this.score += 100;
      }

      if (this.score > this.bestScore) this.bestScore = this.score;

      this.renderScoreHelper(
        String(this.aliveViruses).padStart(2, "0"),
        this.aliveNumCont
      );

      localStorage.setItem("best", String(this.bestScore));
      let allKilled = false;

      if (this.aliveViruses == 0) allKilled = true;
      if (allKilled) this.renderAlert("stageCompleted");

      this.renderScore();
    }
  }

  private renderScore() {
    this.renderScoreHelper(
      String(this.score).padStart(8, "0"),
      this.curScoreCon
    );

    this.renderScoreHelper(
      String(this.bestScore).padStart(8, "0"),
      this.bestScoreCon
    );
  }

  renderScoreHelper(str: string, place: HTMLDivElement) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 23;

    str.split("").forEach((letter, i) => {
      const pos = this.data.numbers.pos[Number(letter)];
      //prettier-ignore
      ctx.drawImage(this.img,pos.x0,pos.y0,pos.w, pos.h,i * 24,0,pos.w,pos.h);
    });

    let url = canvas.toDataURL();

    place.style.backgroundImage = "url('" + url + "')";
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
      const cell = pionek.cells[key];
      const index = this.allCells.findIndex(
        (el) => el.x == cell.x && el.y == cell.y
      );

      this.allCells[index].color = cell.color;
      this.allCells[index].div = cell.div;
      this.allCells[index].id = cell.id;
    }

    this.checkForZbicie(pionek);
    if (!this.stop) this.pionek.throwPill();
  };

  public checkBordersOnRotation = (x, y) => {
    const index = this.allCells.findIndex(
      (el) => el.div !== null && el.x == x && el.y == y
    );
    if (index == -1) return true;
    else return false;
  };

  public checkBorderPionks = (pionek: Pionek) => {
    let wynik = false;

    this.allCells.forEach((element) => {
      for (const key in pionek.cells) {
        const pos = pionek.cells[key];
        //prettier-ignore
        if (pos.x == element.x &&pos.y + this.CELL_WIDTH == element.y &&element.div !== null) {

          if (pos.y < 17) {

            this.stop = true;
            this.renderAlert("gameOver");

          }
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

        if (
          this.allCells[l].div == null ||
          this.allCells[l].color !== element.color
        ) {
          bool = false;
          break;
        }

        this.cellsToDelete.push(this.allCells[l]);
      }
      return bool;
    };

    for (const key in pionek.cells) {
      const obj = pionek.cells[key];
      //prettier-ignore
      let indexLeft = -1,indexBottom = -1,indexTop = -1,indexRight = -1;

      this.allCells.forEach((el, i) => {
        if (el.x == obj.x - this.CELL_WIDTH && el.y == obj.y) indexLeft = i;
        if (el.x == obj.x && el.y == obj.y - this.CELL_WIDTH) indexTop = i;
        if (el.x == obj.x + this.CELL_WIDTH && el.y == obj.y) indexRight = i;
        if (el.x == obj.x && el.y == obj.y + this.CELL_WIDTH) indexBottom = i;
      });

      const indexes = [indexLeft, indexRight, indexTop, indexBottom];
      console.log(indexes);

      ////////////

      indexes.forEach((element, i) => {
        if (element == -1) return;
        const cellObj: Cell = this.allCells[element];

        if (cellObj.div == null) return;
        const vectorX = obj.x - cellObj.x;
        const vectorY = obj.y - cellObj.y;

        if (checkInRow(obj, vectorX, vectorY)) {
          this.checkIfVirusWasKilled();

          this.cellsToDelete.forEach((cell) => {
            const index = this.allCells.findIndex(
              (el) => el.x == cell.x && el.y == cell.y
            );

            const cellToDelete = this.allCells[index];
            const id = cellToDelete.id;
            cellToDelete.id = null;

            const siblingIndex = this.allCells.findIndex((el) => el.id == id);
            //prettier-ignore
            if (siblingIndex !== -1 &&this.allCells[siblingIndex].div !== null) {

              const cell = this.allCells[siblingIndex];
              cell.div.style.backgroundImage =
                "url('" + this.getBackgroundUrl("one", cell.color) + "')";
            }

            this.destroyAnimation(cellToDelete);
            this.spadamyPanowie();
          });
        }
      });
    }
  }
  private destroyAnimation(cell: Cell) {
    let index = 0;

    let i = setInterval(() => {
      if (index == 2) {
        clearInterval(i);
        cell.div.style.display = "none";
        cell.div = null;
        cell.color = "none";
        cell.flag = "zbite";
        return;
      }
      cell.div.style.backgroundImage =
        "url('" + this.getBackgroundUrl(index, cell.color) + "')";
      index++;
    }, 100);
  }
  private spadamyPanowie() {
    let opadlo;
    // const opadanie = () => {
    //   opadlo = false;
    //   for (let index = this.allCells.length - 1; index > 0; index--) {
    //     const cell: Cell = this.allCells[index];
    //     if (cell.div == null) continue;
    //     const indexBelow = this.allCells.findIndex(
    //       (el) => el.x == cell.x && el.y - this.CELL_WIDTH == cell.y
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
  private reRender() {
    this.allCells.forEach((cell) => {
      if (cell.div == null) return;
      cell.div.style.top = cell.y + "px";
    });
  }
  private getBackgroundUrl = (direction: any, color: string) => {
    let canvas = document.createElement("canvas");
    canvas.width = 17;
    canvas.height = 17;
    let ctx = canvas.getContext("2d");

    //prettier-ignore
    const firtsLetter = color[0].toUpperCase()
    const arr = color.split("");
    arr.shift();
    arr.unshift(firtsLetter);

    //prettier-ignore
    if(typeof direction=="string"){
      const pos = this.data[`cell${arr.join("")}`];
      ctx.drawImage(this.img,pos[direction].x0,pos[direction].y0,pos[direction].w,pos[direction].h,0,0,pos[direction].w,pos[direction].h);

    }else if(typeof direction=="number"){
      const pos = this.data[`cell${arr.join("")}`];
//prettier-ignore
    ctx.drawImage(this.img,pos.animation[direction].x0,pos.animation[direction].y0,pos.animation[direction].w,pos.animation[direction].h,0,0,pos.animation[direction].w,pos.animation[direction].h);
    }
    else{
      ctx.drawImage(this.img,this.data[`virus${arr.join("")}`].pos.x0,this.data[`virus${arr.join("")}`].pos.y0,this.data[`virus${arr.join("")}`].pos.w,this.data[`virus${arr.join("")}`].pos.h,0,0,this.data[`virus${arr.join("")}`].pos.w,this.data[`virus${arr.join("")}`].pos.h);

    }

    let url = canvas.toDataURL();
    return url;
  };
  renderAlert(msg) {
    const pos = this.data[msg].pos;

    let canvas = document.createElement("canvas");
    canvas.width = pos.w;
    canvas.height = 118;
    let ctx = canvas.getContext("2d");

    ctx.drawImage(this.img, pos.x0, pos.y0, pos.w, pos.h, 0, 0, pos.w, pos.h);

    let url = canvas.toDataURL();
    if (msg == "gameOver") {
      this.alertLooseCon.style.backgroundImage = "url('" + url + "')";
    } else {
      this.alertCon.style.backgroundImage = "url('" + url + "')";
    }
    this.stop = true;
  }
}
