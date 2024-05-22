import {useState} from "react";
import * as yup from "yup";
import userService from "../../core/services/user.service.ts";
import {Form, Formik, useFormik} from "formik";
import Box from "@mui/material/Box";
import {CircularProgress, Snackbar, TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";


interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export function SignUp() {

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
        userService.addUser(values)
            .then((response) => {
                setSnackbarState({open: true, message: `User Added Successfully`});
                resetForm();
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
            <Formik initialValues={values} onSubmit={handleAddUser}>
                {() => (
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box sx={{height: '65px', mr: 1}}>
                                <TextField fullWidth
                                           value={values.firstName}
                                           name="firstName"
                                           variant="outlined"
                                           margin='normal'
                                           label="First Name"
                                           size="small"
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           helperText={touched.firstName && errors.firstName}
                                />
                            </Box>
                            <Box sx={{height: '65px', ml: 1}}>
                                <TextField fullWidth
                                           value={values.lastName}
                                           size="small"
                                           name="lastName"
                                           variant="outlined"
                                           margin='normal'
                                           label="Last Name"
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           helperText={touched.lastName && errors.lastName}
                                />
                            </Box>
                        </Box>
                        <Box sx={{height: '65px'}}>
                            <TextField fullWidth
                                       value={values.email}
                                       size="small"
                                       name="email"
                                       variant="outlined"
                                       margin='normal'
                                       label="Email"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       helperText={touched.email && errors.email}
                            /></Box>
                        <Box sx={{height: '65px'}}>
                            <TextField fullWidth
                                       name="password"
                                       type='password'
                                       variant="outlined"
                                       margin='normal'
                                       label="Password"
                                       size="small"
                                       value={values.password}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       helperText={touched.password && errors.password}
                            />
                        </Box>
                        <Box>
                            <Divider sx={{mt: '15px', mb: '15px'}}/>
                        </Box>
                        <Button type={"submit"} variant='outlined' fullWidth
                                endIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : null}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form>
                )}
            </Formik>
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