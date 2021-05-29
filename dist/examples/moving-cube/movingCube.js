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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92aW5nQ3ViZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlcy9tb3ZpbmctY3ViZS9tb3ZpbmdDdWJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxREFBcUQ7QUFDckQsbURBQW1EO0FBRW5ELElBQVUsZ0JBQWdCLENBa0h6QjtBQXJIRCxxREFBcUQ7QUFDckQsbURBQW1EO0FBRW5ELFdBQVUsZ0JBQWdCO0lBQ3RCLElBQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUNyQixJQUFPLElBQUksR0FBRyxRQUFRLENBQUM7SUFFdkIsMENBQTBDO0lBQzFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVsRCxzQkFBc0I7SUFDdEIsSUFBSSxRQUFnQixDQUFDO0lBQ3JCLElBQUksUUFBZ0IsQ0FBQztJQUNyQixJQUFJLFNBQWlCLENBQUM7SUFDdEIsSUFBSSxRQUFvQixDQUFDO0lBRXpCLE1BQU0sU0FBUyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDeEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBRXZCLFNBQVMsSUFBSTtRQUNULHdFQUF3RTtRQUN4RSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLHVDQUF1QztRQUV2QyxrQ0FBa0M7UUFDbEMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5Qix1R0FBdUc7UUFDdkcsZ0ZBQWdGO1FBQ2hGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN0RSx5Q0FBeUM7UUFDekMsUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMs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QWdCLFFBa0h6QiIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgdHlwZXM9XCIuLi8uLi8uLi9GVURHRS9Db3JlL0Z1ZGdlQ29yZVwiLz5cbi8vLzxyZWZlcmVuY2UgdHlwZXM9XCIuLi8uLi8uLi9GVURHRS9BaWQvRnVkZ2VBaWRcIi8+XG5cbm5hbWVzcGFjZSBGdWRnZUJvaWxlcnBsYXRlIHtcbiAgICBpbXBvcnQgxpIgPSBGdWRnZUNvcmU7XG4gICAgaW1wb3J0IMaSQWlkID0gRnVkZ2VBaWQ7XG5cbiAgICAvLyBTY3JpcHQgc3RhcnRlbiBzb2JhbGQgU2VpdGUgZ2VsYWRlbiBpc3RcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXQpO1xuXG4gICAgLy8gTm9kZXMgdm9yZGVmaW5pZXJlblxuICAgIGxldCByb290Tm9kZTogxpIuTm9kZTtcbiAgICBsZXQgY3ViZU5vZGU6IMaSLk5vZGU7XG4gICAgbGV0IGxpZ2h0Tm9kZTogxpIuTm9kZTtcbiAgICBsZXQgdmlld3BvcnQ6IMaSLlZpZXdwb3J0O1xuXG4gICAgY29uc3Qgc3RhcnRUaW1lOiBudW1iZXIgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGFuaW1TcGVlZCA9IDAuMDAzO1xuICAgIGNvbnN0IGFuaW1IZWlnaHQgPSAwLjI7XG5cbiAgICBmdW5jdGlvbiBpbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBTemVuZW5rbm90ZW4gKE5vZGUpIGFuIGRpZSBhbGxlIEtpbmRrbm90ZW4gZGVyIFN6ZW5lIGFuZ2Vow6RuZ3Qgd2VyZGVuXG4gICAgICAgIHJvb3ROb2RlID0gbmV3IMaSLk5vZGUoJ3Jvb3QnKTtcblxuICAgICAgICAvKiogLS0tLS0tIFfDvHJmZWwgZXJzdGVsbGVuIC0tLS0tLSAgKiovXG5cbiAgICAgICAgLy8gTmV1ZXIgQ29udGFpbmVya25vdGVuIGVyc3RlbGxlblxuICAgICAgICBjdWJlTm9kZSA9IG5ldyDGki5Ob2RlKCdjdWJlJyk7XG5cbiAgICAgICAgLy8gVHJhbnNmb3JtYXRpb25zLUtvbXBvbmVudGUgZXJzdGVsbGVuIGbDvHIgUG9zaXRpb24sIFJvdGF0aW9uIHVuZCBTa2FsaWVydW5nIHJlbGF0aXYgenVtIEVsdGVybmVsZW1lbnRcbiAgICAgICAgLy8gUG9zaXRpb25pZXJ1bmcgYW0gTnVsbHB1bmt0IGRlcyBsb2thbGVuIEtvb3JkaW5hdGVuc3lzdGVtcyAoVHJhbnNmb3JtIE1hdHJpeClcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtQ21wID0gbmV3IMaSLkNvbXBvbmVudFRyYW5zZm9ybSjGki5NYXRyaXg0eDQuSURFTlRJVFkoKSk7XG4gICAgICAgIC8vIEtvbXBvbmVudGUgenVtIFfDvHJmZWxrbm90ZW4gaGluenVmw7xnZW5cbiAgICAgICAgY3ViZU5vZGUuYWRkQ29tcG9uZW50KHRyYW5zZm9ybUNtcCk7XG5cbiAgICAgICAgLy8gTWF0ZXJpYWwtS29tcG9uZW50ZSBmw7xyIGRlbiBXw7xyZmVsIGVyc3RlbGxlbiAoVGV4dHVyIHNvenVzYWdlbilcbiAgICAgICAgLy8gTWF0ZXJpYWwgRmFyYmUgZXJzdGVsbGVuIFJHQkE6IFJvdCwgR3LDvG4sIEJsYXUsIEFscGhhIGFscyBXZXJ0ZSB2b24gMC0xXG4gICAgICAgIGNvbnN0IG1hdENvbG9yID0gbmV3IMaSLkNvbG9yKDAuMiwgMC44LCAxLCAxKTtcbiAgICAgICAgLy8gTWF0ZXJpYWwgS29tcG9uZW50ZSBtaXQgTWF0ZXJpYWwgZXJzdGVsbGVuLlxuICAgICAgICBjb25zdCBtYXRlcmlhbENtcCA9IG5ldyDGki5Db21wb25lbnRNYXRlcmlhbChcbiAgICAgICAgICAgIG5ldyDGki5NYXRlcmlhbChcbiAgICAgICAgICAgICAgICAnQ3ViZU1hdGVyaWFsJywgLy8gTmFtZVxuICAgICAgICAgICAgICAgIMaSLlNoYWRlckZsYXQsIC8vIFNoYWRlclxuICAgICAgICAgICAgICAgIG5ldyDGki5Db2F0Q29sb3JlZChtYXRDb2xvcikgLy8gRmFyYmVcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgY3ViZU5vZGUuYWRkQ29tcG9uZW50KG1hdGVyaWFsQ21wKTtcblxuICAgICAgICAvLyBNZXNoLUtvbXBvbmVudGUgZsO8ciBkZW4gV8O8cmZlbCBlcnN0ZWxsZW5cbiAgICAgICAgY29uc3QgbWVzaENtcCA9IG5ldyDGki5Db21wb25lbnRNZXNoKG5ldyDGki5NZXNoQ3ViZSgnQ3ViZU1lc2gnKSk7XG4gICAgICAgIGN1YmVOb2RlLmFkZENvbXBvbmVudChtZXNoQ21wKTtcblxuICAgICAgICAvLyBXw7xyZmVsIGFuZCByb290IEtub3RlbiBow6RuZ2VuXG4gICAgICAgIHJvb3ROb2RlLmFkZENoaWxkKGN1YmVOb2RlKTtcblxuICAgICAgICAvKiogLS0tLS0tIFfDvHJmZWwgZXJzdGVsbGVuIGluIEt1cnpzY2hyZWlid2Vpc2UgbWl0IMaSQWlkIC0tLS0tLSAgKiovXG4gICAgICAgIC8qXG4gICAgICAgIGN1YmVOb2RlID0gbmV3IMaSQWlkLk5vZGUoIC8vRWluIE5vZGUgYmVzdGVodCBhdXM6XG4gICAgICAgICAgICAnY3ViZScsXG4gICAgICAgICAgICDGki5NYXRyaXg0eDQuSURFTlRJVFkoKSxcbiAgICAgICAgICAgIG5ldyDGki5NYXRlcmlhbChcbiAgICAgICAgICAgICAgICAnQ3ViZU1hdGVyaWFsJyxcbiAgICAgICAgICAgICAgICDGki5TaGFkZXJGbGF0LFxuICAgICAgICAgICAgICAgIG5ldyDGki5Db2F0Q29sb3JlZChtYXRDb2xvcilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBuZXcgxpIuTWVzaEN1YmUoJ0N1YmVNZXNoJylcbiAgICAgICAgKTtcbiAgICAgICAgKi9cblxuICAgICAgICAvKiogLS0tLS0tIFN6ZW5lbmxpY2h0IGVyc3RlbGxlbiAtLS0tLS0gICoqL1xuXG4gICAgICAgIC8vIE5ldWVyIENvbnRhaW5lcmtub3RlbiBlcnN0ZWxsZW5cbiAgICAgICAgbGlnaHROb2RlID0gbmV3IMaSLk5vZGUoJ2xpZ2h0Jyk7XG5cbiAgICAgICAgLy8gR2VyaWNodGV0ZSBMaWNodHF1ZWxsZSBtaXQgRmFyYmUgZXJzdGVsbGVuIChoaWVyIHdlacOfKVxuICAgICAgICBjb25zdCBsaWdodCA9IG5ldyDGki5MaWdodERpcmVjdGlvbmFsKG5ldyDGki5Db2xvcigxLCAxLCAxLCAxKSk7XG4gICAgICAgIC8vIExpY2h0LUtvbXBvbmVudGUgZXJzdGVsbGVuXG4gICAgICAgIGNvbnN0IGxpZ2h0Q21wOiDGki5Db21wb25lbnRMaWdodCA9IG5ldyDGki5Db21wb25lbnRMaWdodChsaWdodCk7XG4gICAgICAgIGxpZ2h0Tm9kZS5hZGRDb21wb25lbnQobGlnaHRDbXApO1xuXG4gICAgICAgIC8vIFRyYW5zZm9ybWF0aW9ucy1Lb21wb25lbnRlIGbDvHIgZGllIEF1c3JpY2h0dW5nIHp1bSBMaWNodCBoaW56dWbDvGdlblxuICAgICAgICBsaWdodE5vZGUuYWRkQ29tcG9uZW50KG5ldyDGki5Db21wb25lbnRUcmFuc2Zvcm0oKSk7XG4gICAgICAgIC8vIEF1ZiBUcmFuc2Zvcm1hdGlvbnMtS29tcG9uZW50ZSB6dWdyZWlmZW4gdW5kIHVtIHggdW5kIHkgcm90aWVyZW5cbiAgICAgICAgbGlnaHROb2RlLm10eExvY2FsLnJvdGF0ZVkoNjApO1xuICAgICAgICBsaWdodE5vZGUubXR4TG9jYWwucm90YXRlWCgxNDApO1xuXG4gICAgICAgIC8vIExpY2h0IHp1bSBSb290LUtub3RlbiBoaW56dWbDvGdlblxuICAgICAgICByb290Tm9kZS5hZGRDaGlsZChsaWdodE5vZGUpO1xuXG4gICAgICAgIC8qKiAtLS0tLS0gVmlld3BvcnQgZXJzdGVsbGVuLCB3ZWxjaGVyIGRpZSBTemVuZSAoU3plbmVua25vdGVuIHJvb3ROb2RlKSByZW5kZXJ0L2RhcnN0ZWxsdCAtLS0tLS0gICoqL1xuICAgICAgICB2aWV3cG9ydCA9IMaSQWlkLlZpZXdwb3J0LmNyZWF0ZShyb290Tm9kZSk7XG4gICAgICAgIHZpZXdwb3J0LmRyYXcoKTtcblxuICAgICAgICAvKiogLS0tLS0tIFfDvHJmZWxhbmltYXRpb24gIC0tLS0tLSAgKiovXG5cbiAgICAgICAgLy8gQXVmIGRhcyBHYW1lLUxvb3AgRXZlbnQgaMO2cmVuIChVcGRhdGUgYmVpIGplZGVtIEZyYW1lKSB1bmQgamVkZXMgbWFsIGRpZSBVcGRhdGUgRnVua3Rpb24gYXVzZsO8aHJlblxuICAgICAgICDGki5Mb29wLmFkZEV2ZW50TGlzdGVuZXIoxpIuRVZFTlQuTE9PUF9GUkFNRSwgdXBkYXRlKTtcbiAgICAgICAgxpIuTG9vcC5zdGFydCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gWmVpdCBzZWl0IGRlbSBTdGFydCBkZXIgQW53ZW5kdW5nXG4gICAgICAgIGNvbnN0IHRpbWU6IG51bWJlciA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG5cbiAgICAgICAgLy8gUm90aWVyZSBXw7xyZmVsIGJlaSBqZWRlbSBBdWZydWYgdW0gMC40IEdyYWRcbiAgICAgICAgY3ViZU5vZGUubXR4TG9jYWwucm90YXRlWSgwLjQpO1xuXG4gICAgICAgIC8vIEJld2VnZSBXw7xyZmVsIGVudGxhbmcgZWluZXIgU2ludXN3ZWxsZSBhdWYgdW5kIGFiXG4gICAgICAgIGN1YmVOb2RlLm10eExvY2FsLnRyYW5zbGF0aW9uID0gbmV3IMaSLlZlY3RvcjMoXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgTWF0aC5zaW4odGltZSAqIGFuaW1TcGVlZCkgKiBhbmltSGVpZ2h0LFxuICAgICAgICAgICAgMFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIERhcnN0ZWxsdW5nIG5ldSBiZXJlY2huZW5cbiAgICAgICAgdmlld3BvcnQuZHJhdygpO1xuICAgIH1cbn1cbiJdfQ==