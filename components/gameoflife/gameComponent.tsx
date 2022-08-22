/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { GameOfLife } from "./game";
import styles from "./Game.module.css";

const Game = () => {
    const { resolvedTheme } = useTheme()
    const animFrame = useRef<number>(0)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gridRef = useRef<HTMLCanvasElement>(null);

    const game = useRef(new GameOfLife());

    const cellColors = {
        dark: {
            activeColors: ['#4a148c', '#0d47a1'],
            inactiveColor: '#050505',
            lineColor: '#fff'
        },
        light: {
            activeColors: ['#64b5f6', '#ba68c8'],
            inactiveColor: '#fff',
            lineColor: '#000'
        }
    }

    const animate = (time: number = 0) => {
        animFrame.current = requestAnimationFrame(animate)
        const canvas = canvasRef.current as HTMLCanvasElement;

        if (canvas) {
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            game.current.update(ctx);
        }
    }

    // listen for color mode changes
    useEffect(() => {
        game.current.style = resolvedTheme === 'dark' ? cellColors.dark : cellColors.light
    }, [resolvedTheme]);

    // initialize
    useEffect(() => {
        // establish game canvas
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game.current.setupCanvas(canvas);
        game.current.style = resolvedTheme === 'dark' ? cellColors.dark : cellColors.light

        // establish grid overlay canvas
        const grid = gridRef.current as HTMLCanvasElement;
        grid.width = window.innerWidth;
        grid.height = window.innerHeight;
        const ctx = grid.getContext("2d") as CanvasRenderingContext2D;
        game.current.drawOverlay(ctx);

        if (resolvedTheme !== undefined) animate();
        return () => cancelAnimationFrame(animFrame.current);
    }, []);

    return (
        <>
            <canvas className={styles.game} ref={canvasRef} />
            <canvas className={styles.grid} ref={gridRef} />
        </>
    )
}

export default Game