'use client';

import { useCallback, useRef, useEffect, MouseEventHandler } from 'react';
import clsx from 'clsx';

import { useNavigation } from '@/app/NavigationProvider';
import { useRouter } from 'next/navigation';

export default function Modal({
    children,
    size = 'lg',
    zIndex = 10,
    intercept = false,
}: {
    children: React.ReactNode;
    size?: 'sm' | 'lg';
    zIndex?: 10 | 20;
    intercept?: boolean;
}) {
    const router = useRouter();
    const { setCurrentProject } = useNavigation();
    const overlay = useRef(null);
    const wrapper = useRef(null);

    const onDismiss = useCallback(() => {
        if (intercept) router.back();
        else setCurrentProject(null);
    }, [intercept, router, setCurrentProject]);

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper],
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss();
        },
        [onDismiss],
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        // disable scroll. freeze in place.
        document.body.style.top = `-${window.scrollY}px`;
        return () => {
            document.body.classList.remove('overflow-hidden');
            document.body.style.removeProperty('top');
        };
    }, []);

    return (
        <div
            ref={overlay}
            onClick={onClick}
            className={clsx(
                'fixed left-0 top-0 flex h-screen w-screen flex-col items-center overflow-hidden',
                zIndex === 10 &&
                    'z-10 bg-neutral-950/60 dark:bg-neutral-800/50 md:py-8',
                zIndex === 20 &&
                    'z-20 bg-neutral-950/70 dark:bg-neutral-900/80 md:py-16',
            )}
        >
            <div
                ref={wrapper}
                className={clsx(
                    'w-full overflow-y-scroll overscroll-none rounded bg-neutral-50 px-6 transition-all dark:border dark:border-neutral-700 dark:bg-neutral-950',
                    size === 'sm' && 'md:w-1/2',
                    size === 'lg' && 'md:w-4/5 lg:w-2/3',
                )}
            >
                {children}
            </div>
        </div>
    );
}
