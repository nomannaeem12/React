import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

export function NotFound(){
    return (
        <>
            <Box sx={{height: '100%',display: 'flex',alignItems: 'center' ,justifyContent:'center'}}>
                <Box sx={{textAlign: 'end'}}>
                    <Typography sx={{fontSize: '100px', fontWeight: 'bold'}}>
                        Not Found.
                    </Typography>
                    <Link to='/' underline="always">
                        Go to Home
                    </Link>
                </Box>
            </Box>
        </>
    );
}