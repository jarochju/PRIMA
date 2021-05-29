namespace Tetris {
    import ƒ = FudgeCore;

    export class Shape extends ƒ.Node {
        public static staticUnit: number = 1.05;
        public unit: number = Shape.staticUnit;

        private color: ƒ.Color = ƒ.Color.CSS("WHITE");
        private container: ƒ.Node;

        constructor(startPos: ƒ.Vector3 = ƒ.Vector3.ZERO()) {
            super("Shape");
            startPos.scale(this.unit);
            this.addComponent(
                new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(startPos))
            );
            this.container = new ƒ.Node("Shape_Container");
            this.container.addComponent(
                new ƒ.ComponentTransform(
                    ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())
                )
            );
            this.appendChild(this.container);
        }

        public static random(): Shape {
            let r: number = Math.random();
            let p: number = 1 / 7;
            let rx: number = Math.floor(Math.random() * 12) - 6;
            let y: number = 10;
            const form: Shape = new Shape(new ƒ.Vector3(rx, y, 0));
            if (r > p * 6) form.createLN();
            else if (r > p * 5) form.createLL();
            else if (r > p * 4) form.createLR();
            else if (r > p * 3) form.createZL();
            else if (r > p * 2) form.createZR();
            else if (r > p * 1) form.createSQ();
            else if (r > p * 0) form.createTT();
            return form;
        }

        public static floor(
            len: number,
            pos: ƒ.Vector3 = ƒ.Vector3.ZERO()
        ): Shape {
            let form: Shape = new Shape(pos);
            form.createLine(len, ƒ.Vector3.ZERO());
            return form;
        }

        public static wall(
            len: number,
            pos: ƒ.Vector3 = ƒ.Vector3.ZERO()
        ): Shape {
            let form: Shape = new Shape(pos);
            while (len-- > 0)
                form.createQuad(
                    new ƒ.Vector3(0, form.unit * len - form.unit, 0)
                );
            return form;
        }

        public get position(): ƒ.Vector3 {
            return this.mtxWorld.translation;
        }

        /** Versuche Form um einen Schritt nach unten zu bewegen */
        public tryMoveY(colliders: Shape[]): boolean {
            // Kalkuliere Translation um eine Einheit nach unten
            const downMtx: ƒ.Matrix4x4 = this.mtxLocal.copy;
            downMtx.translateY(-this.unit);

            // speichere Rotation des Form-Containers
            const cRotation: number = this.container.mtxLocal.rotation.z;

            // Iteriere über jedes Segment einer Form und simuliere eine Translaton nach unten (Weltkoordinatensystem)
            for (const segment of this.container.getChildren()) {
                // Erstelle Matrixkopie des Segments
                const segmentMtx: ƒ.Matrix4x4 = segment.mtxWorld.copy;

                // Prüfe andhand der Container-Rotation in welche Richtung das Segment bewegt werden muss.
                // Führe daraufhin die Translation durch. (Funktioniert da immer in 90 Grad Schritten gedreht wird :D)
                if (cRotation === 90) segmentMtx.translateX(-this.unit);
                else if (cRotation === -90) segmentMtx.translateX(this.unit);
                else if (cRotation === -180 || cRotation === 180)
                    segmentMtx.translateY(this.unit);
                else segmentMtx.translateY(-this.unit);

                // Prüfe ob die transformierten Segmentkopien mit den Collidern kollidieren
                for (const collider of colliders) {
                    for (const other of collider.container.getChildren()) {
                        const otherTrans: ƒ.Vector3 =
                            other.mtxWorld.translation;

                        if (
                            !segmentMtx.translation.equals(ƒ.Vector3.ZERO()) &&
                            segmentMtx.translation.isInsideSphere(
                                otherTrans,
                                this.unit / 2
                            )
                        ) {
                            // tue nichts, Form ist bereits am Boden
                            return false;
                        }
                    }
                }
            }
            // Wird ausgeführt wenn nicht kollidiert. Führe deshalb eine Translation der Form nach unten aus.
            this.cmpTransform.mtxLocal = downMtx;
            return true;
        }

        public moveX(dirX: ƒ.Vector3): void {
            dirX.scale(this.unit);
            this.mtxLocal?.translate(dirX);
        }

        public rotateZ(dir: number): void {
            this.container?.mtxLocal?.rotateZ(dir * 90);
        }

        private createLine(
            len: number,
            pos: ƒ.Vector3 = ƒ.Vector3.ZERO()
        ): void {
            while (len-- > 0)
                this.createQuad(
                    new ƒ.Vector3(
                        this.unit * len - this.unit + pos.x,
                        0 + pos.y,
                        0 + pos.z
                    )
                );
        }

        private createLN(): void {
            this.color = ƒ.Color.CSS("CYAN");
            this.createLine(4, ƒ.Vector3.ZERO());
        }

        private createLL(): void {
            this.color = ƒ.Color.CSS("MAGENTA");
            this.createLine(3);
            this.createQuad(new ƒ.Vector3(-this.unit, this.unit, 0));
        }

        private createLR(): void {
            this.color = ƒ.Color.CSS("YELLOW");
            this.createLine(3);
            this.createQuad(new ƒ.Vector3(this.unit, this.unit, 0));
        }

        private createZL(): void {
            this.color = ƒ.Color.CSS("RED");
            this.createLine(2, new ƒ.Vector3(this.unit, 0, 0));
            this.createLine(2, new ƒ.Vector3(0, 0 + this.unit, 0));
        }

        private createZR(): void {
            this.color = ƒ.Color.CSS("GREEN");
            this.createLine(2);
            this.createLine(2, new ƒ.Vector3(this.unit, 0 + this.unit, 0));
        }

        private createSQ(): void {
            this.color = ƒ.Color.CSS("BLUE");
            this.createLine(2);
            this.createLine(2, new ƒ.Vector3(0, this.unit, 0));
        }

        private createTT(): void {
            this.color = ƒ.Color.CSS("ORANGE");
            this.createLine(3);
            this.createQuad(new ƒ.Vector3(0, 0 + this.unit, 0));
        }

        private createQuad(pos: ƒ.Vector3): void {
            let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
            let material: ƒ.Material = new ƒ.Material(
                "Solid" + this.color.getCSS(),
                ƒ.ShaderUniColor,
                new ƒ.CoatColored(this.color)
            );
            let segment: ƒ.Node = new ƒ.Node("Segment");
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
            segment.addComponent(cmpMesh);
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(
                material
            );
            segment.addComponent(cmpMaterial);
            segment.addComponent(
                new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(pos))
            );
            this.container.appendChild(segment);
        }
    }
}
