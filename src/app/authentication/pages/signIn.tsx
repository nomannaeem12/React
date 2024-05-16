import {Button, CircularProgress, Container, Link, Snackbar, TextField} from "@mui/material";
import {Form, Formik, useFormik} from "formik";
import {SignInDTO} from "../../core/interfaces/authentication.interface.ts";
import {useState} from "react";
import * as yup from 'yup';
import {setSignedInUser} from "../../core/services/user.service.ts";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import authenticationService from "../../core/services/auth.service.ts";

interface FormValues extends SignInDTO {
}

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
    });
    const navigate = useNavigate();
    const handleSignIn = (values: FormValues) => {
        setIsLoading(true);
        authenticationService.signIn(values)
            .then((response) => {
                setSnackbarState({open: true, message: `Logged in Successfully`});
                setSignedInUser(response);
                navigate('/home');
            })
            .catch((error) => setSnackbarState({open: true, message: `${error.message}`}))
            .finally(() => setIsLoading(false))
    };

    const credentialsValidation = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const {values, handleChange, handleBlur, handleSubmit, errors, touched} = useFormik({
        initialValues: {email: '', password: ''},
        onSubmit: handleSignIn,
        validationSchema: credentialsValidation,
    });
    return (
        <>
            <Formik initialValues={values} validationSchema={credentialsValidation}>
                {() => (
                    <Form onSubmit={handleSubmit}>
                        <Container maxWidth="sm" sx={{marginBottom: '1rem', width: '450px'}}>
                            <Box>
                                <Box sx={{height: '85px'}}>
                                    <TextField
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.email && errors.email}
                                    />
                                </Box>
                                <Box sx={{height: '85px'}}>
                                    <TextField
                                        name="password"
                                        label="Password"
                                        variant="outlined"
                                        margin='normal'
                                        type='password'
                                        fullWidth
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.password && errors.password}
                                    />
                                </Box>
                                <Typography sx={{mt: '20px'}}>
                                    create new account by using
                                    our google services or by using this
                                    <Link href="#" underline="always" sx={{ml: '5px'}} tabIndex={1}>link</Link>
                                </Typography>
                            </Box>
                        </Container>
                        <Container sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'end',
                            marginBottom: '2rem'
                        }}>
                            <Link href="#" underline="always" tabIndex={1}>
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

