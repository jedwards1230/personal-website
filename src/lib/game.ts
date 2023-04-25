type CellStyle = {
    primaryColor: string;
    secondaryColor: string;
    inactiveColor: string;
};

export class Universe {
    private cells: number[];
    private prevCells: number[];
    private width: number;
    private height: number;
    private resolution: number;
    private style: CellStyle | undefined;
    private paintBackground: boolean;

    private neighborOffsets: number[][] = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    constructor(width: number, height: number, resolution: number) {
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        let size = width * height;

        this.cells = new Array(size);
        for (let i = 0; i < size; i++) {
            this.cells[i] = 0;
        }

        this.prevCells = new Array(size);
        for (let i = 0; i < size; i++) {
            this.prevCells[i] = 0;
        }

        this.style = undefined;
        this.paintBackground = true;

        for (let i = 0; i < size; i++) {
            let randNum = Math.random();
            if (randNum < 0.5) {
                this.cells[i] = 0;
            } else {
                this.cells[i] = 1;
            }
        }
    }

    private getIndex(row: number, column: number): number {
        return row * this.width + column;
    }

    private liveNeighborCount(row: number, column: number): number {
        let liveCount = 0;
        for (const [yOffset, xOffset] of this.neighborOffsets) {
            const newRow = (row + yOffset + this.height) % this.height;
            const newCol = (column + xOffset + this.width) % this.width;
            const idx = this.getIndex(newRow, newCol);
            liveCount += this.cells[idx] > 0 ? 1 : 0;
        }
        return liveCount;
    }

    private paintCell(
        ctx: CanvasRenderingContext2D,
        row: number,
        col: number
    ): void {
        let res = this.resolution;
        ctx.fillRect(col * res, row * res, res, res);
    }

    private paint(idx: number, ctx: CanvasRenderingContext2D): void {
        if (!this.style) return;

        let cell = this.prevCells[idx];
        switch (cell) {
            case 1:
                ctx.fillStyle = this.style.primaryColor;
                break;
            case 2:
                ctx.fillStyle = this.style.secondaryColor;
                break;
            default:
                ctx.fillStyle = this.style.inactiveColor;
        }
        let row = Math.floor(idx / this.width);
        let col = idx % this.width;

        this.paintCell(ctx, row, col);
    }

    public tick(ctx: CanvasRenderingContext2D): void {
        if (!this.style) {
            return;
        }

        let updateList: number[] = [];
        ctx.save();

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                let idx = this.getIndex(row, col);
                let cell = this.cells[idx];
                let liveNeighbors = this.liveNeighborCount(row, col);

                let newVal = (cell: number, liveNeighbors: number) => {
                    if (cell === 0 && liveNeighbors === 3) {
                        return 1;
                    } else if (
                        (cell === 1 || cell === 2) &&
                        liveNeighbors === 2
                    ) {
                        return 2;
                    } else if (
                        (cell === 1 || cell === 2) &&
                        liveNeighbors === 3
                    ) {
                        return 1;
                    } else {
                        return 0;
                    }
                };

                this.prevCells[idx] = newVal(cell, liveNeighbors);

                if (cell !== this.prevCells[idx]) {
                    updateList.push(idx);
                }
            }
        }

        if (this.paintBackground) {
            ctx.fillStyle = this.style.inactiveColor;
            ctx.fillRect(
                0,
                0,
                this.width * this.resolution,
                this.height * this.resolution
            );
            this.paintBackground = false;
        }

        for (let idx of updateList) {
            this.paint(idx, ctx);
        }

        // Update only changed cells
        for (let idx of updateList) {
            this.cells[idx] = this.prevCells[idx];
        }

        ctx.restore();
    }

    public setStyle(
        primaryColor: string,
        secondaryColor: string,
        inactiveColor: string
    ): void {
        this.style = {
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
            inactiveColor: inactiveColor,
        };
        this.paintBackground = true;
    }
}
