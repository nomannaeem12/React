import vfs_logo_dark from '../../../assets/VFS_logo_dark.png';
import vfs_logo_light from '../../../assets/VFS_logo_light.png';
import Typography from "@mui/material/Typography";
import {Outlet} from "react-router-dom";
import {useContext} from "react";
import {ThemeContext} from "../../core/providers/themeProvider.tsx";
import {Card, ThemeProvider} from "@mui/material";
import Box from "@mui/material/Box";

export function Authentication() {
    const {theme} = useContext(ThemeContext);
    let logo = theme.palette.mode === 'dark' ? vfs_logo_light : vfs_logo_dark;
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{height: 'inherit'}}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'inherit',
                        background: theme.palette.mode === 'light' ? 'var(--gm3-sys-color-surface-container, #f0f4f9)' : '#000000eb'
                    }}>
                        <Card variant='outlined' sx={{width: '900px', borderRadius: '30px'}}>
                            <Box sx={{m: '35px'}}>
                                <img src={logo} alt="logo" height="50px"/>
                                <Box sx={{mt: '20px', display: 'flex', justifyContent: 'space-between'}}>
                                    <Box>
                                        <Typography sx={{fontSize: '40px', mb: '10px'}}>
                                            Sign in
                                        </Typography>
                                        <Typography>
                                            Use your TMS account
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Outlet/>
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}
