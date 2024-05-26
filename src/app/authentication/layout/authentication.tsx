import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";

export function Authentication() {
    return (
        <>
            <Box sx={{height: 'inherit'}}>
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
                        border: '1px solid white',
                        padding: '10px 20px',
                        borderRadius: '10px',
                    }}>
                        <Outlet/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
