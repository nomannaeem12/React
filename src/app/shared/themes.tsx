import {createTheme} from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            paper: '#ffffff',
            default: '#ffffff',
        }
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#000',
            paper: '#000'
        }
    },
});
