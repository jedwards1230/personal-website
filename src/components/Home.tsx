'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import IconLinks from './iconLinks';
import Header from './header';
import Details from '@/app/details.mdx';

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(true);

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
                <Header />
                <IconLinks />
            </div>

            {/* Details Panel */}
            <div
                className={clsx(
                    'absolute flex h-full flex-col overflow-y-scroll border-neutral-400 bg-neutral-100/90 px-2 pb-1 pt-2 transition-all dark:border-neutral-600 dark:bg-neutral-900/90 sm:static sm:bg-neutral-50 sm:pr-12 dark:sm:bg-neutral-900',
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
