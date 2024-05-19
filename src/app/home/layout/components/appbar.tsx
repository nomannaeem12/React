import * as React from 'react';
import {useContext} from 'react';
import {styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {Container, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link, Outlet, useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import {LoaderContext, LoaderProvider} from "../../../core/providers/loaderProvider.tsx";
import {CustomLoader} from "../../../shared/components/customLoader.tsx";
import {ThemeContext} from "../../../core/providers/themeProvider.tsx";
import LogoutIcon from '@mui/icons-material/Logout';
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import StringAvatar from "../../../shared/components/stringAvatar.tsx";
import {getSignedInUser} from "../../../core/services/user.service.ts";
import {navigationService} from "../../../core/services/navigation.service.ts";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
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
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function Appbar() {
    const user = getSignedInUser();
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {navigateToHome, navigateToUserProfile} = navigationService();
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
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', height: '100%'}}>
                <CssBaseline/>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1, cursor: 'pointer'}}
                            onClick={navigateToHome}
                        >
                            Valued Freight Service
                        </Typography>
                        <IconButton onClick={() => {
                            navigateToUserProfile(user.id)
                        }}>
                            <StringAvatar name={`${user.firstName.trim()} ${user.lastName.trim()}`} size={40}/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        <Box>
                            <List component="nav">
                                <ListItemButton to='/home/users' component={Link}>
                                    <ListItemIcon>
                                        <PersonIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Users"/>
                                </ListItemButton>
                                <Divider sx={{my: 1}}/>
                            </List>
                        </Box>
                        <Box>
                            <Divider sx={{my: 1}}/>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    {theme.palette.mode === 'dark' ? <WbSunnyIcon/> : <DarkModeIcon/>}
                                </ListItemIcon>
                                <ListItemText primary="Theme"/>
                            </ListItemButton>
                            <Divider sx={{my: 1}}/>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItemButton>
                            <Divider sx={{my: 1}}/>
                        </Box>
                    </Box>
                </Drawer>
                <Container sx={{mt: '70px', mb: '6px', maxWidth: 'none !important', width: 'auto', overflow: 'hidden'}}>
                    <LoaderProvider>
                        {!isLoading && <Outlet/>}
                        <CustomLoader/>
                    </LoaderProvider>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
