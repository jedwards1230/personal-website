/* eslint-disable react-hooks/exhaustive-deps */
import { blue, deepPurple, pink, purple, yellow } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import useThemeChecker from "../themeChecker";
import { GameOfLife } from "./game";

const Game = () => {
    let stop = false;
    let frameCount = 0;
    const fpsLimit = 60;
    let fpsInterval: number
    let startTime: number
    let now: number
    let then: number
    let elapsed: number;

    const logFps = true;

    const mode = useThemeChecker();

    const getColors = () => {
        return {
            activeColors: (mode === 'dark')
                ? [purple[900], blue[900]]
                : [blue[300], purple[300]],
            inactiveColor: (mode === 'dark') ? '#000' : '#fff',
        }
    }

    const [game, setGame] = useState(new GameOfLife());
    const animFrame = useRef<number>(0)
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const animate = (time: number = 0) => {
        if (stop) return
        animFrame.current = requestAnimationFrame(animate)

        now = time;
        elapsed = now - then;
        const canvas = canvasRef.current as HTMLCanvasElement;

        if (canvas && elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const ctx = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;

            ctx.imageSmoothingEnabled = false;
            game.update(ctx);

            if (logFps) {
                const sinceStart = now - startTime;
                const currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
                console.log((currentFps | 0) + ' fps');
            }
        }


    }

    useEffect(() => {
        const { activeColors, inactiveColor } = getColors();
        game.setColors(activeColors, inactiveColor);
    }, [mode]);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        game.setupCanvas(canvas.width, canvas.height);

        const { activeColors, inactiveColor } = getColors();
        game.setColors(activeColors, inactiveColor)

        fpsInterval = 1000 / fpsLimit;
        then = performance.now();
        startTime = then;

        animate();

        return () => cancelAnimationFrame(animFrame.current);
    }, []);

    return (
        <canvas ref={canvasRef} />
    )
}

export default Game