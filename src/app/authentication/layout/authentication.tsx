import Box from "@mui/material/Box";
import vfs_logo from '../../../assets/VFS_logo.png';
import Typography from "@mui/material/Typography";
import {Outlet} from "react-router-dom";

export function Authentication(){
    return (
        <>
            <Box sx={{height: 'inherit',background: 'var(--gm3-sys-color-surface-container, #f0f4f9)'}}>
                <Box sx={{display: 'flex', justifyContent: 'center' , alignItems: 'center' , height: 'inherit'}}>
                    <Box sx={{backgroundColor: 'white', width: '900px',borderRadius:'30px'}}>
                        <Box sx={{m: '40px'}}>
                            <img src={vfs_logo} alt="logo" height="50px"/>
                            <Box sx={{mt: '20px',display: 'flex', justifyContent: 'space-between'}}>
                               <Box>
                                   <Typography sx={{fontSize: '40px',mb: '10px'}}>
                                       Sign in
                                   </Typography>
                                   <Typography sx={{fontSize: '18px'}}>
                                       Use user TMS account
                                   </Typography>
                               </Box>
                                <Box>
                                    <Outlet/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
