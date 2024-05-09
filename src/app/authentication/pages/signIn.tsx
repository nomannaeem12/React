import {Button, Card, Container, Link, Snackbar, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {SignInAPI} from "../../core/services/auth.service.ts";
import {CredentialDto} from "../../core/interfaces/authenticationInterface.ts";
import {useState} from "react";
import * as yup from 'yup';

interface FormValues extends CredentialDto {
}

export function SignIn() {
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
    });
    const handleLogin = (values: FormValues) => {
        SignInAPI(values).then(() => {
            alert(`Login with email ${values.email}`);
            setSnackbarState({open: true, message: `${values.email} is already logged in`});
        })
    }
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
                    {({handleSubmit, errors, touched}) => (
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
                                        disabled={errors.email || errors.password}>
                                    Sign In
                                </Button>
                                <Snackbar
                                    open={snackbarState.open}
                                    message={snackbarState.message}
                                />
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    )
}

