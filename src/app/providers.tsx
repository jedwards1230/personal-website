'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

import FilterProvider from '@/app/FilterProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <SessionProvider>
                <FilterProvider>{children}</FilterProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
