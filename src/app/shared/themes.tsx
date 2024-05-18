import {createTheme} from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: 'rgb(27,4,4)',
        },
        secondary: {
            main: '#0078D4',
        },
        error: {
            main: '#f44336',
        },
        mode: 'light',
    },
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#0078D4',
        },
        error: {
            main: 'rgba(244,67,54,0.64)',
        },
        mode: 'dark',
    },
});
