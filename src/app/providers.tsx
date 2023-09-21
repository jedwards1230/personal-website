'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

import FilterProvider from '@/app/FilterProvider';
import { NavigationProvider } from './NavigationProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <SessionProvider>
                <NavigationProvider>
                    <FilterProvider>{children}</FilterProvider>
                </NavigationProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
