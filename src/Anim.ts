import { frame } from "../types/interfaces";

export class Anim {
  tickNumber = 0; // aktualny tick (u mnie 60/s)
  actFrame = 0; // aktualnie renderowana klatka
  frames: frame[];
  times: number[];
  repeat: boolean;
  constructor(private img, private ob, private destId) {
    // spritesheet

    // id elementu w DOM'ie do wyświetlania klatek (u mnie przez css background-image)

    ///// dane z json'a //////
    this.frames = ob.frames; // tablica z klatkami
    this.times = ob.times; // tablica z czasami wyświetleń klatki [u mnie czas w tick'ach]
    this.repeat = ob.repeat; // czy animacja ma się powtarzać
  }
  /**
   *
   * @param i Frame index
   */
  renderFrame(i) {
    let canvas = document.createElement("canvas");
    canvas.width = 96;
    canvas.height = 72;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(
      this.img,
      this.frames[i].x0,
      this.frames[i].y0,
      this.frames[i].w,
      this.frames[i].h,
      0,
      0,
      this.frames[i].w,
      this.frames[i].h
    );
    let url = canvas.toDataURL();
    let dest = document.getElementById(this.destId);
    dest.style.backgroundImage = "url('" + url + "')";
  }

  goAnim() {
    this.renderFrame(this.actFrame);
    this.tickNumber++;
    if (this.tickNumber == this.times[this.actFrame]) {
      // rotacja klatek
      this.tickNumber = 0;
      this.actFrame++;
    }
    if (this.repeat && this.actFrame == this.frames.length) this.actFrame = 0; //zapętlenie
  }
}
