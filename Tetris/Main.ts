namespace Tetris {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  export let viewport: ƒ.Viewport;
  let form: Form;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    form = new Form();
    let r: number = Math.random();
    let p: number = 1 / 7;
    let rx: number = Math.floor(Math.random() * 14) - 7;
    let y: number = 10;
    let pos: ƒ.Vector3 = new ƒ.Vector3(rx * form.unit, y * form.unit, 0);
    if (r > p * 6)
      form.createLN(pos);
    else if (r > p * 5)
      form.createLL(pos);
    else if (r > p * 4)
      form.createLR(pos);
    else if (r > p * 3)
      form.createZL(pos);
    else if (r > p * 2)
      form.createZR(pos);
    else if (r > p * 1)
      form.createSQ(pos);
    else if (r > p * 0)
      form.createTT(pos);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(25);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", form, cmpCamera, canvas);

    document.addEventListener("keydown", control);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 1);
  }

  function update(_event: ƒ.Eventƒ): void {
    viewport.draw();

    form.move();
  }

  function control(_event: Event): void {
    let direction: ƒ.Vector3;
    direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]);
    direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.Y(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]));

    if (direction.y == 0) {
      direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.X(), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
      direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.X(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]));
    }

    /*if (!direction.equals(ƒ.Vector3.ZERO()))
      form.direction = direction;*/
  }
}