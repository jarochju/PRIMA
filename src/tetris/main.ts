///<reference types="../../FUDGE/Core/FudgeCore"/>
///<reference types="../../FUDGE/UserInterface/FudgeUserInterface"/>

namespace Tetris {
    import ƒ = FudgeCore;
    // import ƒUI = FudgeUserInterface;

    interface ActiveShape {
        form: Shape;
        iteration: number;
    }

    interface Level {
        floor: Shape;
        leftWall: Shape;
        rightWall: Shape;
        round: number;
    }

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;
    let graph: ƒ.Node;
    let activeShape: ActiveShape;
    let colliders: Shape[] = [];
    let lastUpdate: number = 0;

    let audioCmp: ƒ.ComponentAudio;
    let bgMusic: ƒ.Audio;
    let speed: number;

    let counterUI: UIElement<number>;

    let level: Level;
    async function hndLoad(_event: Event): Promise<void> {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        counterUI = new UIElement<number>("#counter");

        const storage: Storage = new Storage("./data.json");
        await storage.loadData();
        const { gameInterval } = storage.getData();
        speed = gameInterval;

        // setze Werte der Benutzeroberfläche
        counterUI.setValue(0);
        /*
        counterUI.element.addEventListener("change", ((e: CustomEvent) => {
            console.log(e.detail);
        }) as EventListener);
        */

        // erstelle Level
        createNewLevel();

        // erstelle Audio
        bgMusic = new ƒ.Audio("sounds/tetrisMusic.mp3");
        audioCmp = new ƒ.ComponentAudio(bgMusic, true, false);
        audioCmp.connect(true);
        audioCmp.volume = 0.8;

        // erstelle Kamera
        const cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(25);
        cmpCamera.mtxPivot.rotateY(180);

        // erstelle Viewport und initialisiere Szene
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", graph, cmpCamera, canvas);

        // STARTE SPIEL
        // erstelle erste aktive Form
        setActiveShape();

        // setze input event listener
        document.addEventListener("keypress", control);

        // starte game loop
        console.log("START GAME");
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL);
    }

    function createNewLevel(): void {
        ƒ.Loop.stop();

        // erstelle Szenengraph (Wurzelknoten) wenn nötig
        if (!graph) graph = new ƒ.Node("Graph");

        // Lösche alle Kindknoten des Graphs
        graph.removeAllChildren();

        // Wenn kein Level gesetzt wurde erstelle Wände und Boden
        if (!level) {
            level = {
                floor: Shape.floor(15, new ƒ.Vector3(-6, -11, 0)),
                leftWall: Shape.wall(23, new ƒ.Vector3(-8, -10, 0)),
                rightWall: Shape.wall(23, new ƒ.Vector3(8, -10, 0)),
                round: 0
            };
        } else {
            level.round += 1;
            counterUI.setValue(level.round);
        }

        graph.appendChild(level.floor);
        graph.appendChild(level.leftWall);
        graph.appendChild(level.rightWall);

        // leere Collider und füge Level-Collider hinzu
        colliders = [];
        colliders.push(level.floor);
        colliders.push(level.leftWall);
        colliders.push(level.rightWall);
    }

    function setActiveShape(shape?: Shape): void {
        // erstelle Szenengraph (Wurzelknoten) wenn nötig
        if (!graph) graph = new ƒ.Node("Graph");

        // setze neue aktive Form
        activeShape = {
            form: shape || Shape.random(),
            iteration: 0
        };

        // füge Form zum Szenengraph hinzu
        graph.appendChild(activeShape.form);
    }

    function update(_event: ƒ.Eventƒ): void {
        // ermittle zeitlich Differenz zum letzten Update
        const delta: number = Date.now() - lastUpdate;

        // teste of genug Zeit vergangen ist um das nächste Update zu starten
        // 600 = 600ms
        if (delta > speed) {
            lastUpdate = Date.now();

            // Versuche Form nach unten zu bewegen
            if (!activeShape.form.tryMoveY(colliders)) {
                // Wenn Form mit einem Collider kollidiert
                // Prüfe ob dies bereits beim ersten Durchlauf passierte. Wenn ja ist das Spiel zu Ende,
                // das Level ist bis oben hin gefüllt
                if (activeShape.iteration <= 0) {
                    console.log("GAME OVER");

                    // Erstelle neues leeres Level
                    createNewLevel();

                    // setze neue Form
                    setActiveShape();

                    // starte spiel neu
                    console.log("RESTART GAME");
                    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
                    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL);

                    return;
                }

                // wenn nirgends angestoßen füge Form zu den anderen Collidern hinzu
                colliders.push(activeShape.form);

                // erstelle neue Form
                setActiveShape();
                viewport.setBranch(graph);
            } else {
                activeShape.iteration += 1;
            }
        }

        viewport.draw();
    }

    function control(_event: Event): void {
        let direction: ƒ.Vector3;
        let rotation: number;

        // Temporärer Einstieg der Musik. Browser benötigt Nutzerinteraktion bevor er Musik starten kann
        if (!audioCmp.isPlaying) audioCmp.play(true);

        direction = ƒ.Keyboard.mapToValue(ƒ.Vector3.X(), ƒ.Vector3.ZERO(), [
            ƒ.KEYBOARD_CODE.D
        ]);
        direction.add(
            ƒ.Keyboard.mapToValue(ƒ.Vector3.X(-1), ƒ.Vector3.ZERO(), [
                ƒ.KEYBOARD_CODE.A
            ])
        );

        rotation = ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.Q]);
        rotation += ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.E]);

        activeShape.form.moveX(direction);
        activeShape.form.rotateZ(rotation);
        viewport.draw();
    }
}
