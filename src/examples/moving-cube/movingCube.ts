///<reference types="../../../FUDGE/Core/FudgeCore"/>
///<reference types="../../../FUDGE/Aid/FudgeAid"/>

namespace FudgeBoilerplate {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;

    // Script starten sobald Seite geladen ist
    window.addEventListener('DOMContentLoaded', init);

    // Nodes vordefinieren
    let rootNode: ƒ.Node;
    let cubeNode: ƒ.Node;
    let lightNode: ƒ.Node;
    let viewport: ƒ.Viewport;

    const startTime: number = Date.now();
    const animSpeed = 0.003;
    const animHeight = 0.2;

    function init(): void {
        // Szenenknoten (Node) an die alle Kindknoten der Szene angehängt werden
        rootNode = new ƒ.Node('root');

        /** ------ Würfel erstellen ------  **/

        // Neuer Containerknoten erstellen
        cubeNode = new ƒ.Node('cube');

        // Transformations-Komponente erstellen für Position, Rotation und Skalierung relativ zum Elternelement
        // Positionierung am Nullpunkt des lokalen Koordinatensystems (Transform Matrix)
        const transformCmp = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
        // Komponente zum Würfelknoten hinzufügen
        cubeNode.addComponent(transformCmp);

        // Material-Komponente für den Würfel erstellen (Textur sozusagen)
        // Material Farbe erstellen RGBA: Rot, Grün, Blau, Alpha als Werte von 0-1
        const matColor = new ƒ.Color(0.2, 0.8, 1, 1);
        // Material Komponente mit Material erstellen.
        const materialCmp = new ƒ.ComponentMaterial(
            new ƒ.Material(
                'CubeMaterial', // Name
                ƒ.ShaderFlat, // Shader
                new ƒ.CoatColored(matColor) // Farbe
            )
        );
        cubeNode.addComponent(materialCmp);

        // Mesh-Komponente für den Würfel erstellen
        const meshCmp = new ƒ.ComponentMesh(new ƒ.MeshCube('CubeMesh'));
        cubeNode.addComponent(meshCmp);

        // Würfel and root Knoten hängen
        rootNode.addChild(cubeNode);

        /** ------ Würfel erstellen in Kurzschreibweise mit ƒAid ------  **/
        /*
        cubeNode = new ƒAid.Node( //Ein Node besteht aus:
            'cube',
            ƒ.Matrix4x4.IDENTITY(),
            new ƒ.Material(
                'CubeMaterial',
                ƒ.ShaderFlat,
                new ƒ.CoatColored(matColor)
            ),
            new ƒ.MeshCube('CubeMesh')
        );
        */

        /** ------ Szenenlicht erstellen ------  **/

        // Neuer Containerknoten erstellen
        lightNode = new ƒ.Node('light');

        // Gerichtete Lichtquelle mit Farbe erstellen (hier weiß)
        const light = new ƒ.LightDirectional(new ƒ.Color(1, 1, 1, 1));
        // Licht-Komponente erstellen
        const lightCmp: ƒ.ComponentLight = new ƒ.ComponentLight(light);
        lightNode.addComponent(lightCmp);

        // Transformations-Komponente für die Ausrichtung zum Licht hinzufügen
        lightNode.addComponent(new ƒ.ComponentTransform());
        // Auf Transformations-Komponente zugreifen und um x und y rotieren
        lightNode.mtxLocal.rotateY(60);
        lightNode.mtxLocal.rotateX(140);

        // Licht zum Root-Knoten hinzufügen
        rootNode.addChild(lightNode);

        /** ------ Viewport erstellen, welcher die Szene (Szenenknoten rootNode) rendert/darstellt ------  **/
        viewport = ƒAid.Viewport.create(rootNode);
        viewport.draw();

        /** ------ Würfelanimation  ------  **/

        // Auf das Game-Loop Event hören (Update bei jedem Frame) und jedes mal die Update Funktion ausführen
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start();
    }

    function update(): void {
        // Zeit seit dem Start der Anwendung
        const time: number = Date.now() - startTime;

        // Rotiere Würfel bei jedem Aufruf um 0.4 Grad
        cubeNode.mtxLocal.rotateY(0.4);

        // Bewege Würfel entlang einer Sinuswelle auf und ab
        cubeNode.mtxLocal.translation = new ƒ.Vector3(
            0,
            Math.sin(time * animSpeed) * animHeight,
            0
        );

        // Darstellung neu berechnen
        viewport.draw();
    }
}
