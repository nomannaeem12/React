import {Box} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {RecipientSelectionDialog} from "./components/recipientSelectionDialog.tsx";
import {useState} from "react";
import {User} from "../../../core/interfaces/user.ts";
import {navigationService} from "../../../core/services/navigation.service.ts";

export function Messages() {
    const {navigateToChatterbox} = navigationService();
    const selectedRecipient = (data: User) => {
        navigateToChatterbox(data.id);
    }

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box>
                        <ChatIcon sx={{height: '50px', width: 'auto'}}/>
                    </Box>
                    <Typography variant='h6'>
                        Your messages
                    </Typography>
                    <Typography variant='body1' sx={{color: '#a8a8a8'}}>
                        Send a message to start a chat.
                    </Typography>
                    <Box sx={{m: '15px 0'}}>
                        <RecipientSelectionDialogButton selectedRecipient={selectedRecipient}/>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

function RecipientSelectionDialogButton({selectedRecipient}: { selectedRecipient: (data: User) => void }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (data?: User) => {
        setOpen(false);
        if (data)
            selectedRecipient(data)
    };

    return (
        <>
            <Button onClick={handleClickOpen} color='primary' variant='contained' sx={{mt: 3}}>Send message</Button>
            <RecipientSelectionDialog
                open={open}
                onClose={handleClose}
            />
        </>
    );
}