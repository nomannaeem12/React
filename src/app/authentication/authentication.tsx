import vfs_logo from '../../assets/VFS_logo.png';
import {Box,Container} from "@mui/material";
import {Outlet} from "react-router-dom";

export function Authentication(){
    return (
        <>
            <Container sx={{height: '100%',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Box>
                    <Box sx={{display: 'flex',justifyContent: 'center',marginBottom: '2rem'}}>
                        <img src={vfs_logo} alt="logo" height="220px"/>
                    </Box>
                    <Outlet/>
                </Box>
            </Container>
        </>
    )
}
