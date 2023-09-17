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
    img = false,
}: {
    children: React.ReactNode;
    size?: 'sm' | 'lg' | 'xl';
    zIndex?: 10 | 20 | 30;
    intercept?: boolean;
    img?: boolean;
}) {
    const router = useRouter();
    const {
        currentProject,
        setCurrentProject,
        setImageOpen,
        currentExperience,
        setCurrentExperience,
    } = useNavigation();
    const overlay = useRef(null);
    const wrapper = useRef(null);

    const onDismiss = useCallback(() => {
        if (intercept) router.back();
        else if (img) setImageOpen(false);
        else if (currentProject) setCurrentProject(null);
        else if (currentExperience) setCurrentExperience(null);
    }, [
        currentExperience,
        currentProject,
        img,
        intercept,
        router,
        setCurrentExperience,
        setCurrentProject,
        setImageOpen,
    ]);

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
            if (e.key === 'Escape') {
                e.preventDefault();
                onDismiss();
            }
        },
        [onDismiss],
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => document.body.classList.remove('overflow-hidden');
    }, []);

    return (
        <div
            ref={overlay}
            onClick={onClick}
            className={clsx(
                'fixed left-0 right-0 top-0 flex h-screen w-screen flex-col items-center justify-center overflow-hidden backdrop-blur-sm animate-in fade-in-25',
                zIndex === 10 &&
                    'z-20 bg-neutral-900/60 dark:bg-neutral-800/50 md:py-8',
                zIndex === 20 &&
                    'z-30 bg-neutral-900/70 pb-4 dark:bg-neutral-900/60 sm:pb-16 sm:pt-8 md:px-8 md:pb-12 md:pt-16',
                zIndex === 30 &&
                    'z-40 bg-neutral-900/80 pb-16 pt-8 dark:bg-neutral-900/70 md:px-8 md:pb-12 md:pt-16',
            )}
        >
            <div
                ref={wrapper}
                className={clsx(
                    'mx-auto max-w-7xl overflow-y-scroll overscroll-none rounded border border-transparent bg-background transition-all animate-in fade-in-25 dark:sm:border-border dark:sm:border-y-border',
                    !img && 'w-full px-6',
                    size === 'sm' && 'md:w-2/3 lg:w-1/2',
                    size === 'lg' && 'md:w-4/5 lg:w-2/3',
                )}
            >
                {children}
            </div>
        </div>
    );
}
