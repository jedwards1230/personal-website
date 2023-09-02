'use client';

import { ThemeProvider } from 'next-themes';
import { NavigationProvider } from './NavigationProvider';
import FilterProvider from '@/FilterProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <FilterProvider>
                <NavigationProvider>{children}</NavigationProvider>
            </FilterProvider>
        </ThemeProvider>
    );
}
