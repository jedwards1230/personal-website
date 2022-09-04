/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import styles from "./Game.module.css";
import { Universe } from "../../game/game";

const Game = () => {
    const { resolvedTheme } = useTheme()
    const animFrame = useRef<number>(0)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gridRef = useRef<HTMLCanvasElement>(null);

    const CELL_SIZE = 3;

    const height = Math.round(window.innerHeight / CELL_SIZE);
    const width = Math.round(window.innerWidth / CELL_SIZE);

    const universe = useRef(Universe.new(width, height, CELL_SIZE));

    const setStyle = () => {
        const primaryCell = getComputedStyle(document.body).getPropertyValue('--primary-cell');
        const secondaryCell = getComputedStyle(document.body).getPropertyValue('--secondary-cell');
        const inactiveCell = getComputedStyle(document.body).getPropertyValue('--inactive-cell');

        universe.current.set_style(
            primaryCell,
            secondaryCell,
            inactiveCell,
        )
    }

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        ctx.save();
        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--grid-line');
        ctx.globalAlpha = resolvedTheme === 'dark' ? 0.05 : 0.1;
        ctx.lineWidth = 0.5;

        // Vertical lines.
        for (let i = 0; i <= width; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, CELL_SIZE * height + 1);
            ctx.stroke();
        }

        // Horizontal lines.
        for (let j = 0; j <= height; j++) {
            ctx.beginPath();
            ctx.moveTo(0, j * CELL_SIZE);
            ctx.lineTo(CELL_SIZE * width + 1, j * CELL_SIZE);
            ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
        ctx.restore();
    };

    const animate = (time: number = 0) => {
        animFrame.current = requestAnimationFrame(animate)
        const canvas = canvasRef.current as HTMLCanvasElement;

        if (canvas) {
            const ctx = canvas.getContext('2d', { desynchronized: true, alpha: false }) as CanvasRenderingContext2D;
            //const st = performance.now();
            universe.current.tick(ctx);
            //const et = performance.now();
            //console.log(`Took ${et - st}ms to tick.`);
        }
    }

    // listen for color mode changes
    useEffect(() => {
        setStyle()
        drawGrid(gridRef.current.getContext('2d') as CanvasRenderingContext2D)
    }, [resolvedTheme]);

    // initialize
    useEffect(() => {
        // establish game canvas
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setStyle();

        // establish grid overlay canvas
        const grid = gridRef.current as HTMLCanvasElement;
        grid.width = window.innerWidth;
        grid.height = window.innerHeight;
        const ctx = grid.getContext("2d") as CanvasRenderingContext2D;
        drawGrid(ctx);

        if (resolvedTheme !== undefined) animate();
        return () => cancelAnimationFrame(animFrame.current);
    }, []);

    return (
        <div className={styles.container}>
            <canvas className={styles.game} ref={canvasRef} />
            <canvas className={styles.grid} ref={gridRef} />
        </div>
    )
}

export default Game