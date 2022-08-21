type GameStyle = {
    activeColors: string[];
    inactiveColor: string;
    lineColor: string;
}

type Grid = number[][];

export class GameOfLife {
    grid?: Grid;
    style?: GameStyle;
    
    resolution: number = 6;

    /** Create grid based on canvas size */
    // This is not in the constructor due to how the react component creates the canvas
    public setupCanvas(canvas: HTMLCanvasElement) {
        const rows = Math.round(canvas.height / this.resolution);
        const cols = Math.round(canvas.width / this.resolution);
        this.grid = this.initGrid(rows, cols);
    }

    /** Game loop */
    public update(ctx: CanvasRenderingContext2D) {
        ctx.save();
        const grid = this.grid!;
        const rows = grid.length;
        const cols = grid[0].length;
        const colors = this.style!.activeColors;
        const inactiveColor = this.style!.inactiveColor!;
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

                ctx.beginPath();

                if (cell === 0 && neighbors === 3) {
                    // bring to life
                    gridCopy[i][j] = 1;
                    ctx.fillStyle = colors[0];
                } else if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
                    // keep alive
                    gridCopy[i][j] = 1;
                    ctx.fillStyle = colors[neighbors - 2];
                } else {
                    // dead 
                    gridCopy[i][j] = 0;
                    ctx.fillStyle = inactiveColor;
                }

                //ctx.fillRect(x, y, resolution, resolution);
                ctx.arc(x, y, resolution / 2, 0, 2 * Math.PI);
                ctx.fill();
                j++;
            }
            i++;
        }

        this.grid = gridCopy;
        ctx.restore();
    }

    public drawOverlay(ctx: CanvasRenderingContext2D) {
        ctx.save();
        const grid = this.grid!;
        const resolution = this.resolution;

        const height = grid.length * resolution
        const width = grid[0].length * resolution;

        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = this.style!.lineColor;

        for (let i = 0; i < height; i += resolution) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }

        for (let i = 0; i < width; i += resolution) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
        ctx.restore();
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