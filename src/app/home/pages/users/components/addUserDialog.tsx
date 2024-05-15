import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent, MenuItem, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {Role_Types, User} from "../../../../core/interfaces/user.ts";
import Divider from "@mui/material/Divider";
import {Form, Formik, useFormik} from "formik";
import * as yup from "yup";
import {AddUserAPI} from "../../../../core/services/user.service.ts";

interface AddUserDialogProps {
    open: boolean;
    onClose: (data: User) => void;
    loadingState: (state: boolean) => void;
}

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    role: Role_Types;
    password: string;
}

function Content(props: AddUserDialogProps) {
    const {onClose, open, loadingState} = props;
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
        const payload = {...values, role: handleRole(values.role),scopes: selectedScopes };
            loadingState(true);
        AddUserAPI(payload).then((response: User) => {
            onClose(response);
            loadingState(false);
        })
    }

    function handleRole(value: string) : Role_Types {
        return value === 'Super Admin' ? 'SUPERADMIN' : value.replaceAll(' ','_');
    }

    const {values, handleChange, handleBlur, handleSubmit, errors, touched} = useFormik({
        initialValues: {firstName: '', lastName: '', role: '', jobTitle: '', email: '', password: ''},
        onSubmit: handleAddUser,
        validationSchema,
    });
    return (
        <Dialog open={open}>
            <DialogTitle sx={{padding:'10px 24px 0px 24px'}}>ADD USER</DialogTitle>
            <DialogContent sx={{width: 'auto'}}>
                <Formik initialValues={values} onSubmit={handleAddUser}>
                    {() => (
                        <Form onSubmit={handleSubmit}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <TextField fullWidth
                                   sx={{mr: 1}}
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
                        <TextField fullWidth
                                   value={values.lastName}
                                   size="small"
                                   sx={{ml: 1}}
                                   name="lastName"
                                   variant="outlined"
                                   margin='normal'
                                   label="Last Name"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   helperText={touched.lastName && errors.lastName}
                        />
                    </Box>
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
                    />
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
                    />
                            <TextField
                                fullWidth
                                margin="normal"
                                required
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
                            </TextField>
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
                    <Box>
                        <Divider sx={{mt: '10px', mb: '10px'}}/>
                    </Box>
                    <Button type={"submit"} variant='outlined' fullWidth>Submit</Button>
                </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}

export function AddUserDialog({addNewUser , loadingState} : { addNewUser: (data: User) => void , loadingState: (state: boolean) => void}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (data: User) => {
        setOpen(false);
        addNewUser(data);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add User
            </Button>
            <Content
                open={open}
                onClose={handleClose}
                loadingState={loadingState}
            />
        </>
    );
}