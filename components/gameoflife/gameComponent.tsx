/* eslint-disable react-hooks/exhaustive-deps */
import { blue, deepPurple, purple } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import useThemeChecker from "../themeChecker";
import { GameOfLife } from "./game";

const Game = () => {
    const mode = useThemeChecker();

    const getColors = () => {
        return {
            activeColors: (mode === 'dark') ? [blue[900], deepPurple[800]] : [blue[500], purple[500]],
            inactiveColor: (mode === 'dark') ? '#000' : '#fff',
        }
    }

    const { activeColors, inactiveColor } = getColors();
    const [game, setGame] = useState(new GameOfLife(activeColors, inactiveColor));
    const animFrame = useRef<number>(0)
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const animate = (time: number = 0) => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        if (canvas) {
            //console.time('draw');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const ctx = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;

            ctx.imageSmoothingEnabled = false;
            game.update(ctx);

            //console.timeEnd('draw');
            animFrame.current = requestAnimationFrame(animate)
        }
    }

    useEffect(() => {
        const { activeColors, inactiveColor } = getColors();
        game.updateColors(activeColors, inactiveColor);
    }, [mode]);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        game.setupCanvas(canvas.width, canvas.height);
        animate();

        return () => cancelAnimationFrame(animFrame.current);
    }, []);

    return (
        <canvas ref={canvasRef} />
    )
}

export default Game