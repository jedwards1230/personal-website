'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { Universe } from '@/lib/game';
import { useIsDarkMode } from './darkMode';

export default function Game() {
    const animFrame = useRef<number>(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gridRef = useRef<HTMLCanvasElement>(null);

    const isDarkMode = useIsDarkMode();

    const CELL_SIZE = 4;
    const SPEED_MULTIPLIER = 1;

    const height =
        window !== undefined ? Math.round(window.innerHeight / CELL_SIZE) : 1;
    const width =
        window !== undefined ? Math.round(window.innerWidth / CELL_SIZE) : 1;

    const universe = useRef(new Universe(width, height, CELL_SIZE));

    const setStyle = () => {
        const computedStyles = getComputedStyle(document.documentElement);

        const primaryCell = computedStyles
            .getPropertyValue('--primary-cell')
            .trim();
        const secondaryCell = computedStyles
            .getPropertyValue('--secondary-cell')
            .trim();
        const inactiveCell = computedStyles
            .getPropertyValue('--inactive-cell')
            .trim();

        universe.current.setStyle(primaryCell, secondaryCell, inactiveCell);
    };

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        return;
        ctx.save();
        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue(
            '--grid-line'
        );
        ctx.globalAlpha = isDarkMode ? 0.03 : 0.1;
        ctx.lineWidth = 0.5;

        drawLines(ctx, width, height, CELL_SIZE);
        ctx.restore();
    };

    const drawLines = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        cell_size: number
    ) => {
        for (let i = 0; i <= width; i++) {
            drawLine(
                ctx,
                i * cell_size,
                0,
                i * cell_size,
                cell_size * height + 1
            );
        }
        for (let j = 0; j <= height; j++) {
            drawLine(
                ctx,
                0,
                j * cell_size,
                cell_size * width + 1,
                j * cell_size
            );
        }
    };

    const drawLine = (
        ctx: CanvasRenderingContext2D,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    const animate = (time: number = 0) => {
        animFrame.current = requestAnimationFrame(animate);
        const canvas = canvasRef.current as HTMLCanvasElement;

        if (canvas) {
            const ctx = canvas.getContext('2d', {
                desynchronized: true,
                alpha: false,
            }) as CanvasRenderingContext2D;
            //const st = performance.now();
            for (let i = 0; i < SPEED_MULTIPLIER; i++) {
                universe.current.tick(ctx);
            }
            //const et = performance.now();
            //console.log(`Took ${et - st}ms to tick.`);
        }
    };

    useEffect(() => {
        const handleDarkMode = (e: MediaQueryListEvent) => {
            setStyle();
            drawGrid(
                gridRef.current.getContext('2d', {
                    desynchronized: true,
                }) as CanvasRenderingContext2D
            );
        };

        if (window !== undefined) {
            const darkModeQuery = window.matchMedia(
                '(prefers-color-scheme: dark)'
            );
            darkModeQuery.addEventListener('change', handleDarkMode);

            return () => {
                darkModeQuery.removeEventListener('change', handleDarkMode);
            };
        }
    }, []);

    // initialize
    useEffect(() => {
        // establish game canvas
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = window !== undefined ? window.innerWidth : 1;
        canvas.height = window !== undefined ? window.innerHeight : 1;
        setStyle();

        // establish grid overlay canvas
        const grid = gridRef.current as HTMLCanvasElement;
        grid.width = window !== undefined ? window.innerWidth : 1;
        grid.height = window !== undefined ? window.innerHeight : 1;
        const ctx = grid.getContext('2d', {
            desynchronized: true,
        }) as CanvasRenderingContext2D;
        drawGrid(ctx);

        animate();
        return () => cancelAnimationFrame(animFrame.current);
    }, []);

    return (
        <div className="fixed left-0 top-0 -z-50 h-screen w-screen">
            <canvas className="fixed left-0 top-0 -z-20" ref={canvasRef} />
            <canvas
                className="fixed left-0 top-0 -z-10 bg-transparent"
                ref={gridRef}
            />
        </div>
    );
}
