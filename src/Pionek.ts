export class Pionek {
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
      //   const pos = { x: 60, y: 0 };
      //   cell1.setAttribute("data-position", JSON.stringify(pos));
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
      //   this.updateDatasets({ x: this.position.x, y: this.position.y });
    }, 400);
  }
  private updateDatasets(obj) {
    for (let index = 0; index < this.pionek.children.length; index++) {
      const element = this.pionek.children[index];
      element.setAttribute("data-position", JSON.stringify(obj));
    }
  }
  private chechForBorderCollisions(x: any, y: number, autonomous: boolean) {
    if (this.checkBorderPionks(this.position, this.rotation)) {
      console.log("PIONEK!!!!");
      this.stop = true;
      return true;
    }

    if (autonomous) {
      if (
        y >= 300 ||
        ((this.rotation == 90 || this.rotation == 270) && y >= 280)
      ) {
        this.stop = true;
        return true;
      }
    } else {
      if (x <= 0 || x >= 160) {
        return true;
      } else if (
        y >= 300 ||
        ((this.rotation == 90 || this.rotation == 270) && y >= 280)
      ) {
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
    // this.updateDatasets({ x: this.position.x, y: this.position.y });
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
      //   this.updateDatasets({ x: this.position.x, y: this.position.y });
    });
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key == "ArrowDown") this.manualMovingDown = false;
    });
  }
}
