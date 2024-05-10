import {Button, Card, CircularProgress, Container, Link, Snackbar, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {SignInAPI} from "../../core/services/auth.service.ts";
import {CredentialInterface, SignInResponse} from "../../core/interfaces/authentication.interface.ts";
import {useState} from "react";
import * as yup from 'yup';
import {setSignedInUser} from "../../core/services/user.service.ts";

interface FormValues extends CredentialInterface {
}

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
    });
    const handleLogin = (values: FormValues) => {
        setIsLoading(true);
        SignInAPI(values)
            .then((response) => {
                setIsLoading(false)
                if (response?.user) {
                    setSnackbarState({ open: true, message: `Logged in Successfully` });
                    setSignedInUser(response as SignInResponse);
                }
                if (response?.statusCode === 401) return setSnackbarState({ open: true, message: `${response.message}` });
            })
    };

    const credentialsValidation = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().required('Password is required'),
    });
    return (
        <>
            <Card variant="elevation">
                <Formik initialValues={{email: '', password: ''}} onSubmit={(values) => {
                    handleLogin(values);
                }} validationSchema={credentialsValidation}>
                    {({handleSubmit, errors, touched,values}) => (
                        <Form onSubmit={handleSubmit}>
                            <Container maxWidth="sm" sx={{marginBottom: '1rem'}}>
                                <Field name="email">
                                    {({field}) => (
                                        <TextField
                                            label="Email"
                                            variant="filled"
                                            margin="normal"
                                            fullWidth
                                            {...field}
                                            helperText={touched.email && errors.email}
                                        />
                                    )}
                                </Field>
                                <Field name='password'>
                                    {({field}) => (
                                        <TextField
                                            label="Password"
                                            variant="filled"
                                            margin='normal'
                                            fullWidth {...field}
                                            helperText={touched.password && errors.password}
                                        />
                                    )}
                                </Field>
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
                                        endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                                        disabled={Object.keys(errors).length > 0 || !(values.email && values.password) }>
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </Button>
                                <Snackbar
                                    open={snackbarState.open}
                                    message={snackbarState.message}
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                                    autoHideDuration={2000}
                                    onClose={()=>setSnackbarState({...snackbarState,open: false})}
                                />
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    )
}

