export class GameOfLife {
    grid?: Grid;
    colors?: string[];
    inactiveColor?: string;
    // current limit for 60fps
    // res = 4 => 55 fps | macbook pro m1 | firefox
    resolution: number = 4;

    /** Create grid based on canvas size */
    // This is not in the constructor due to how the react component creates the canvas
    public setupCanvas(width: number, height: number) {
        const rows = Math.round(height / this.resolution);
        const cols = Math.round(width / this.resolution);
        this.grid = this.initGrid(rows, cols);
    }

    /** Game loop */
    public update(ctx: CanvasRenderingContext2D) {
        ctx.save();
        const grid = this.grid!;
        const rows = grid.length;
        const cols = grid[0].length;
        const colors = this.colors!;
        const inactiveColor = this.inactiveColor!;
        const resolution = this.resolution;
        // new empty grid to store next generation
        const gridCopy = this.makeGrid(rows, cols);

        let i = 0;
        while (i < rows) {
            let j = 0;
            while (j < cols) {
                // canvas coordinates
                const x = j * resolution;
                const y = i * resolution;
                const neighbors = this.countNeighbors(i, j);
                const cell = grid[i][j];

                if (cell === 0 && neighbors === 3) {
                    // bring to life
                    gridCopy[i][j] = 1;
                    ctx.fillStyle = colors[0];
                    ctx.fillRect(x, y, resolution, resolution);
                } else if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
                    // keep alive
                    gridCopy[i][j] = 1;
                    ctx.fillStyle = colors[neighbors - 2];
                    ctx.fillRect(x, y, resolution, resolution);
                } else {
                    // dead 
                    gridCopy[i][j] = 0;
                    ctx.fillStyle = inactiveColor;
                    ctx.fillRect(x, y, resolution, resolution);
                }
                j++;
            }
            i++;
        }

        this.grid = gridCopy;
        ctx.restore();
    }

    public setColors(activeColors: string[], inactiveColor: string) {
        this.colors = activeColors;
        this.inactiveColor = inactiveColor;
    }

    /** Count the number of neighbors including wrap around neighbors */
    private countNeighbors(row: number, col: number) {
        const grid = this.grid!;
        const rows = grid.length;
        const cols = grid[0].length;

        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const r = (row + i + rows) % rows;
                const c = (col + j + cols) % cols;
                count += grid[r][c];
            }
        }
        count -= grid[row][col];
        return count;
    }

    /** Randomize each cell in grid */
    private initGrid(rows: number, cols: number): Grid {
        const arr = new Array(rows);
        for (let i = 0; i < rows; i++) {
            arr[i] = Array.from({ length: cols }, () => (Math.random() * 2) | 0);
        }
        return arr;
    }

    /** Create empty grid */
    private makeGrid(rows: number, cols: number): Grid {
        const arr = new Array(rows);
        for (let i = 0; i < rows; i++) {
            arr[i] = new Array(cols);
        }
        return arr;
    }
}