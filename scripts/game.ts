export class GameOfLife {
    grid?: Grid;
    colors: string[];
    inactiveColor: string;
    resolution: number = 2;

    public constructor(colors: string[], inactiveColor: string) {
        this.colors = colors;
        this.inactiveColor = inactiveColor;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        const grid = this.grid!;
        const rows = grid.length;
        const cols = grid[0].length;
        const gridCopy = this.makeGrid(rows, cols);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = j * this.resolution;
                const y = i * this.resolution;
                const neighbors = this.countNeighbors(i, j);

                if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                    gridCopy[i][j] = 0;
                    ctx.fillStyle = this.inactiveColor;
                    ctx.fillRect(x, y, this.resolution, this.resolution);
                } else if (grid[i][j] === 0 && neighbors === 3) {
                    gridCopy[i][j] = 1;
                    ctx.fillStyle = this.colors[neighbors % this.colors.length];
                    ctx.fillRect(x, y, this.resolution, this.resolution);
                } else {
                    gridCopy[i][j] = grid[i][j];
                    if (grid[i][j] === 1) {
                        ctx.fillStyle = (grid[i][j] === 1) ? this.colors[neighbors % this.colors.length] : this.inactiveColor;
                        ctx.fillRect(x, y, this.resolution, this.resolution);
                    }
                }
            }
        }

        this.grid = gridCopy;
        ctx.restore();
    }

    public drawMouse(x: number, y: number) {
        const row = Math.round(y / this.resolution);
        const col = Math.round(x / this.resolution);
        this.grid![row][col] = (this.grid![row][col] === 0) ? 1 : 0;
        if (this.grid![row + 1] !== undefined && this.grid![row + 1][col + 1] !== undefined) {
            this.grid![row + 1][col + 1] = (this.grid![row + 1][col + 1] === 0) ? 1 : 0;
        }
        if (this.grid![row - 1] !== undefined && this.grid![row - 1][col - 1] !== undefined) {
            this.grid![row - 1][col - 1] = (this.grid![row - 1][col - 1] === 0) ? 1 : 0;
        }
    }

    // count the number of neighbors and wrap around neighbors
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

    public setupCanvas(width: number, height: number) {
        const rows = Math.round(height / this.resolution);
        const cols = Math.round(width / this.resolution);
        this.grid = this.makeGrid(rows, cols);
        this.randomize(this.grid!);
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
                grid[i][j] = Math.floor(Math.random() * 2);
                //grid[i][j] = (Math.random() * 2) | 0;
            }
        }
    }
}