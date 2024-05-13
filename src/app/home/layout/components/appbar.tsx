import * as React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
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
import {Button, Container, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link, Outlet, useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

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


export const mainListItems = (
    <React.Fragment>
        <ListItemButton to='/home/users' component={Link}>
            <ListItemIcon>
                <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary="Users"/>
        </ListItemButton>

        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BlockIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Shipment"/>*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BlockIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Company"/>*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BlockIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Accounting"/>*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BlockIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="POC"/>*/}
        {/*</ListItemButton>*/}
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BlockIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="VIN"/>*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BlockIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Pallets"/>*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BlockIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Commodities"/>*/}
        {/*</ListItemButton>*/}
    </React.Fragment>
);


export default function Appbar() {
    const navigator = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigator('/');
    };
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000',
            },
            secondary: {
                main: '#781616',
            },
        },
        typography: {
            fontFamily: 'sans-serif',
        },
    });

    function navigateToHome() {
        navigator('/home');
    }

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
                            to='/home'
                            onClick={navigateToHome}
                        >
                            Valued Freight Service
                        </Typography>
                        <Button onClick={handleLogout} variant="contained" color='error'>Logout</Button>
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
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{my: 1}}/>
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Container sx={{mt: '70px', maxWidth: 'none !important', width: 'auto'}}>
                    <Outlet/>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
