/* eslint-disable react-hooks/exhaustive-deps */
import { blue, deepPurple, pink, purple, yellow } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import FPSCounter from "../../scripts/fpscounter";
import useThemeChecker from "../themeChecker";
import { GameOfLife } from "./game";

const Game = () => {
    const mode = useThemeChecker();
    const animFrame = useRef<number>(0)
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const fps = new FPSCounter();
    const game = new GameOfLife()

    // get cell colors by mode
    const getColors = () => {
        return {
            activeColors: (mode === 'dark')
                ? [purple[900], blue[900]]
                : [blue[300], purple[300]],
            inactiveColor: (mode === 'dark') ? '#000' : '#fff',
        }
    }

    const animate = (time: number = 0) => {
        if (fps.stop) return
        fps.update(time);
        
        animFrame.current = requestAnimationFrame(animate)
        const canvas = canvasRef.current as HTMLCanvasElement;

        if (canvas && fps.ready()) {
            fps.step();

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;

            game.update(ctx);

            fps.log();
        }
    }

    // listen for color mode changes
    useEffect(() => {
        const { activeColors, inactiveColor } = getColors();
        game.setColors(activeColors, inactiveColor);
    }, [mode]);

    // initialize
    useEffect(() => {
        fps.init(60)

        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game.setupCanvas(canvas.width, canvas.height);

        const { activeColors, inactiveColor } = getColors();
        game.setColors(activeColors, inactiveColor)

        animate();
        return () => cancelAnimationFrame(animFrame.current);
    }, []);

    return <canvas ref={canvasRef} />
}

export default Game