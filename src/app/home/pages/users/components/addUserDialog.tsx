import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Checkbox, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {Role_Types, Status_Types} from "../../../../core/interfaces/user.ts";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface AddUserDialogProps {
    open: boolean;
    onClose: (value: boolean) => void;
}

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    roles: Role_Types;
    status: Status_Types;
    password: string;
}

function Content(props: AddUserDialogProps) {
    const {onClose, open} = props;
    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>ADD USER</DialogTitle>
            <DialogContent sx={{width: 'auto'}}>
                <Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <TextField fullWidth
                                   sx={{mr: 1}}
                                   name="firstName"
                                   variant="outlined"
                                   margin='normal'
                                   label="First Name"
                                   size="small"
                        />
                        <TextField fullWidth
                                   size="small"
                                   sx={{ml: 1}}
                                   name="lastName"
                                   variant="outlined"
                                   margin='normal'
                                   label="Last Name"
                        />
                    </Box>
                    <TextField fullWidth
                               size="small"
                               name="email"
                               variant="outlined"
                               margin='normal'
                               label="email"
                    />
                    <TextField fullWidth
                               size="small"
                               name="jobTitle"
                               variant="outlined"
                               margin='normal'
                               label="Job Title"
                    />
                    <FormControl fullWidth margin='normal' required size="small">
                        <InputLabel id="demo-simple-select-label">Scopes</InputLabel>
                        <Select
                            label="Scopes"
                        >
                            {scopes.map((scope, index) => (
                                <MenuItem key={index}>{scope.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField fullWidth
                               name="password"
                               variant="outlined"
                               margin='normal'
                               label="Password"
                               size="small"
                    />
                    <Box>
                        <Divider sx={{mt: '10px', mb: '10px'}}/>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant='h6'>
                                Authorize Access to Certain Directories:
                            </Typography>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Checkbox/><Typography variant='body1'>All</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                            {directories.map((directory, index) => (
                                <Box key={index}>
                                    <Checkbox/>
                                    {directory.title}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Button variant='outlined' fullWidth>Submit</Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export function AddUserDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: boolean) => {
        setOpen(value);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add User
            </Button>
            <Content
                open={open}
                onClose={handleClose}
            />
        </>
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
    }]

const directories = [
    {title: 'Companies', checked: false},
    {title: 'Shipments', checked: false},
    {title: 'Accounting', checked: false},
    {title: 'POCs', checked: false},
    {title: 'Commodities', checked: false},
    {title: 'Pallets', checked: false},
    {title: 'VINs', checked: false},
    {title: 'History', checked: false},
    {title: 'Users', checked: false},
    {title: 'Review', checked: false},
    {title: 'Lists', checked: false},
    {title: 'Offers', checked: false},
];
