import {Button, Card, CircularProgress, Container, Link, Snackbar, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {SignInAPI} from "../../core/services/auth.service.ts";
import {CredentialInterface, SignInResponse} from "../../core/interfaces/authentication.interface.ts";
import {useState} from "react";
import * as yup from 'yup';
import {setSignedInUser} from "../../core/services/user.service.ts";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface FormValues extends CredentialInterface {
}

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
    });
    const navigate = useNavigate();
    const handleLogin = (values: FormValues) => {
        setIsLoading(true);
        SignInAPI(values)
            .then((response) => {
                setIsLoading(false)
                if (response?.user) {
                    setSnackbarState({open: true, message: `Logged in Successfully`});
                    setSignedInUser(response as SignInResponse);
                    navigate('/home');
                }
                if (response?.statusCode === 401) return setSnackbarState({open: true, message: `${response.message}`});
            })
    };

    const credentialsValidation = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().required('Password is required'),
    });
    return (
        <>
                <Formik initialValues={{email: '', password: ''}} onSubmit={(values) => {
                    handleLogin(values);
                }} validationSchema={credentialsValidation}>
                    {({handleSubmit, errors, touched, values}) => (
                        <Form onSubmit={handleSubmit}>
                            <Container maxWidth="sm" sx={{marginBottom: '1rem',width: '400px'}}>
                                <Box>
                                   <Box sx={{height:'85px'}}>
                                       <Field name="email">
                                           {({field}) => (
                                               <TextField
                                                   label="Email"
                                                   variant="outlined"
                                                   margin="normal"
                                                   fullWidth
                                                   {...field}
                                                   helperText={touched.email && errors.email}
                                               />
                                           )}
                                       </Field>
                                   </Box>
                                       <Box sx={{height:'85px'}}>
                                       <Field name='password'>
                                           {({field}) => (
                                               <TextField
                                                   label="Password"
                                                   variant="outlined"
                                                   margin='normal'
                                                   type='password'
                                                   fullWidth {...field}
                                                   helperText={touched.password && errors.password}
                                               />
                                           )}
                                       </Field>
                                   </Box>
                                    <Typography sx={{mt: '20px'}}>
                                        create new account by using
                                        our google services or by using this
                                        <Link href="#" underline="always" sx={{ml:'5px'}}>link</Link>
                                    </Typography>
                                </Box>
                            </Container>
                            <Container sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'end',
                                marginBottom: '2rem'
                            }}>
                                <Link href="#" underline="always">
                                    Forgot password?
                                </Link>
                                <Button type='submit' variant="contained" color='error'
                                        endIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : null}
                                        disabled={Object.keys(errors).length > 0 || !(values.email && values.password)}>
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </Button>
                                <Snackbar
                                    open={snackbarState.open}
                                    message={snackbarState.message}
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                                    autoHideDuration={2000}
                                    onClose={() => setSnackbarState({...snackbarState, open: false})}
                                />
                            </Container>
                        </Form>
                    )}
                </Formik>
        </>
    )
}

