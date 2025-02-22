import {createContext, ReactNode, useEffect, useState} from 'react';
import {Theme} from '@mui/material/styles';
import {darkTheme, lightTheme} from "../../shared/themes.tsx";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    toggleTheme: () => {
    },
});

export const CustomThemeProvider = ({children}: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setCurrentTheme((prevTheme) => (prevTheme.palette.mode === 'light' ? darkTheme : lightTheme));
    };

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setCurrentTheme(darkTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{theme: currentTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
