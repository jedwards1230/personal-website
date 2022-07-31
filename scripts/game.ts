export class GameOfLife {
    grid?: Grid;
    colors: string[];
    inactiveColor: string;
    resolution: number = 3;

    public constructor(colors: string[], inactiveColor: string) {
        this.colors = colors;
        this.inactiveColor = inactiveColor;
    }

    public setupCanvas(width: number, height: number) {
        const rows = Math.round(height / this.resolution);
        const cols = Math.round(width / this.resolution);
        this.grid = this.makeGrid(rows, cols);
        this.randomize(this.grid!);
    }

    public update(ctx: CanvasRenderingContext2D) {
        ctx.save();
        const grid = this.grid!;
        const rows = grid.length;
        const cols = grid[0].length;
        const resolution = this.resolution;
        const gridCopy = this.makeGrid(rows, cols);

        let i = 0;
        while (i < rows) {
            let j = 0;
            while (j < cols) {
                const x = j * resolution;
                const y = i * resolution;
                const neighbors = this.countNeighbors(i, j);

                if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                    // kill 
                    gridCopy[i][j] = 0;
                    ctx.fillStyle = this.inactiveColor;
                    ctx.fillRect(x, y, resolution, resolution);
                } else if (grid[i][j] === 0 && neighbors === 3) {
                    // bring to life
                    gridCopy[i][j] = 1;
                    ctx.fillStyle = this.colors[neighbors % this.colors.length];
                    ctx.fillRect(x, y, resolution, resolution);
                } else {
                    // copy previous state
                    gridCopy[i][j] = grid[i][j];
                    if (grid[i][j] === 1 && neighbors !== 3) {
                        // apply secondary color if neighbor count changed
                        ctx.fillStyle = this.colors[neighbors % this.colors.length];
                        ctx.fillRect(x, y, resolution, resolution);
                    }
                }
                j++;
            }
            i++;
        }

        this.grid = gridCopy;
        ctx.restore();
    }

    // count the number of neighbors including wrap around neighbors
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

    private makeGrid(rows: number, cols: number) {
        const arr = new Array(rows);
        for (let i = 0; i < rows; i++) {
            arr[i] = new Array(cols);
        }
        return arr;
    }

    private randomize(grid: Grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = (Math.random() * 2) | 0;
            }
        }
    }
}