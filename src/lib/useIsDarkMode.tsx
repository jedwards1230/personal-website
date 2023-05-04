'use client';

import { useState, useEffect } from 'react';

export function useIsDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        const setDarkModeClass = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsDarkMode(e.matches);
        };

        setDarkModeClass(darkModeMediaQuery);
        darkModeMediaQuery.addEventListener('change', setDarkModeClass);

        return () => {
            darkModeMediaQuery.removeEventListener('change', setDarkModeClass);
        };
    }, []);

    return isDarkMode;
}
