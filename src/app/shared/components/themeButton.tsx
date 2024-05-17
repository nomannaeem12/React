import {useContext} from 'react';
import {ThemeContext} from "../../core/providers/themeProvider.tsx";
import IconButton from "@mui/material/IconButton";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggle = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    return (
        <>
            <IconButton onClick={toggleTheme}>
                {theme.palette.mode === 'dark' ? <WbSunnyIcon/> : <DarkModeIcon/>}
            </IconButton>
        </>
    );
};

export default ThemeToggle;
