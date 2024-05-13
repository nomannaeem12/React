import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

export interface AddUserDialogProps {
    open: boolean;
    onClose: (value: string) => void;
}

function DialogContent(props: AddUserDialogProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose('');
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

    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add User
            </Button>
            <DialogContent
                open={open}
                onClose={handleClose}
            />
        </>
    );
}
