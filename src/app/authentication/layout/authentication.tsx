import {useContext} from "react";
import {ThemeContext} from "../../core/providers/themeProvider.tsx";
import {ThemeProvider} from "@mui/material/styles";
import {Outlet} from "react-router-dom";
import {Card, Container} from "@mui/material";
import Box from "@mui/material/Box";

export function Authentication() {
    const {theme} = useContext(ThemeContext);
    return (
        <>
            <ThemeProvider theme={theme}>
                <Card sx={{height: 'inherit', borderRadius: 'unset'}}>
                    <Container sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'inherit'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <Outlet/>
                        </Box>
                    </Container>
                </Card>
            </ThemeProvider>
        </>
    )
}
