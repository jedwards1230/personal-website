import { useState, useEffect } from "react";


const useThemeChecker = (): string => {
    const [mode, setMode] = useState<string>(
        (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ? 'dark'
            : 'light'
    );

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
                const colorScheme = event.matches ? "dark" : "light";
                setMode(colorScheme);
            });
    }, []);

    return mode!;
}

export default useThemeChecker;