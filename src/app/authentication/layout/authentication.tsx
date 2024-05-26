import {useContext} from "react";
import {Outlet} from "react-router-dom";
import {Card, Container} from "@mui/material";
import Box from "@mui/material/Box";
import {ThemeContext} from "../../core/providers/customThemeProvider.tsx";

export function Authentication() {
    const {theme} = useContext(ThemeContext);
    return (
        <>
            <Box sx={{
                height: 'inherit',
                background: theme.palette.mode === 'dark' ? 'black' : 'white',
                color: theme.palette.mode === 'light' ? 'black' : 'white',
            }}>
                <Container sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'inherit'
                }}>
                    <Card variant='outlined' sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '10px 20px',
                    }}>
                        <Outlet/>
                    </Card>
                </Container>
            </Box>
        </>
    )
}
