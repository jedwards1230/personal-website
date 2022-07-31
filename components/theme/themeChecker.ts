import { useColorScheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";

export const useThemeChecker = () => {
    const { mode, setMode } = useColorScheme();
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        setMode(isDarkMode ? 'dark' : 'light');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDarkMode]);

    return [mode, setMode];
}