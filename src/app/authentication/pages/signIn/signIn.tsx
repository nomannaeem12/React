import vfs_logo from '../../../../assets/VFS_logo.png';
import {Box, Button, Card, Container, Link, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {SignInAPI} from "../../services/auth.service.ts";

interface FormValues extends CredentialDto {

}

export function SignIn(){

    const  handleLogin = (values: FormValues) => {
        SignInAPI(values).then(()=>{
            alert(`Login with email ${values.email}`);
        })
    }

    return (
        <>
            <Container sx={{height: '100%',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Box>
                    <Box sx={{display: 'flex',justifyContent: 'center',marginBottom: '2rem'}}>
                        <img src={vfs_logo} alt="logo" height="220px"/>
                    </Box>
                    <Card variant="elevation">
                            <Formik initialValues={{email: '',password: ''}} onSubmit={(values )=>{
                                handleLogin(values);
                            }}>
                                {({handleSubmit})=>(
                                    <Form onSubmit={handleSubmit}>
                                    <Container maxWidth="sm" sx={{marginBottom: '1rem'}}>
                                        <Field name='email'>
                                            {({field})=>(
                                                <TextField label="Email" variant="filled" margin='normal' fullWidth {...field}/>
                                            )}
                                        </Field>
                                        <Field name='password'>
                                            {({field})=>(
                                                <TextField label="Password" variant="filled" margin='normal' fullWidth {...field}/>
                                            )}
                                        </Field>
                                    </Container>
                                    <Container sx={{display:'flex',justifyContent: 'space-between',alignItems: 'end', marginBottom: '2rem'}}>
                                        <Link href="#" underline="always">
                                            Forgot password?
                                        </Link>
                                        <Button type='submit' variant="contained" color='error'>Sign In</Button>
                                    </Container>
                                </Form>
                                )}
                            </Formik>
                    </Card>
                </Box>
            </Container>
        </>
    )
}

export {SignInAPI};

export interface CredentialDto {
    email: string;
    password: string;
}