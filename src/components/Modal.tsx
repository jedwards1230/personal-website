'use client';

import { useCallback, useRef, useEffect, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: React.ReactNode }) {
    const overlay = useRef(null);
    const wrapper = useRef(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

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

    return (
        <div
            ref={overlay}
            className="fixed bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center overflow-hidden bg-neutral-950/60 dark:bg-neutral-900/60 md:py-8"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="h-full w-full overflow-y-scroll overscroll-none bg-neutral-50 px-6 transition-all dark:bg-neutral-950 md:w-4/5 lg:w-2/3"
            >
                {children}
            </div>
        </div>
    );
}
