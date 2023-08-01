'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { Universe } from '@/lib/game';

export default function Game() {
    const animFrame = useRef<number>(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gridRef = useRef<HTMLCanvasElement>(null);


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

        animate();
        return () => cancelAnimationFrame(animFrame.current);
    }, []);

    return (
        <div className="fixed left-0 top-0 -z-50 h-screen w-screen">
            <motion.canvas
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed left-0 top-0 -z-20"
                ref={canvasRef}
            />
            <motion.canvas
                layout
                className="fixed left-0 top-0 -z-10 bg-transparent"
                ref={gridRef}
            />
        </div>
    );
}
