namespace Tetris {
    import ƒ = FudgeCore;

    export class Form extends ƒ.Node {
        public static staticUnit: number = 1.05;
        public unit: number = Form.staticUnit;

        private dirY: ƒ.Vector3 = ƒ.Vector3.Y(-this.unit);
        private color: ƒ.Color = ƒ.Color.CSS("WHITE");
        private container: ƒ.Node;

        constructor(startPos: ƒ.Vector3 = ƒ.Vector3.ZERO()) {
            super("Form");
            startPos.scale(this.unit);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(startPos)));
            this.container = new ƒ.Node("Form_Container");
            this.container.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())));
            this.appendChild(this.container);
        }

        public static random(): Form {
            let r: number = Math.random();
            let p: number = 1 / 7;
            let rx: number = Math.floor(Math.random() * 12) - 6;
            let y: number = 10;
            let form: Form = new Form(new ƒ.Vector3(rx, y, 0));
            if (r > p * 6)
                form.createLN();
            else if (r > p * 5)
                form.createLL();
            else if (r > p * 4)
                form.createLR();
            else if (r > p * 3)
                form.createZL();
            else if (r > p * 2)
                form.createZR();
            else if (r > p * 1)
                form.createSQ();
            else if (r > p * 0)
                form.createTT();
            return form;
        }

        public static floor(len: number, pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): Form {
            let form: Form = new Form(pos);
            form.createLine(len, ƒ.Vector3.ZERO());
            return form;
        }

        public static wall(len: number, pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): Form {
            let form: Form = new Form(pos);
            while (len-- > 0)
                form.createQuad(new ƒ.Vector3(0, form.unit * len - form.unit, 0)); 0
            return form;
        }

        public get position(): ƒ.Vector3 {
            return this.mtxWorld.translation;
        }

        public tryMoveY(colliders: Form[]): boolean {
            let transform: ƒ.ComponentTransform = this.getComponent(ƒ.ComponentTransform);
            let matrix: ƒ.Matrix4x4 = transform.local.copy;

            let negDir: ƒ.Vector3 = this.dirY.copy;
            negDir.scale(-1);
            let negTrix: ƒ.Matrix4x4 = transform.local.copy;

            matrix.translate(this.dirY);
            negTrix.translate(negDir);

            let newTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(matrix);
            let negTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(negTrix);

            this.removeComponent(transform);
            this.addComponent(newTransform);

            for (let child of this.container.getChildren()) {
                for (let collider of colliders) {
                    for (let other of collider.container.getChildren()) {
                        let cp: ƒ.Vector3 = child.mtxWorld.translation;
                        let op: ƒ.Vector3 = other.mtxWorld.translation;

                        if (!cp.equals(ƒ.Vector3.ZERO()) && cp.isInsideSphere(op, this.unit / 2)) {
                            this.removeComponent(newTransform);
                            this.addComponent(negTransform);
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        public moveX(dirX: ƒ.Vector3): void {
            dirX.scale(this.unit);
            let transform: ƒ.ComponentTransform = this.getComponent(ƒ.ComponentTransform);
            let matrix: ƒ.Matrix4x4 = transform.local.copy;
            matrix.translate(dirX);
            this.removeComponent(transform);
            this.addComponent(new ƒ.ComponentTransform(matrix));
        }

        public rotateZ(dir: number): void {
            let transform: ƒ.ComponentTransform = this.container.getComponent(ƒ.ComponentTransform);
            let matrix: ƒ.Matrix4x4 = transform.local.copy;
            matrix.rotateZ(dir * 90);
            this.container.removeComponent(transform);
            this.container.addComponent(new ƒ.ComponentTransform(matrix));
        }

        private createLine(len: number, pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): void {
            while (len-- > 0)
                this.createQuad(new ƒ.Vector3(this.unit * len - this.unit + pos.x, 0 + pos.y, 0 + pos.z));
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
            let material: ƒ.Material = new ƒ.Material("Solid" + this.color.getCSS(), ƒ.ShaderUniColor, new ƒ.CoatColored(this.color));
            let segment: ƒ.Node = new ƒ.Node("Segment");
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
            segment.addComponent(cmpMesh);
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
            segment.addComponent(cmpMaterial);
            segment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(pos)));
            this.container.appendChild(segment);
        }

    }

}