import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {DialogContent} from "@mui/material";

export interface AddUserDialogProps {
    open: boolean;
    onClose: (value: boolean) => void;
}

function Content(props: AddUserDialogProps) {
    const {onClose, open} = props;

    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>ADD USER</DialogTitle>
            <DialogContent>

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
