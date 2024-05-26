import {CircularProgress, Snackbar, TextField} from "@mui/material";
import {Form, Formik, useFormik} from "formik";
import {SignInDTO} from "../../core/interfaces/authentication.interface.ts";
import {useState} from "react";
import * as yup from 'yup';
import {setSignedInUser} from "../../core/services/user.service.ts";
import {Link, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import authenticationService from "../../core/services/auth.service.ts";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
            <Typography
                variant="h3"
                fontFamily='sans-serif'
                fontWeight='bold'
                sx={{mb: 5}}
            >
                @Social.Connect!!!
            </Typography>
            <Formik initialValues={values} validationSchema={credentialsValidation} onSubmit={handleSignIn}>
                {() => (
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            name="email"
                            label="Email"
                            sx={{minHeight: '80px'}}
                            variant="outlined"
                            fullWidth
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.email && errors.email}
                        />
                        <TextField
                            name="password"
                            sx={{minHeight: '80px'}}
                            label="Password"
                            variant="outlined"
                            type='password'
                            fullWidth
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.password && errors.password}
                        />
                        <Divider sx={{mt: '15px', mb: '15px'}}/>
                        <Button type='submit' variant='outlined' fullWidth size='large'
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
                    </Form>
                )}
            </Formik>
            <Box sx={{width: '100%', mt: 1, textAlign: 'end'}}>
                <Link to='/sign-up' tabIndex={1}>
                    <Typography fontWeight='bold' fontSize={22}>
                        create Account
                    </Typography>
                </Link>
            </Box>
        </>
    )
}

