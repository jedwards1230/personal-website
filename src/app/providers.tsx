'use client';

import { ThemeProvider } from 'next-themes';
import { NavigationProvider } from './NavigationProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <NavigationProvider>{children}</NavigationProvider>
        </ThemeProvider>
    );
}
