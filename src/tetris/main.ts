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

    enum GameState {
        RUNNING,
        PAUSED,
        STOPPED
    }

    type GameDifficulty = "easy" | "medium" | "hard";

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;
    let graph: ƒ.Node;
    let activeShape: ActiveShape;
    let colliders: Shape[] = [];
    let lastUpdate: number = 0;

    let audioCmp: ƒ.ComponentAudio;
    let bgMusic: ƒ.Audio;
    let isMuted: boolean = false;

    let counterUI: UIElement<number>;
    let elementCounterUI: UIElement<number>;
    let rowsCounterUI: UIElement<number>;

    let gameOverModal: HTMLDivElement;

    let level: Level;
    let gameState: GameState = GameState.STOPPED;
    let gameData: Data;
    let gameDifficulty: GameDifficulty = "medium";

    let isSpeedModeOn: boolean = false;

    async function hndLoad(_event: Event): Promise<void> {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        /** Control DOM Elements */
        const startBtn: HTMLButtonElement =
            document.querySelector("#start-btn");

        const newGameBtn: HTMLButtonElement =
            document.querySelector("#new-game-btn");

        const muteBtn: HTMLButtonElement = document.querySelector("#mute-btn");
        gameOverModal = document.querySelector("#game-over-modal");

        const difficultySelect: HTMLSelectElement =
            document.querySelector("#difficulty-select");

        counterUI = new UIElement<number>("#counter");
        elementCounterUI = new UIElement<number>("#element-counter");
        rowsCounterUI = new UIElement<number>("#rows-counter");

        if (newGameBtn) newGameBtn.addEventListener("click", handleStartClick);
        if (startBtn) startBtn.addEventListener("click", handlePauseClick);
        if (muteBtn) muteBtn.addEventListener("click", handleMuteClick);
        if (difficultySelect) {
            difficultySelect.value = "medium";
            difficultySelect.addEventListener("change", handleDifficultyChange);
        }

        const storage: Storage = new Storage("./data.json");
        await storage.loadData();
        gameData = storage.getData();

        // setze Werte der Benutzeroberfläche
        counterUI.setValue(0);
        elementCounterUI.setValue(0);
        rowsCounterUI.setValue(0);
        /*
        counterUI.element.addEventListener('change', ((e: CustomEvent) => {
            console.log(e.detail);
        }) as EventListener);
        */

        // erstelle Audio
        bgMusic = new ƒ.Audio("sounds/tetrisMusic.mp3");
        audioCmp = new ƒ.ComponentAudio(bgMusic, true, false);
        audioCmp.connect(true);
        audioCmp.volume = 0.8;

        // Erstelle neues leeres Level
        createNewLevel();

        // erstelle Kamera
        const cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(25);
        cmpCamera.mtxPivot.rotateY(180);

        // erstelle Viewport und initialisiere Szene
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        viewport.draw();
    }

    function handleStartClick(): void {
        startGame();
    }

    function handlePauseClick(ev: MouseEvent): void {
        const pauseBtn: HTMLButtonElement = ev.target as HTMLButtonElement;

        switch (gameState) {
            case GameState.RUNNING: {
                pauseGame();
                pauseBtn.innerText = "Resume";
                break;
            }

            case GameState.PAUSED: {
                resumeGame();
                pauseBtn.innerText = "Pause";
                break;
            }
        }
    }

    function handleMuteClick(ev: MouseEvent): void {
        const muteBtn: HTMLButtonElement = ev.target as HTMLButtonElement;

        if (isMuted) {
            isMuted = false;
            audioCmp.volume = 1;
            muteBtn.classList.remove("controls__button--start");
            muteBtn.innerText = "Turn Off";
        } else {
            isMuted = true;
            audioCmp.volume = 0;
            muteBtn.classList.add("controls__button--start");
            muteBtn.innerText = "Turn On";
        }
    }

    function handleDifficultyChange(ev: Event): void {
        const value: GameDifficulty = (ev.target as HTMLSelectElement).value as GameDifficulty;
        gameDifficulty = value;
    }

    function showGameOverModal(show: boolean): void {
        if (gameOverModal) {
            if (show) {
                if (!gameOverModal.classList.contains("modal--visible"))
                    gameOverModal.classList.add("modal--visible");
            } else {
                if (gameOverModal.classList.contains("modal--visible"))
                    gameOverModal.classList.remove("modal--visible");
            }
        }
    }

    function startGame(): void {
        // STARTE SPIEL
        if (!audioCmp.isPlaying) audioCmp.play(true);
        elementCounterUI.setValue(0);
        rowsCounterUI.setValue(0);
        showGameOverModal(false);

        // Erstelle neues leeres Level
        createNewLevel();

        // erstelle erste aktive Form
        setActiveShape();

        // setze input event listener
        document.addEventListener("keypress", control);

        // starte game loop
        console.log("START GAME");
        gameState = GameState.RUNNING;
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL);
    }

    function pauseGame(): void {
        if (gameState === GameState.RUNNING) {
            if (audioCmp.isPlaying) audioCmp.play(false);
            ƒ.Loop.stop();
            document.removeEventListener("keypress", control);
            gameState = GameState.PAUSED;
        }
    }

    function resumeGame(): void {
        if (gameState === GameState.PAUSED) {
            document.addEventListener("keypress", control);

            if (!audioCmp.isPlaying) audioCmp.play(true);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL);
            gameState = GameState.RUNNING;
        }
    }

    function stopGame(): void {
        console.log("GAME OVER");
        if (audioCmp.isPlaying) audioCmp.play(false);
        ƒ.Loop.stop();
        document.removeEventListener("keypress", control);
        gameState = GameState.STOPPED;
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
        elementCounterUI.setValue(elementCounterUI.value + 1);

        // füge Form zum Szenengraph hinzu
        graph.appendChild(activeShape.form);
    }

    function checkLastRow(lastRowY: number, maxPerRow: number): void {
        const bottomSegments: Array<{ node: ƒ.Node; shape: Shape }> =
            new Array<{ node: ƒ.Node; shape: Shape }>();

        // Suche alle Formen die keine Levelbegrenzung darstellen
        for (const collider of colliders) {
            if (!collider.isBorder) {
                // wenn ein Segment in der letzten Reihe ist, füge es in ein Array hinzu
                for (const segment of collider.containerNode.getChildren()) {
                    if (segment.mtxWorld.translation.y <= lastRowY) {
                        bottomSegments.push({
                            node: segment,
                            shape: collider
                        });
                    }
                }
            }
        }

        // prüfe of alle untersten Felder mit Segmenten belegt sind
        if (bottomSegments.length >= maxPerRow) {
            rowsCounterUI.setValue(rowsCounterUI.value + 1);

            // lösche diese Segmente
            for (const segment of bottomSegments) {
                const parent: ƒ.Node = segment.node.getParent();
                parent.removeChild(segment.node);

                // prüfe of die Form weitere Segmente enthält. Wenn nicht lösche sie
                if (parent.getChildren().length === 0) {
                    const index: number = colliders.findIndex(
                        (c) => c === segment.shape
                    );
                    colliders.splice(index, 1);
                    graph.removeChild(segment.shape);
                }
            }

            // Bewege alle übrig geblieben Formen um eine Einheit nach unten
            for (const collider of colliders) {
                if (!collider.isBorder) collider.moveDown();
            }
        }
    }

    function update(_event: ƒ.Eventƒ): void {
        // ermittle zeitlich Differenz zum letzten Update
        const delta: number = Date.now() - lastUpdate;
        const gameInterval: number = !isSpeedModeOn
            ? gameData.difficulties[gameDifficulty].gameInterval
            : 10;

        // teste of genug Zeit vergangen ist um das nächste Update zu starten
        // 600 = 600ms
        if (delta > gameInterval) {
            lastUpdate = Date.now();

            // Versuche Form nach unten zu bewegen
            if (!activeShape.form.tryMove(colliders, "down")) {
                // Wenn Form mit einem Collider kollidiert
                // Prüfe ob dies bereits beim ersten Durchlauf passierte. Wenn ja ist das Spiel zu Ende,
                // das Level ist bis oben hin gefüllt
                if (activeShape.iteration <= 0) {
                    // starte spiel neu
                    // console.log('RESTART GAME');
                    //startGame();
                    stopGame();
                    showGameOverModal(true);
                    return;
                }

                // wenn nirgends angestoßen füge Form zu den anderen Collidern hinzu
                colliders.push(activeShape.form);

                isSpeedModeOn = false;
                // erstelle neue Form
                setActiveShape();
                viewport.setBranch(graph);
            } else {
                activeShape.iteration += 1;
            }

            // prüfe ob letzte Reihe voll ist
            checkLastRow(-10, 15);
        }

        viewport.draw();
    }

    function control(_event: Event): void {
        let direction: ƒ.Vector3;
        let rotation: number;

        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
            if (!isSpeedModeOn) {
                isSpeedModeOn = true;
                console.log("S");
            }
            return;
        }

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

        activeShape.form.rotateZ(rotation);

        if (direction.x === 1) {
            if (!activeShape.form.tryMove(colliders, "right")) {
                activeShape.form.rotateZ(rotation * -1);
            }
        } else {
            if (!activeShape.form.tryMove(colliders, "left")) {
                activeShape.form.rotateZ(rotation * -1);
            }
        }
        viewport.draw();
    }
}
