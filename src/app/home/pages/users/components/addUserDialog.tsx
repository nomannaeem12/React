import {useState} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {CircularProgress, DialogContent, MenuItem, Snackbar, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {User} from "../../../../core/interfaces/user.ts";
import Divider from "@mui/material/Divider";
import {Form, Formik, useFormik} from "formik";
import * as yup from "yup";
import userService from "../../../../core/services/user.service.ts";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

interface AddUserDialogContentProps {
    open: boolean;
    onClose: (data?: User) => void;
}

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    role: string;
    password: string;
}

export function AddUserDialog(props: AddUserDialogContentProps) {
    const {onClose, open} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
    });
    const validationSchema = yup.object({
        firstName: yup.string().required('FirstName is required'),
        lastName: yup.string().required('lastName is required'),
        role: yup.string().required('Role is required'),
        jobTitle: yup.string().required('JobTitle is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const handleAddUser = (values: FormValues) => {
        const selectedScopes = scopes.find((s) => s.title === values.role)?.directories;
        const payload = {...values, role: handleRole(values.role), scopes: selectedScopes};
        setIsLoading(true);
        userService.addUser(payload).then((response) => {
            setIsLoading(false);
            if (response.id) {
                setSnackbarState({open: true, message: `User Added Successfully`});
                onClose(response);
            }
            if (response.error) {
                setSnackbarState({open: true, message: `${response.error}`});
            }
        })
    }

    function handleRole(value: string): string {
        return value === 'Super Admin' ? 'SUPERADMIN' : value.replace(/_/g, '_');
    }

    const {values, handleChange, handleBlur, handleSubmit, errors, touched} = useFormik({
        initialValues: {firstName: '', lastName: '', role: '', jobTitle: '', email: '', password: ''},
        onSubmit: handleAddUser,
        validationSchema,
    });

    function handleClose() {
        onClose();
    }

    return (
        <>
            <Dialog open={open}>
                <DialogTitle sx={{
                    padding: '10px 24px 0px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    ADD USER
                    <IconButton aria-label="delete" size="small" onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{width: 'auto'}}>
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
                                               value={values.jobTitle}
                                               size="small"
                                               name="jobTitle"
                                               variant="outlined"
                                               margin='normal'
                                               label="Job Title"
                                               onBlur={handleBlur}
                                               onChange={handleChange}
                                               helperText={touched.jobTitle && errors.jobTitle}
                                    /></Box>
                                <Box sx={{height: '65px'}}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        label="Role"
                                        name="role"
                                        select
                                        value={values.role}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={touched.role && errors.role}
                                    >
                                        {scopes.map((scope, index) => (
                                            <MenuItem key={index} value={scope.title}>
                                                {scope.title}
                                            </MenuItem>
                                        ))}
                                    </TextField></Box>
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
                                    <Divider sx={{mt: '10px', mb: '10px'}}/>
                                </Box>
                                <Button type={"submit"} variant='outlined' color='error' fullWidth
                                        endIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : null}
                                >
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={snackbarState.open}
                message={snackbarState.message}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                autoHideDuration={2000}
                onClose={() => setSnackbarState({...snackbarState, open: false})}
            /></>
    );
}


const scopes: { title: string, directories: string[] }[] = [
    {
        title: 'Super Admin',
        directories: ["DashBoard", "Users", "POCs", "Companies", "History", "Commodities", "Accounting", "Shipments", "Pallets", "Offers", "Lists", "Review", "VINs"]
    },
    {
        title: 'Customer Sales Representative',
        directories: ["Shipments", "Commodities", "Companies", "POCs", "Offers", "Lists"]
    },
    {title: 'Carrier Sales Representative', directories: ["Companies", "POCs"]},
    {title: 'Accounting Representative', directories: ["Accounting"],},
    {title: 'Pallets Sales Specialist', directories: ["Pallets"],},
    {
        title: 'Data Entry Specialist',
        directories: ["POCs", "Companies", "Commodities", "Accounting", "Shipments", "Pallets",]
    }];