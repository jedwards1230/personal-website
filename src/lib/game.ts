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

	constructor(width: number, height: number, resolution: number) {
		this.width = width;
		this.height = height;
		this.resolution = resolution;
		let size = width * height;
		this.cells = new Array(size).fill(0);
		this.prevCells = new Array(size).fill(0);
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
		let neighborIndices = this.getNeighborIndices(row, column);
		let count = neighborIndices.reduce((sum, idx) => {
			return sum + (this.cells[idx] > 0 ? 1 : 0);
		}, 0);
		return count;
	}

	private getNeighborIndices(row: number, column: number): number[] {
		let top = row === 0 ? this.height - 1 : row - 1;
		let down = row === this.height - 1 ? 0 : row + 1;
		let left = column === 0 ? this.width - 1 : column - 1;
		let right = column === this.width - 1 ? 0 : column + 1;

		return [
			this.getIndex(top, left),
			this.getIndex(top, column),
			this.getIndex(top, right),
			this.getIndex(row, left),
			this.getIndex(row, right),
			this.getIndex(down, left),
			this.getIndex(down, column),
			this.getIndex(down, right),
		];
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

			for (let row = 0; row < this.height; row++) {
				for (let col = 0; col < this.width; col++) {
					let idx = this.getIndex(row, col);
					this.paint(idx, ctx);
				}
			}
			this.paintBackground = false;
		} else {
			for (let idx of updateList) {
				this.paint(idx, ctx);
			}
		}

		this.cells = this.prevCells.slice();
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
