'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import va from '@vercel/analytics';
import { useEffect, useState } from 'react';

import useWindowSize from '@/lib/useWindowSize';

const Game = dynamic(() => import('@/components/gameComponent'), {
    ssr: false,
});

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
                className="mx-4 my-0 select-none text-center text-5xl font-medium text-black underline decoration-black/50 hover:decoration-black/100 dark:text-white dark:decoration-white/50 dark:hover:decoration-white/100 md:pb-4"
                onClick={() => {
                    reset();
                    va.track('Reset Animation');
                }}
            >
                Justin Edwards
            </Link>
        </>
    );
}
