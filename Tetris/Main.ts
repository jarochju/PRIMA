namespace Tetris {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  export let viewport: ƒ.Viewport;
  let graph: ƒ.Node;
  let activeForm: Form;
  let colliders: Form[] = [];

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");


    graph = new ƒ.Node("Graph");
    activeForm = Form.random();
    let floor: Form = Form.floor(15, new ƒ.Vector3(-6, -11, 0));
    let wallL: Form = Form.wall(23, new ƒ.Vector3(-8, -10, 0));
    let wallR: Form = Form.wall(23, new ƒ.Vector3(8, -10, 0));

    graph.appendChild(floor);
    graph.appendChild(wallL);
    graph.appendChild(wallR);
    graph.appendChild(activeForm);

    colliders.push(floor);
    colliders.push(wallL);
    colliders.push(wallR);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(25);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);

    document.addEventListener("keypress", control);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 10);
  }

  function update(_event: ƒ.Eventƒ): void {
    if (!activeForm.tryMoveY(colliders)) {
      colliders.push(activeForm);
      activeForm = Form.random();
      graph.appendChild(activeForm);
      viewport.setGraph(graph);
    }

    viewport.draw();
  }

  function control(_event: Event): void {
    let direction: ƒ.Vector3;
    let rotation: number;

    direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.X(), ƒ.Vector3.ZERO(), ([ƒ.KEYBOARD_CODE.D]));
    direction.add(ƒ.Keyboard.mapToValue(ƒ.Vector3.X(-1), ƒ.Vector3.ZERO(), [ƒ.KEYBOARD_CODE.A]));

    rotation = ƒ.Keyboard.mapToValue(1, 0, ([ƒ.KEYBOARD_CODE.Q]));
    rotation += (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.E]));

    activeForm.moveX(direction);
    activeForm.rotateZ(rotation);
    viewport.draw();
  }
}