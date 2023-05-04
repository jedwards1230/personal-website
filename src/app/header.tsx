'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import Game from '@/components/gameComponent';
import useWindowSize from '@/lib/windowSize';

export default function Header() {
    const [idx, setIdx] = useState(0);
    const size = useWindowSize();

    // reset the game when the window size changes
    const reset = () => setIdx(idx + 1);

    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    return (
        <>
            <Game key={idx} />
            <Link
                href="/"
                title="Click to reset Game of Life"
                passHref
                className="mx-4 my-0 text-center text-5xl font-medium text-black underline decoration-black/50 hover:decoration-black/100 dark:text-white dark:decoration-white/50 dark:hover:decoration-white/100 md:pb-4 md:text-7xl"
                onClick={reset}
            >
                Justin Edwards
            </Link>
        </>
    );
}
