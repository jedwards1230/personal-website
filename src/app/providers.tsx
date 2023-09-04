'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

import { NavigationProvider } from './NavigationProvider';
import FilterProvider from '@/FilterProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <SessionProvider>
                <FilterProvider>
                    <NavigationProvider>{children}</NavigationProvider>
                </FilterProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
