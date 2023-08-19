'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import clsx from 'clsx';

import IconLinks from './iconLinks';
import Details from '@/app/details.mdx';
import useWindowSize from '@/lib/useWindowSize';

const Game = dynamic(() => import('@/components/gameComponent'), {
    ssr: false,
});

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(true);
    const [idx, setIdx] = useState(0);
    const size = useWindowSize();

    // reset the game when the window size changes
    const reset = () => setIdx(idx + 1);

    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    useEffect(() => {
        setMounted(true);

        if (window !== undefined && window.innerWidth < 768) {
            setOpen(false);
        }
    }, []);

    if (!mounted) return null;
    return (
        <>
            {/* Header */}
            <div
                className={clsx(
                    'flex h-full flex-col items-center justify-center transition-all',
                    open ? 'w-full sm:w-1/2 lg:w-2/3' : 'w-full',
                )}
            >
                <Game key={idx} />
                <Link
                    href="/"
                    title="Click to reset Game of Life"
                    passHref
                    className="plausible-event-name=Reset+Animation mx-4 my-0 select-none text-center text-5xl font-medium text-black underline decoration-black/50 hover:decoration-black/100 dark:text-white dark:decoration-white/50 dark:hover:decoration-white/100 md:pb-4"
                    onClick={reset}
                >
                    Justin Edwards
                </Link>
                <IconLinks />
            </div>

            {/* Details Panel */}
            <div
                className={clsx(
                    'absolute flex h-full flex-col overflow-y-scroll border-neutral-400 bg-neutral-50/50 px-2 pb-1 pt-2 backdrop-blur-xl transition-all dark:border-neutral-600 dark:bg-neutral-900/50 sm:static sm:bg-neutral-50/20 sm:pr-12 sm:backdrop-blur-lg dark:sm:bg-neutral-900/20',
                    open
                        ? 'right-0 w-full sm:w-1/2 sm:border-l lg:w-1/3'
                        : '-right-48 w-0 translate-x-full',
                )}
            >
                <Details />
            </div>

            {/* Sidebar Toggle */}
            <button
                onClick={() => setOpen((open) => !open)}
                className={clsx(
                    'absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/70 transition-colors hover:bg-blue-500/30 sm:right-0 sm:top-auto sm:h-full sm:rounded-none sm:bg-blue-500/20',
                )}
            >
                <span
                    className={clsx(
                        'text-2xl font-medium transition-transform',
                        !open && 'rotate-180',
                    )}
                >
                    {'>'}
                </span>
            </button>
        </>
    );
}
