import {useState} from "react";
import * as yup from "yup";
import usersService from "../../core/services/users.service.ts";
import {Form, Formik, useFormik} from "formik";
import Box from "@mui/material/Box";
import {CircularProgress, Snackbar, TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {navigationService} from "../../core/services/navigation.service.ts";


interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export function SignUp() {
    const {signInPage} = navigationService();
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
    });
    const validationSchema = yup.object({
        firstName: yup.string().required('FirstName is required'),
        lastName: yup.string().required('lastName is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const handleAddUser = (values: FormValues) => {
        setIsLoading(true);
        usersService.addUser(values)
            .then(() => {
                setSnackbarState({open: true, message: `User Added Successfully`});
                resetForm();
                signInPage();
            })
            .catch((error) => setSnackbarState({open: true, message: `${error}`}))
            .finally(() => setIsLoading(false))
    }


    const {values, handleChange, handleBlur, handleSubmit, errors, touched, resetForm} = useFormik({
        initialValues: {firstName: '', lastName: '', email: '', password: ''},
        onSubmit: handleAddUser,
        validationSchema,
    });

    return (
        <>
            <Typography
                variant="h3"
                fontFamily='sans-serif'
                fontWeight='bold'
                sx={{mb: 5}}
            >
                Create Account
            </Typography>

            <Formik initialValues={values} onSubmit={handleAddUser}>
                {() => (
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box sx={{mr: 1, width: '100%'}}>
                                <TextField fullWidth
                                           sx={{minHeight: '80px'}}
                                           value={values.firstName}
                                           name="firstName"
                                           variant="outlined"
                                           label="First Name"
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           helperText={touched.firstName && errors.firstName}
                                />
                            </Box>
                            <Box sx={{ml: 1, width: '100%'}}>
                                <TextField fullWidth
                                           sx={{minHeight: '80px'}}
                                           value={values.lastName}
                                           name="lastName"
                                           variant="outlined"
                                           label="Last Name"
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           helperText={touched.lastName && errors.lastName}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <TextField fullWidth
                                       value={values.email}
                                       name="email"
                                       sx={{minHeight: '80px'}}
                                       variant="outlined"
                                       label="Email"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       helperText={touched.email && errors.email}
                            /></Box>
                        <Box>
                            <TextField fullWidth
                                       name="password"
                                       type='password'
                                       variant="outlined"
                                       label="Password"
                                       sx={{minHeight: '80px'}}
                                       value={values.password}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       helperText={touched.password && errors.password}
                            />
                        </Box>
                        <Box>
                            <Divider sx={{mt: '15px', mb: '15px'}}/>
                        </Box>
                        <Button type={"submit"} variant='outlined' fullWidth size='large'
                                endIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : null}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form>
                )}
            </Formik>
            <Box sx={{minWidth: '100%', mt: 1, textAlign: 'end'}}>
                <Link to='/' tabIndex={1}>
                    <Typography fontWeight='bold' fontSize={22}>
                        back to SignIn
                    </Typography>
                </Link>
            </Box>
            <Snackbar
                open={snackbarState.open}
                message={snackbarState.message}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                autoHideDuration={2000}
                onClose={() => setSnackbarState({...snackbarState, open: false})}
            />
        </>
    )
}