namespace Tetris {
    import ƒ = FudgeCore;

    export class Form extends ƒ.Node {
        public unit: number = 1.05;

        private dirY: ƒ.Vector3 = ƒ.Vector3.Y(-this.unit);
        private color: ƒ.Color = ƒ.Color.CSS("WHITE");

        constructor() {
            super("Form");
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO())));
        }

        public moveY(): void {
            let transform: ƒ.ComponentTransform = this.getComponent(ƒ.ComponentTransform);
            let matrix: ƒ.Matrix4x4 = transform.local.copy;
            matrix.translate(this.dirY);
            this.removeComponent(transform);
            this.addComponent(new ƒ.ComponentTransform(matrix));
        }

        public moveX(dirX: ƒ.Vector3): void {
            dirX.scale(this.unit);
            let transform: ƒ.ComponentTransform = this.getComponent(ƒ.ComponentTransform);
            let matrix: ƒ.Matrix4x4 = transform.local.copy;
            matrix.translate(dirX);
            this.removeComponent(transform);
            this.addComponent(new ƒ.ComponentTransform(matrix));
        }

        public createLN(pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): void {
            this.color = ƒ.Color.CSS("CYAN");
            this.createLine(4, pos);
        }

        public createLL(pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): void {
            this.color = ƒ.Color.CSS("MAGENTA");
            this.createLine(3, pos);
            this.createQuad(new ƒ.Vector3(-this.unit + pos.x, this.unit + pos.y, 0 + pos.z));
        }

        public createLR(pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): void {
            this.color = ƒ.Color.CSS("YELLOW");
            this.createLine(3, pos);
            this.createQuad(new ƒ.Vector3(this.unit + pos.x, this.unit + pos.y, 0 + pos.z));
        }

        public createZL(pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): void {
            this.color = ƒ.Color.CSS("RED");
            this.createLine(2, new ƒ.Vector3(this.unit + pos.x, 0 + pos.y, 0 + pos.z));
            this.createLine(2, new ƒ.Vector3(0 + pos.x, 0 + this.unit + pos.y, 0 + pos.z));
        }

        public createZR(pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): void {
            this.color = ƒ.Color.CSS("GREEN");
            this.createLine(2, new ƒ.Vector3(0 + pos.x, 0 + pos.y, 0 + pos.z));
            this.createLine(2, new ƒ.Vector3(this.unit + pos.x, 0 + this.unit + pos.y, 0 + pos.z));
        }

        public createSQ(pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): void {
            this.color = ƒ.Color.CSS("BLUE");
            this.createLine(2, new ƒ.Vector3(0 + pos.x, 0 + pos.y, 0 + pos.z));
            this.createLine(2, new ƒ.Vector3(0 + pos.x, 0 + this.unit + pos.y, 0 + pos.z));
        }

        public createTT(pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): void {
            this.color = ƒ.Color.CSS("ORANGE");
            this.createLine(3, pos);
            this.createQuad(new ƒ.Vector3(0 + pos.x, 0 + this.unit + pos.y, 0 + pos.z));
        }

        private createLine(len: number, pos: ƒ.Vector3 = ƒ.Vector3.ZERO()): void {
            while (len-- > 0)
                this.createQuad(new ƒ.Vector3(this.unit * len - this.unit + pos.x, 0 + pos.y, 0 + pos.z));
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

            this.appendChild(segment);
        }

    }

}