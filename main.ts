class Game {
  private boardCon = <HTMLDivElement>document.getElementById("board");
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
  private renderPionek() {
    const pionek = new Pionek(this.boardCon);
  }
}

class Pionek {
  private boardDiv: HTMLDivElement;
  private pionek: HTMLDivElement;
  private movingInterval: any;
  private manualMovingDown = false;
  constructor(boardDiv: HTMLDivElement) {
    this.boardDiv = boardDiv;
    this.buildPionek();
    this.moving();
    this.addControls();
  }

  private buildPionek() {
    this.pionek = document.createElement("div");
    const cell1 = document.createElement("div");
    const cell2 = document.createElement("div");
    cell1.style.backgroundColor = "red";
    cell2.style.backgroundColor = "blue";
    this.pionek.classList.add("pionek");
    cell1.classList.add("pionek-cell");
    cell2.classList.add("pionek-cell");
    this.pionek.append(cell1);
    this.pionek.append(cell2);
    this.pionek.style.left = "60px";
    this.boardDiv.append(this.pionek);
  }

  private moving() {
    // let i = +this.pionek.style.top.split("p")[0] / 20;
    this.movingInterval = setInterval(() => {
      if (this.manualMovingDown) return;

      const y = 20 + Number(this.pionek.style.top.split("p")[0]);
      const x = +this.pionek.style.left.split("p")[0];

      if (this.chechForBorderCollisions(x, y, true)) {
        clearInterval(this.movingInterval);
        return;
      }

      this.pionek.style.top = `${y}px`;
      //   i++;
    }, 400);
  }

  private chechForBorderCollisions(x: number, y: number, autonomous: boolean) {
    console.log(x, y);
    if (autonomous) {
      if (y >= 300) return true;
    } else {
      if (x <= 0 || x >= 160 || y >= 300) return true;
    }
  }
  private addControls() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      const key = e.key;
      const x = +this.pionek.style.left.split("p")[0];
      const y = +this.pionek.style.top.split("p")[0];

      switch (key) {
        case "ArrowLeft":
          if (!this.chechForBorderCollisions(x, y, false))
            this.pionek.style.left = `${x - 20}px`;
          break;
        case "ArrowRight":
          if (!this.chechForBorderCollisions(x + 40, y, false))
            this.pionek.style.left = `${x + 20}px`;

          break;
        case "ArrowDown":
          if (!this.chechForBorderCollisions(x, y + 20, false)) {
            this.manualMovingDown = true;
            this.pionek.style.top = `${y + 20}px`;
          }

          break;
      }
    });
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key == "ArrowDown") this.manualMovingDown = false;
    });
  }
}
const game = new Game();
