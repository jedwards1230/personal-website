import { blue, deepPurple, purple } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { GameOfLife } from "../../scripts/game";

const Game = () => {
    const colors = [blue[900], purple[900], deepPurple[800]];
    const [game, setGame] = useState(new GameOfLife(colors, "#000"));
    const animFrame = useRef<number>(0)
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const animate = (time: number = 0) => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const ctx = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;

            ctx.imageSmoothingEnabled = false;
            game.update(ctx);

            animFrame.current = requestAnimationFrame(animate)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        game.setupCanvas(canvas.width, canvas.height);
        animate();

        return () => cancelAnimationFrame(animFrame.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <canvas ref={canvasRef} />
    )
}

export default Game