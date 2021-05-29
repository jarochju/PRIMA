namespace Tetris {
    export interface UIEvent<T> {
        newValue: T;
        prev: T;
    }

    export class UIElement<T> {
        private _element: HTMLElement;
        private _value: T;

        constructor(id: string) {
            this._element = document.querySelector(id);
        }

        public get value(): T {
            return this._value;
        }

        public get element(): HTMLElement {
            return this._element;
        }

        public setValue(value: T): void {
            if (value !== undefined) {
                const prev: T = this._value;
                this._value = value;

                if (this._element) {
                    this._element.innerHTML = value.toString();
                    const event: CustomEvent<UIEvent<T>> = new CustomEvent<UIEvent<T>>("change", {
                        detail: { newValue: this._value, prev: prev }
                    });
                    this._element.dispatchEvent(event);
                }
            }
        }


    }
}
