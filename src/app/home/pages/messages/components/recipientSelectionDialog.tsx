import React, {useState} from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Checkbox, CircularProgress, DialogActions, DialogContent, InputAdornment, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import userService, {getSignedInUser} from "../../../../core/services/user.service.ts";
import Box from "@mui/material/Box";
import {User} from "../../../../core/interfaces/user.ts";
import StringAvatar from "../../../../shared/components/stringAvatar.tsx";
import {useDebounce} from "../../../../shared/debounceHook.ts";

interface ContentProps {
    open: boolean;
    onClose: (data?: User) => void;
}

export function RecipientSelectionDialog(props: ContentProps) {
    const {onClose, open} = props;
    const currentSignedInUser = getSignedInUser();
    const [isLoading, setIsLoading] = useState(false);
    const [recipients, setRecipients] = useState<User[]>([]);
    const [searchText, setSearchText] = useState('');
    const [selectedRecipient, setSelectedRecipient] = useState<User | null>(null);

    function handleClose() {
        onClose();
        setRecipients([]);
        setSelectedRecipient(null);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setSearchText(event.target.value);
    };

    useDebounce(() => {
        if (!searchText || searchText === '') {
            setIsLoading(false);
            setRecipients([]);
            return
        }
        userService.filter({searchText: searchText.trim()}).then((response) => {
            setRecipients(response.filter(res => res.id !== currentSignedInUser.id));
            setIsLoading(false);
        });
    }, 500, [searchText]);

    function handleSubmit() {
        onClose(selectedRecipient!);
        handleClose();
    }

    return (
        <>
            <Dialog open={open} fullWidth={true}>
                <DialogTitle sx={{
                    padding: '10px 24px 0px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '14px'
                }}>
                    New message
                    <IconButton aria-label="delete" size="small" onClick={handleClose}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </DialogTitle>
                <Divider/>
                <DialogContent sx={{height: '400px', fontSize: '14px'}}>
                    <TextField placeholder='search...' variant='outlined' size='small' sx={{width: '100%'}}
                               onChange={handleChange}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start">To: </InputAdornment>,
                                   endAdornment: isLoading ? <CircularProgress size={20}/> : <></>,
                               }}
                    />
                    <Box sx={{margin: '10px 0'}}>
                        {recipients.map((user) => (
                            <Box key={user.id}
                                 sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2}}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <StringAvatar name={`${user.firstName.trim()} ${user.lastName.trim()}`} size={30}/>
                                    <Box sx={{ml: 1}}>
                                        <Box sx={{
                                            fontSize: '14px',
                                            fontWeight: 'bold'
                                        }}>{user.firstName} {user.lastName}</Box>
                                        <Box sx={{lineHeight: '0.8', fontSize: '12px',}}>{user.email}</Box>
                                    </Box>
                                </Box>
                                <Checkbox checked={selectedRecipient?.id === user.id}
                                          onClick={() => setSelectedRecipient(user)}/>
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions sx={{padding: '0 24px 10px 24px'}}>
                    <Button fullWidth variant='contained' color='secondary' onClick={handleSubmit}
                            disabled={!selectedRecipient}>Chat</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export interface UsersFilterDto {
    searchText: string;
}