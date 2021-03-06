"use strict";
var Tetris;
(function (Tetris) {
    class Storage {
        constructor(path) {
            this.path = path;
            // setze Standardwerte
            this.data = {
                difficulties: {
                    easy: {
                        gameInterval: 600,
                    },
                    medium: {
                        gameInterval: 600,
                    },
                    hard: {
                        gameInterval: 600,
                    },
                },
                musicVolume: 0.6,
                sfxVolume: 0.4,
            };
        }
        async loadData() {
            const response = await fetch(this.path);
            const result = await response.json();
            this.data = result;
        }
        getData() {
            return this.data;
        }
        getPath() {
            return this.path;
        }
    }
    Tetris.Storage = Storage;
})(Tetris || (Tetris = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXRyaXMvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBd0RmO0FBeERELFdBQVUsTUFBTTtJQWlCWixNQUFhLE9BQU87UUFJaEIsWUFBWSxJQUFZO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWpCLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHO2dCQUNSLFlBQVksRUFBRTtvQkFDVixJQUFJLEVBQUU7d0JBQ0YsWUFBWSxFQUFFLEdBQUc7cUJBQ3BCO29CQUNELE1BQU0sRUFBRTt3QkFDSixZQUFZLEVBQUUsR0FBRztxQkFDcEI7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLFlBQVksRUFBRSxHQUFHO3FCQUNwQjtpQkFDSjtnQkFDRCxXQUFXLEVBQUUsR0FBRztnQkFDaEIsU0FBUyxFQUFFLEdBQUc7YUFDakIsQ0FBQztRQUNOLENBQUM7UUFFTSxLQUFLLENBQUMsUUFBUTtZQUNqQixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFjLENBQUM7UUFDL0IsQ0FBQztRQUVNLE9BQU87WUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUVNLE9BQU87WUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztLQUNKO0lBdENZLGNBQU8sVUFzQ25CLENBQUE7QUFDTCxDQUFDLEVBeERTLE1BQU0sS0FBTixNQUFNLFFBd0RmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIFRldHJpcyB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIERhdGEge1xyXG4gICAgICAgIGRpZmZpY3VsdGllczoge1xyXG4gICAgICAgICAgICBlYXN5OiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lSW50ZXJ2YWw6IG51bWJlcjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbWVkaXVtOiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lSW50ZXJ2YWw6IG51bWJlcjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaGFyZDoge1xyXG4gICAgICAgICAgICAgICAgZ2FtZUludGVydmFsOiBudW1iZXI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBtdXNpY1ZvbHVtZTogbnVtYmVyO1xyXG4gICAgICAgIHNmeFZvbHVtZTogbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdG9yYWdlIHtcclxuICAgICAgICBwcml2YXRlIGRhdGE6IERhdGE7XHJcbiAgICAgICAgcHJpdmF0ZSBwYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0emUgU3RhbmRhcmR3ZXJ0ZVxyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBkaWZmaWN1bHRpZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBlYXN5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVJbnRlcnZhbDogNjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWVkaXVtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVJbnRlcnZhbDogNjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGFyZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lSW50ZXJ2YWw6IDYwMCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG11c2ljVm9sdW1lOiAwLjYsXHJcbiAgICAgICAgICAgICAgICBzZnhWb2x1bWU6IDAuNCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBsb2FkRGF0YSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3VsdCBhcyBEYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGEoKTogRGF0YSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0UGF0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=