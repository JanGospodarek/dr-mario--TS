class Game {
  private boardCon = <HTMLDivElement>document.getElementById("board");
  public pionks: Pionek[] = [];
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
  public renew = (pionek) => {
    console.log(pionek);
    const cells=pionek.pionek.children
    console.log(cells[0].style.left);
    
    this.renderPionek();

  };
  public checkBorderPionks = (
    pos: { x: number; y: number },
    rotation: number
  ): boolean => {
    let xLeft, xRight, y,x;
    if (rotation == 90 || rotation == 270) {
      xLeft=pos.x-10
      xRight=pos.x+10
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

      if((el.rotation==90||el.rotation==270)&&(el.position.x==xRight-10||el.position.x==xLeft+10||el.position.x-10==x)&&el.position.y==y+10)
      {
        index=i
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
  };r
  private renderPionek() {
    const pionek = new Pionek(
      this.boardCon,
      this.renew,
      this.checkBorderPionks
    );
    this.pionks.push(pionek);
  }
}

class Pionek {
  private boardDiv: HTMLDivElement;
  public pionek!: HTMLDivElement;
  private movingInterval: any;
  private possibleColors = [
    "#BB8FCE",
    "#85C1E9",
    "#F7DC6F",
    "#F1948A",
    "#E59866",
  ];
  private stop = false;
  private checkBorderPionks: Function;
  private renewGame: Function;
  private manualMovingDown = false;
  ///
  public position = { x: 60, y: 0 };
  public rotation = 0;

  constructor(
    boardDiv: HTMLDivElement,
    renew: Function,
    checkBorderPionks: Function
  ) {
    this.boardDiv = boardDiv;
    this.buildPionek();
    this.moving();
    this.addControls();
    this.renewGame = renew;
    this.checkBorderPionks = checkBorderPionks;
  }
  private getColor(except: number | null) {
    let i = Math.floor(Math.random() * 5);

    while (i == except) {
      i = Math.floor(Math.random() * 5);
    }
    return i;
  }
  private buildPionek() {
    this.pionek = document.createElement("div");
    this.pionek.classList.add("pionek");
    let fristColor: number | null = null;

    for (let index = 0; index < 2; index++) {
      const cell1 = document.createElement("div");

      const colorIndex = this.getColor(fristColor);
      fristColor = colorIndex;
      cell1.style.backgroundColor = this.possibleColors[colorIndex];

      cell1.classList.add("pionek-cell");
      this.pionek.append(cell1);
    }

    this.pionek.style.left = "60px";
    this.boardDiv.append(this.pionek);
  }

  private moving() {
    this.movingInterval = setInterval(() => {
      if (this.manualMovingDown) return;

      const y = 20 + Number(this.pionek.style.top.split("p")[0]);

      if (this.chechForBorderCollisions(undefined, y, true)) {
        clearInterval(this.movingInterval);
        this.renewGame(this);
        return;
      }
      this.position.y = y;
      this.pionek.style.top = `${y}px`;
    }, 400);
  }

  private chechForBorderCollisions(x: any, y: number, autonomous: boolean) {
    if (this.checkBorderPionks(this.position, this.rotation)) {
      console.log("PIONEK!!!!");
      this.stop = true;
      return true;
    }

    if (autonomous) {
      if (y >= 300||((this.rotation==90||this.rotation==270)&&y>=280)) {
        this.stop = true;
        return true;
      }
    } else {
      if (x <= 0 || x >= 160) {
        return true;
      } else if (y >= 300||((this.rotation==90||this.rotation==270)&&y>=280)) {
        this.stop = true;
        return true;
      }
    }
  }
 
  private rotate() {
    const prevRot = this.rotation;
    if (prevRot == 360) this.rotation = 0;
    this.rotation += 90;
    if (this.rotation == 270 || this.rotation == 90) {
      this.position.x += 10;
      this.position.y -= 10;
      this.pionek.style.left = `${this.position.x}px`;
      this.pionek.style.top = `${this.position.y}px`;
    }
    if (this.rotation == 180 || this.rotation == 360) {
      this.position.x -= 10;
      this.position.y += 10;
      this.pionek.style.top = `${this.position.y}px`;
      this.pionek.style.left = `${this.position.x}px`;
    }

    this.pionek.style.transform = `rotate(${this.rotation}deg)`;
  }
  private addControls() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (this.stop) return;
      const key = e.key;

      const x = +this.pionek.style.left.split("p")[0];
      const y = +this.pionek.style.top.split("p")[0];

      switch (key) {
        case "ArrowLeft":
          if (!this.chechForBorderCollisions(x, y, false)) {
            const span = x - 20;
            this.pionek.style.left = `${span}px`;
            this.position.x = span;
          }

          break;
        case "ArrowRight":
          if (!this.chechForBorderCollisions(x + 40, y, false)) {
            const span = x + 20;
            this.pionek.style.left = `${span}px`;
            this.position.x = span;
          }

          break;
        case "ArrowDown":
          if (!this.chechForBorderCollisions(x, y + 20, false)) {
            this.manualMovingDown = true;
            const span = y + 20;
            this.pionek.style.top = `${span}px`;
            this.position.y = span;
          }

          break;
        case "r":
          this.rotate();
      }
    });
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key == "ArrowDown") this.manualMovingDown = false;
    });
  }
}
const game = new Game();
