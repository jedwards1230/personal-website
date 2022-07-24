import { blue, blueGrey, deepPurple, grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { GameOfLife } from "../../scripts/game";

const Game = () => {
    const [game, setGame] = useState(new GameOfLife(deepPurple[800], "#121212"));
    const animFrame = useRef<number>(0)
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const animate = (time: number = 0) => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        game?.draw(ctx);

        animFrame.current = requestAnimationFrame(animate)
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

export default Game;