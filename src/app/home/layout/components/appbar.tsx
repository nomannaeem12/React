import * as React from 'react';
import {useContext} from 'react';
import {styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link, Outlet, useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import {LoaderContext, LoaderProvider} from "../../../core/providers/loaderProvider.tsx";
import {CustomLoader} from "../../../shared/components/customLoader.tsx";
import {ThemeContext} from "../../../core/providers/customThemeProvider.tsx";
import LogoutIcon from '@mui/icons-material/Logout';
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ChatIcon from '@mui/icons-material/Chat';

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 240,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                borderRadius: '4px',
                border: `1px solid ${theme.palette.mode === 'light' ? '#0000001f' : '#ffffff1f'}`,
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(7),
                },
            }),
        },
    }),
);

export default function Appbar() {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const navigator = useNavigate();
    const {isLoading} = useContext(LoaderContext);
    const handleLogout = () => {
        localStorage.clear();
        navigator('/');
    };
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{display: 'flex', height: '100%'}}>
            <CssBaseline/>
            <Drawer variant="permanent" open={open} sx={{
                margin: '10px 0 10px 10px', borderRadius: '4px',
                border: `1px solid ${theme.palette.mode === 'light' ? '#0000001f' : '#ffffff1f'}`,
            }}>
                <List component="nav">
                    <ListItemButton onClick={toggleDrawer}>
                        <ListItemIcon>
                            <MenuIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'@Social C'}/>
                    </ListItemButton>
                    <ListItemButton to='/home/users' component={Link}>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItemButton>
                    <ListItemButton to='/home/messages' component={Link}>
                        <ListItemIcon>
                            <ChatIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Chat"/>
                    </ListItemButton>
                    <ListItemButton onClick={toggleTheme}>
                        <ListItemIcon>
                            {theme.palette.mode === 'dark' ? <WbSunnyIcon/> : <DarkModeIcon/>}
                        </ListItemIcon>
                        <ListItemText primary="Theme"/>
                    </ListItemButton>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </List>
            </Drawer>
            <Box sx={{padding: '10px', width: '100%', overflowX: 'hidden'}}>
                <LoaderProvider>
                    {!isLoading && <Outlet/>}
                    <CustomLoader/>
                </LoaderProvider>
            </Box>
        </Box>
    );
}
