"use strict";
///<reference types="../../../FUDGE/Core/FudgeCore"/>
///<reference types="../../../FUDGE/Aid/FudgeAid"/>
var FudgeBoilerplate;
///<reference types="../../../FUDGE/Core/FudgeCore"/>
///<reference types="../../../FUDGE/Aid/FudgeAid"/>
(function (FudgeBoilerplate) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    // Script starten sobald Seite geladen ist
    window.addEventListener('DOMContentLoaded', init);
    // Nodes vordefinieren
    let rootNode;
    let cubeNode;
    let lightNode;
    let viewport;
    const startTime = Date.now();
    const animSpeed = 0.003;
    const animHeight = 0.2;
    function init() {
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
        const materialCmp = new ƒ.ComponentMaterial(new ƒ.Material('CubeMaterial', // Name
        ƒ.ShaderFlat, // Shader
        new ƒ.CoatColored(matColor) // Farbe
        ));
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
        const lightCmp = new ƒ.ComponentLight(light);
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
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function update() {
        // Zeit seit dem Start der Anwendung
        const time = Date.now() - startTime;
        // Rotiere Würfel bei jedem Aufruf um 0.4 Grad
        cubeNode.mtxLocal.rotateY(0.4);
        // Bewege Würfel entlang einer Sinuswelle auf und ab
        cubeNode.mtxLocal.translation = new ƒ.Vector3(0, Math.sin(time * animSpeed) * animHeight, 0);
        // Darstellung neu berechnen
        viewport.draw();
    }
})(FudgeBoilerplate || (FudgeBoilerplate = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92aW5nQ3ViZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlcy9tb3ZpbmctY3ViZS9tb3ZpbmdDdWJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxREFBcUQ7QUFDckQsbURBQW1EO0FBRW5ELElBQVUsZ0JBQWdCLENBa0h6QjtBQXJIRCxxREFBcUQ7QUFDckQsbURBQW1EO0FBRW5ELFdBQVUsZ0JBQWdCO0lBQ3RCLElBQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUNyQixJQUFPLElBQUksR0FBRyxRQUFRLENBQUM7SUFFdkIsMENBQTBDO0lBQzFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVsRCxzQkFBc0I7SUFDdEIsSUFBSSxRQUFnQixDQUFDO0lBQ3JCLElBQUksUUFBZ0IsQ0FBQztJQUNyQixJQUFJLFNBQWlCLENBQUM7SUFDdEIsSUFBSSxRQUFvQixDQUFDO0lBRXpCLE1BQU0sU0FBUyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDeEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBRXZCLFNBQVMsSUFBSTtRQUNULHdFQUF3RTtRQUN4RSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLHVDQUF1QztRQUV2QyxrQ0FBa0M7UUFDbEMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5Qix1R0FBdUc7UUFDdkcsZ0ZBQWdGO1FBQ2hGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN0RSx5Q0FBeUM7UUFDekMsUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMs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QWdCLFFBa0h6QiIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgdHlwZXM9XCIuLi8uLi8uLi9GVURHRS9Db3JlL0Z1ZGdlQ29yZVwiLz5cclxuLy8vPHJlZmVyZW5jZSB0eXBlcz1cIi4uLy4uLy4uL0ZVREdFL0FpZC9GdWRnZUFpZFwiLz5cclxuXHJcbm5hbWVzcGFjZSBGdWRnZUJvaWxlcnBsYXRlIHtcclxuICAgIGltcG9ydCDGkiA9IEZ1ZGdlQ29yZTtcclxuICAgIGltcG9ydCDGkkFpZCA9IEZ1ZGdlQWlkO1xyXG5cclxuICAgIC8vIFNjcmlwdCBzdGFydGVuIHNvYmFsZCBTZWl0ZSBnZWxhZGVuIGlzdFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0KTtcclxuXHJcbiAgICAvLyBOb2RlcyB2b3JkZWZpbmllcmVuXHJcbiAgICBsZXQgcm9vdE5vZGU6IMaSLk5vZGU7XHJcbiAgICBsZXQgY3ViZU5vZGU6IMaSLk5vZGU7XHJcbiAgICBsZXQgbGlnaHROb2RlOiDGki5Ob2RlO1xyXG4gICAgbGV0IHZpZXdwb3J0OiDGki5WaWV3cG9ydDtcclxuXHJcbiAgICBjb25zdCBzdGFydFRpbWU6IG51bWJlciA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBhbmltU3BlZWQgPSAwLjAwMztcclxuICAgIGNvbnN0IGFuaW1IZWlnaHQgPSAwLjI7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBTemVuZW5rbm90ZW4gKE5vZGUpIGFuIGRpZSBhbGxlIEtpbmRrbm90ZW4gZGVyIFN6ZW5lIGFuZ2Vow6RuZ3Qgd2VyZGVuXHJcbiAgICAgICAgcm9vdE5vZGUgPSBuZXcgxpIuTm9kZSgncm9vdCcpO1xyXG5cclxuICAgICAgICAvKiogLS0tLS0tIFfDvHJmZWwgZXJzdGVsbGVuIC0tLS0tLSAgKiovXHJcblxyXG4gICAgICAgIC8vIE5ldWVyIENvbnRhaW5lcmtub3RlbiBlcnN0ZWxsZW5cclxuICAgICAgICBjdWJlTm9kZSA9IG5ldyDGki5Ob2RlKCdjdWJlJyk7XHJcblxyXG4gICAgICAgIC8vIFRyYW5zZm9ybWF0aW9ucy1Lb21wb25lbnRlIGVyc3RlbGxlbiBmw7xyIFBvc2l0aW9uLCBSb3RhdGlvbiB1bmQgU2thbGllcnVuZyByZWxhdGl2IHp1bSBFbHRlcm5lbGVtZW50XHJcbiAgICAgICAgLy8gUG9zaXRpb25pZXJ1bmcgYW0gTnVsbHB1bmt0IGRlcyBsb2thbGVuIEtvb3JkaW5hdGVuc3lzdGVtcyAoVHJhbnNmb3JtIE1hdHJpeClcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1DbXAgPSBuZXcgxpIuQ29tcG9uZW50VHJhbnNmb3JtKMaSLk1hdHJpeDR4NC5JREVOVElUWSgpKTtcclxuICAgICAgICAvLyBLb21wb25lbnRlIHp1bSBXw7xyZmVsa25vdGVuIGhpbnp1ZsO8Z2VuXHJcbiAgICAgICAgY3ViZU5vZGUuYWRkQ29tcG9uZW50KHRyYW5zZm9ybUNtcCk7XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsLUtvbXBvbmVudGUgZsO8ciBkZW4gV8O8cmZlbCBlcnN0ZWxsZW4gKFRleHR1ciBzb3p1c2FnZW4pXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgRmFyYmUgZXJzdGVsbGVuIFJHQkE6IFJvdCwgR3LDvG4sIEJsYXUsIEFscGhhIGFscyBXZXJ0ZSB2b24gMC0xXHJcbiAgICAgICAgY29uc3QgbWF0Q29sb3IgPSBuZXcgxpIuQ29sb3IoMC4yLCAwLjgsIDEsIDEpO1xyXG4gICAgICAgIC8vIE1hdGVyaWFsIEtvbXBvbmVudGUgbWl0IE1hdGVyaWFsIGVyc3RlbGxlbi5cclxuICAgICAgICBjb25zdCBtYXRlcmlhbENtcCA9IG5ldyDGki5Db21wb25lbnRNYXRlcmlhbChcclxuICAgICAgICAgICAgbmV3IMaSLk1hdGVyaWFsKFxyXG4gICAgICAgICAgICAgICAgJ0N1YmVNYXRlcmlhbCcsIC8vIE5hbWVcclxuICAgICAgICAgICAgICAgIMaSLlNoYWRlckZsYXQsIC8vIFNoYWRlclxyXG4gICAgICAgICAgICAgICAgbmV3IMaSLkNvYXRDb2xvcmVkKG1hdENvbG9yKSAvLyBGYXJiZVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjdWJlTm9kZS5hZGRDb21wb25lbnQobWF0ZXJpYWxDbXApO1xyXG5cclxuICAgICAgICAvLyBNZXNoLUtvbXBvbmVudGUgZsO8ciBkZW4gV8O8cmZlbCBlcnN0ZWxsZW5cclxuICAgICAgICBjb25zdCBtZXNoQ21wID0gbmV3IMaSLkNvbXBvbmVudE1lc2gobmV3IMaSLk1lc2hDdWJlKCdDdWJlTWVzaCcpKTtcclxuICAgICAgICBjdWJlTm9kZS5hZGRDb21wb25lbnQobWVzaENtcCk7XHJcblxyXG4gICAgICAgIC8vIFfDvHJmZWwgYW5kIHJvb3QgS25vdGVuIGjDpG5nZW5cclxuICAgICAgICByb290Tm9kZS5hZGRDaGlsZChjdWJlTm9kZSk7XHJcblxyXG4gICAgICAgIC8qKiAtLS0tLS0gV8O8cmZlbCBlcnN0ZWxsZW4gaW4gS3VyenNjaHJlaWJ3ZWlzZSBtaXQgxpJBaWQgLS0tLS0tICAqKi9cclxuICAgICAgICAvKlxyXG4gICAgICAgIGN1YmVOb2RlID0gbmV3IMaSQWlkLk5vZGUoIC8vRWluIE5vZGUgYmVzdGVodCBhdXM6XHJcbiAgICAgICAgICAgICdjdWJlJyxcclxuICAgICAgICAgICAgxpIuTWF0cml4NHg0LklERU5USVRZKCksXHJcbiAgICAgICAgICAgIG5ldyDGki5NYXRlcmlhbChcclxuICAgICAgICAgICAgICAgICdDdWJlTWF0ZXJpYWwnLFxyXG4gICAgICAgICAgICAgICAgxpIuU2hhZGVyRmxhdCxcclxuICAgICAgICAgICAgICAgIG5ldyDGki5Db2F0Q29sb3JlZChtYXRDb2xvcilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgbmV3IMaSLk1lc2hDdWJlKCdDdWJlTWVzaCcpXHJcbiAgICAgICAgKTtcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKiogLS0tLS0tIFN6ZW5lbmxpY2h0IGVyc3RlbGxlbiAtLS0tLS0gICoqL1xyXG5cclxuICAgICAgICAvLyBOZXVlciBDb250YWluZXJrbm90ZW4gZXJzdGVsbGVuXHJcbiAgICAgICAgbGlnaHROb2RlID0gbmV3IMaSLk5vZGUoJ2xpZ2h0Jyk7XHJcblxyXG4gICAgICAgIC8vIEdlcmljaHRldGUgTGljaHRxdWVsbGUgbWl0IEZhcmJlIGVyc3RlbGxlbiAoaGllciB3ZWnDnylcclxuICAgICAgICBjb25zdCBsaWdodCA9IG5ldyDGki5MaWdodERpcmVjdGlvbmFsKG5ldyDGki5Db2xvcigxLCAxLCAxLCAxKSk7XHJcbiAgICAgICAgLy8gTGljaHQtS29tcG9uZW50ZSBlcnN0ZWxsZW5cclxuICAgICAgICBjb25zdCBsaWdodENtcDogxpIuQ29tcG9uZW50TGlnaHQgPSBuZXcgxpIuQ29tcG9uZW50TGlnaHQobGlnaHQpO1xyXG4gICAgICAgIGxpZ2h0Tm9kZS5hZGRDb21wb25lbnQobGlnaHRDbXApO1xyXG5cclxuICAgICAgICAvLyBUcmFuc2Zvcm1hdGlvbnMtS29tcG9uZW50ZSBmw7xyIGRpZSBBdXNyaWNodHVuZyB6dW0gTGljaHQgaGluenVmw7xnZW5cclxuICAgICAgICBsaWdodE5vZGUuYWRkQ29tcG9uZW50KG5ldyDGki5Db21wb25lbnRUcmFuc2Zvcm0oKSk7XHJcbiAgICAgICAgLy8gQXVmIFRyYW5zZm9ybWF0aW9ucy1Lb21wb25lbnRlIHp1Z3JlaWZlbiB1bmQgdW0geCB1bmQgeSByb3RpZXJlblxyXG4gICAgICAgIGxpZ2h0Tm9kZS5tdHhMb2NhbC5yb3RhdGVZKDYwKTtcclxuICAgICAgICBsaWdodE5vZGUubXR4TG9jYWwucm90YXRlWCgxNDApO1xyXG5cclxuICAgICAgICAvLyBMaWNodCB6dW0gUm9vdC1Lbm90ZW4gaGluenVmw7xnZW5cclxuICAgICAgICByb290Tm9kZS5hZGRDaGlsZChsaWdodE5vZGUpO1xyXG5cclxuICAgICAgICAvKiogLS0tLS0tIFZpZXdwb3J0IGVyc3RlbGxlbiwgd2VsY2hlciBkaWUgU3plbmUgKFN6ZW5lbmtub3RlbiByb290Tm9kZSkgcmVuZGVydC9kYXJzdGVsbHQgLS0tLS0tICAqKi9cclxuICAgICAgICB2aWV3cG9ydCA9IMaSQWlkLlZpZXdwb3J0LmNyZWF0ZShyb290Tm9kZSk7XHJcbiAgICAgICAgdmlld3BvcnQuZHJhdygpO1xyXG5cclxuICAgICAgICAvKiogLS0tLS0tIFfDvHJmZWxhbmltYXRpb24gIC0tLS0tLSAgKiovXHJcblxyXG4gICAgICAgIC8vIEF1ZiBkYXMgR2FtZS1Mb29wIEV2ZW50IGjDtnJlbiAoVXBkYXRlIGJlaSBqZWRlbSBGcmFtZSkgdW5kIGplZGVzIG1hbCBkaWUgVXBkYXRlIEZ1bmt0aW9uIGF1c2bDvGhyZW5cclxuICAgICAgICDGki5Mb29wLmFkZEV2ZW50TGlzdGVuZXIoxpIuRVZFTlQuTE9PUF9GUkFNRSwgdXBkYXRlKTtcclxuICAgICAgICDGki5Mb29wLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIFplaXQgc2VpdCBkZW0gU3RhcnQgZGVyIEFud2VuZHVuZ1xyXG4gICAgICAgIGNvbnN0IHRpbWU6IG51bWJlciA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XHJcblxyXG4gICAgICAgIC8vIFJvdGllcmUgV8O8cmZlbCBiZWkgamVkZW0gQXVmcnVmIHVtIDAuNCBHcmFkXHJcbiAgICAgICAgY3ViZU5vZGUubXR4TG9jYWwucm90YXRlWSgwLjQpO1xyXG5cclxuICAgICAgICAvLyBCZXdlZ2UgV8O8cmZlbCBlbnRsYW5nIGVpbmVyIFNpbnVzd2VsbGUgYXVmIHVuZCBhYlxyXG4gICAgICAgIGN1YmVOb2RlLm10eExvY2FsLnRyYW5zbGF0aW9uID0gbmV3IMaSLlZlY3RvcjMoXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIE1hdGguc2luKHRpbWUgKiBhbmltU3BlZWQpICogYW5pbUhlaWdodCxcclxuICAgICAgICAgICAgMFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIERhcnN0ZWxsdW5nIG5ldSBiZXJlY2huZW5cclxuICAgICAgICB2aWV3cG9ydC5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuIl19