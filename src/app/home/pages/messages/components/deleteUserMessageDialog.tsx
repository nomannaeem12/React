import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {UserMessage} from "../../../../core/interfaces/user.ts";
import {DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {useContext} from "react";
import {ThemeContext} from "../../../../core/providers/customThemeProvider.tsx";
import messagesService from "../../../../core/services/messages.service.ts";
import {DeleteUserMessageType} from "../chatterbox.tsx";

interface ContentProps {
    userMessage: UserMessage | null;
    isRecipient: boolean;
    onClose: (userMessage?: UserMessage) => void;
}

export function DeleteUserMessageDialog(props: ContentProps) {
    const {theme} = useContext(ThemeContext);
    const {onClose, userMessage, isRecipient} = props;


    function handleClose(deletedMessage?: UserMessage) {
        if (deletedMessage)
            onClose(deletedMessage);
    }

    function deleteMessageForIndividual() {
        if (!userMessage) return;
        messagesService.deleteMessage(userMessage.id, {deleteType: (isRecipient ? 'DeleteRecipientMessage' : 'DeleteInitiatedMessage') as DeleteUserMessageType}).then((response) => {
            handleClose(userMessage);
        })
    }

    function deleteMessageFromEverywhere() {
        if (!userMessage) return;
        messagesService.deleteMessage(userMessage.id, {deleteType: 'DeleteForEveryone' as DeleteUserMessageType}).then((response) => {
            handleClose(userMessage);
        })
    }

    return (
        <>
            <Dialog open={!!userMessage} onClose={handleClose}>
                <DialogTitle>
                    Delete message?
                </DialogTitle>
                <DialogContent>
                    you can delete message for everyone or just for yourself.
                </DialogContent>
                <DialogActions sx={{
                    display: "flex", justifyContent: "space-between", padding: '20px 24px',
                    background: theme.palette.mode === 'dark' ? '#0000005e' : '#ecececfc'
                }}>
                    {!isRecipient &&
                        <Button variant='contained' color='success' size='small' onClick={deleteMessageFromEverywhere}>Delete
                            for
                            everyone</Button>
                    }
                    <Button variant='contained' color='inherit' size='small'
                            onClick={deleteMessageForIndividual}>Delete {!isRecipient && <>for
                        me</>}</Button>
                    <Button variant='contained' color='inherit' size='small' onClick={handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
