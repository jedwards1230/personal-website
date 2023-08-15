'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { Universe } from '@/lib/game';

const CELL_SIZE = 4;

export default function Game() {
    const animFrame = useRef<number>(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const height =
        window !== undefined ? Math.round(window.innerHeight / CELL_SIZE) : 1;
    const width =
        window !== undefined ? Math.round(window.innerWidth / CELL_SIZE) : 1;

    const universe = useRef(new Universe(width, height, CELL_SIZE));

    const setStyle = () => {
        const computedStyles = getComputedStyle(document.documentElement);

        const getStyle = (name: string) =>
            computedStyles.getPropertyValue(name).trim();

        const primaryCell = getStyle('--primary-cell');
        const secondaryCell = getStyle('--secondary-cell');
        const inactiveCell = getStyle('--inactive-cell');

        universe.current.setStyle(primaryCell, secondaryCell, inactiveCell);
    };

    const animate = (time: number = 0) => {
        animFrame.current = requestAnimationFrame(animate);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', {
            desynchronized: true,
            alpha: false,
        });
        universe.current.tick(ctx);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (window === undefined) {
            canvas.width = 1;
            canvas.height = 1;
            return;
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        setStyle();
        animate();

        const handleDarkMode = () => setStyle();

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', handleDarkMode);

        return () => {
            darkModeQuery.removeEventListener('change', handleDarkMode);
            cancelAnimationFrame(animFrame.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.canvas
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-0 -z-20 h-screen w-screen"
            ref={canvasRef}
        />
    );
}
