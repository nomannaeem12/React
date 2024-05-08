import './login.css'
import {useState} from "react";
import vfs_logo from '../../../../assets/VFS_logo.png';
import {Box, Button, Card, Container, Link, TextField} from "@mui/material";
function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passworda, setPassworda] = useState([]);
    function handleLogin(){
        alert(`Login with email ${email}`);
    }
    return (
        <>
            <Container sx={{height: '100vh',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Box>
                    <Box sx={{display: 'flex',justifyContent: 'center',marginBottom: '2rem'}}>
                        <img src={vfs_logo} alt="logo" height="220px"/>
                    </Box>
                    <Card variant="elevation">
                        <Container maxWidth="sm" sx={{marginBottom: '1rem'}}>
                            <TextField label="Email" variant="filled" margin='normal' fullWidth  onChange={e => setEmail(e.target.value)}/>
                            <TextField label="Password" variant="filled" margin='normal' fullWidth onChange={e => setPassword(e.target.value)}/>
                        </Container>
                        <Container  sx={{display:'flex',justifyContent: 'space-between',alignItems: 'end', marginBottom: '2rem'}}>
                            <Link href="#" underline="always">
                                Forgot password?
                            </Link>
                            <Button onClick={handleLogin} variant="contained" color='error'>Sign In</Button>
                        </Container>
                    </Card>
                </Box>
            </Container>
        </>
    )
}

export {Login};