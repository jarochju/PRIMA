namespace Tetris {
    export interface Data {
        gameInterval: number;
        musicVolume: number;
        sfxVolume: number;
    }

    export class Storage {
        private data: Data;
        private path: string;

        constructor(path: string) {
            this.path = path;

            // setze Standardwerte
            this.data = {
                gameInterval: 600,
                musicVolume: 0.6,
                sfxVolume: 0.4,
            };
        }

        public async loadData(): Promise<void> {
            const response = await fetch(this.path);
            const result = await response.json();
            this.data = result as Data;
        }

        public getData(): Data {
            return this.data;
        }

        public getPath(): string {
            return this.path;
        }
    }
}
