"use strict";
var Tetris;
(function (Tetris) {
    class UIElement {
        constructor(id) {
            this._element = document.querySelector(id);
        }
        setValue(value) {
            if (value !== undefined) {
                const prev = this._value;
                this._value = value;
                if (this._element) {
                    this._element.innerHTML = value.toString();
                    const event = new CustomEvent('change', {
                        detail: { newValue: this._value, prev: prev },
                    });
                    this._element.dispatchEvent(event);
                }
            }
        }
        get value() {
            return this._value;
        }
        get element() {
            return this._element;
        }
    }
    Tetris.UIElement = UIElement;
})(Tetris || (Tetris = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGV0cmlzL3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FxQ2Y7QUFyQ0QsV0FBVSxNQUFNO0lBTVosTUFBYSxTQUFTO1FBSWxCLFlBQVksRUFBVTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVNLFFBQVEsQ0FBQyxLQUFRO1lBQ3BCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBRXBCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksV0FBVyxDQUFhLFFBQVEsRUFBRTt3QkFDaEQsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtxQkFDaEQsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QzthQUNKO1FBQ0wsQ0FBQztRQUVELElBQVcsS0FBSztZQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO1FBRUQsSUFBVyxPQUFPO1lBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7S0FDSjtJQTlCWSxnQkFBUyxZQThCckIsQ0FBQTtBQUNMLENBQUMsRUFyQ1MsTUFBTSxLQUFOLE1BQU0sUUFxQ2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgVGV0cmlzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVUlFdmVudDxUPiB7XHJcbiAgICAgICAgbmV3VmFsdWU6IFQ7XHJcbiAgICAgICAgcHJldjogVDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVUlFbGVtZW50PFQ+IHtcclxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIF92YWx1ZTogVDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0VmFsdWUodmFsdWU6IFQpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50LmlubmVySFRNTCA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQ8VUlFdmVudDxUPj4oJ2NoYW5nZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IG5ld1ZhbHVlOiB0aGlzLl92YWx1ZSwgcHJldjogcHJldiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogVCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=