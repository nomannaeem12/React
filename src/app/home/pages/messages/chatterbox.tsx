import {useParams} from "react-router-dom";
import {Card, CardActions, CardContent, CardHeader, Menu, MenuItem, TextField, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, {useContext, useEffect, useState} from "react";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";
import {User, UserMessage} from "../../../core/interfaces/user.ts";
import usersService, {getSignedInUser} from "../../../core/services/users.service.ts";
import StringAvatar from "../../../shared/components/stringAvatar.tsx";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ThemeContext} from "../../../core/providers/customThemeProvider.tsx";
import {containsEmoji, shortDate} from "../../../shared/functions.ts";
import {navigationService} from "../../../core/services/navigation.service.ts";
import messagesService from "../../../core/services/messages.service.ts";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteUserMessageDialog} from "./components/deleteUserMessageDialog.tsx";

export function Chatterbox() {
    const {recipientId} = useParams();
    const {theme} = useContext(ThemeContext);
    const {toggleLoading} = useContext(LoaderContext);
    const [recipient, setRecipient] = useState<User | null>(null);
    const [text, setText] = useState<string>('');
    const [userMessages, setUserMessages] = useState<UserMessage[]>([]);
    const {userProfile} = navigationService();

    function filteredUserMessages() {
        const payload: UserMessageDto = {initiatorId: getSignedInUser().id, recipientId: +recipientId!};
        messagesService.getMessages(payload).then((response) => {
            const messages: UserMessage[] = [...response.inbox, ...response.outbox];
            messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setUserMessages(messages);
        })
    }

    useEffect(() => {
        toggleLoading(true);
        usersService.getUserById(+recipientId!)
            .then((response) => {
                setRecipient(response);
                toggleLoading(false);
            })
        filteredUserMessages();
    }, [recipientId]);

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (!text.trim()) return;
        const payload: CreateUserMessageDto = {text: text, recipientId: +recipientId!};
        messagesService.sendMessage(payload).then((response) => {
            setUserMessages([...userMessages, response]);
            setText('');
        })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const onEditUserMessage = (userMessageToEdit: UserMessage) => {
        setUserMessages(userMessages.map(userMessage => ({
            ...userMessage,
            isEditMessage: userMessage.id === userMessageToEdit.id
        })))
    }

    const handleEditUserMessage = (editedUserMessage: UserMessage) => {
        setUserMessages(userMessages.map(userMessage => userMessage.id === editedUserMessage.id ? editedUserMessage : userMessage));
    }


    const handleDelete = (deletedUserMessage?: UserMessage) => {
        if (deletedUserMessage)
            setUserMessages(userMessages.filter(userMessage => userMessage.id !== deletedUserMessage.id ? deletedUserMessage : userMessage));
    }

    return (
        recipient && <>
            <Card
                variant='outlined'
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}
            >
                <CardHeader
                    avatar={
                        <StringAvatar name={`${recipient.firstName.trim()} ${recipient.lastName.trim()}`} size={40}/>
                    }
                    action={
                        <IconButton aria-label="info">
                            <InfoOutlinedIcon fontSize="large"/>
                        </IconButton>
                    }
                    title={
                        <Typography component="div" variant="h6" sx={{lineHeight: '1'}}>
                            {`${recipient.firstName} ${recipient.lastName}`}
                        </Typography>
                    }
                    subheader="Active 7h ago"
                />
                <Divider/>
                <CardContent sx={{height: '100%', overflow: 'auto'}}>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '10px 0 100px'
                        }}>
                            <Box sx={{mb: 1}}>
                                <StringAvatar name={`${recipient.firstName.trim()} ${recipient.lastName.trim()}`}
                                              size={70}/>
                            </Box>
                            <Typography variant='h6'>
                                {`${recipient.firstName} ${recipient.lastName}`}
                            </Typography>
                            <Typography sx={{color: '#a8a8a8', fontSize: '12px'}}>
                                {recipient.email}
                            </Typography>
                            <Button variant='text' color='primary' size='small'
                                    sx={{
                                        m: '15px 0',
                                        backgroundColor: theme.palette.mode === 'dark' ? '#90caf914' : '#efefef'
                                    }}
                                    onClick={() => userProfile(recipient.id)}>
                                View Profile
                            </Button>
                        </Box>
                    </Box>
                    <Box>
                        {
                            userMessages && userMessages.map((userMessage, index) => (
                                <Box key={index}>
                                    {userMessage.isEditMessage ?
                                        <EditMessageContainer
                                            userMessage={userMessage}
                                            onClose={() => setUserMessages(userMessages.map(userMessage => ({
                                                ...userMessage, isEditMessage: false
                                            })))}
                                            editedMessage={handleEditUserMessage}
                                        />
                                        :
                                        <TextMessageContainer
                                            userMessage={userMessage}
                                            recipientId={recipient.id}
                                            editMessage={onEditUserMessage}
                                            removeDeletedMessage={handleDelete}
                                        />
                                    }
                                </Box>
                            ))
                        }
                    </Box>
                </CardContent>
                <CardActions>
                    <form onSubmit={handleSubmit}
                          style={{width: '100%', background: `${theme.palette.mode === 'dark' ? 'black' : 'white'}`}}>
                        <TextField
                            placeholder={'Type a message'}
                            sx={{width: 'inherit'}}
                            value={text}
                            multiline
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </form>
                </CardActions>
            </Card>
        </>
    )
}

function TextMessageContainer({userMessage, recipientId, editMessage, removeDeletedMessage}: {
    userMessage: UserMessage,
    recipientId: number,
    editMessage: (userMessage: UserMessage) => void,
    removeDeletedMessage: (userMessage: UserMessage) => void,
}) {
    const [showMessageOptions, setMessageOptionsState] = useState<boolean>(false);
    const {theme} = useContext(ThemeContext);
    const isDarkMode = theme.palette.mode === 'dark';
    const isRecipient = userMessage.recipientId !== recipientId;
    const isEmoji = !containsEmoji(userMessage.message.text);
    const backgroundColor = isEmoji
        ? isDarkMode
            ? (isRecipient ? 'black' : '#3797f0')
            : (isRecipient ? '#efefef' : '#3797f0')
        : 'transparent';

    const color = isDarkMode
        ? (isRecipient ? 'white' : 'black')
        : (isRecipient ? 'black' : 'white');

    return (
        <>
            <Box
                sx={{
                    mb: '3px',
                    display: 'flex',
                    justifyContent: isRecipient ? 'start' : 'end',
                    flexDirection: isRecipient ? 'row' : 'row-reverse',
                    alignItems: 'center',
                }}
                onMouseEnter={() => setMessageOptionsState(true)}
                onMouseLeave={() => setMessageOptionsState(false)}
            >
                <Box style={{
                    backgroundColor: backgroundColor,
                    color: color,
                    padding: !isEmoji ? '0' : isRecipient ? '5px 15px 5px 10px' : '5px 10px 5px 15px',
                    borderRadius: !isEmoji ? '0' : isRecipient ? '4px 18px 18px 4px' : '18px 4px 4px 18px',
                    fontSize: !isEmoji ? '50px' : 'inherit',
                    margin: isRecipient ? '0 5px 0 0' : '0 0 0 5px',
                    maxWidth: '90%',
                    whiteSpace: 'pre-line'
                }}>
                    {userMessage.message.text}
                </Box> {userMessage.isMessageEdited &&
                <Tooltip title={shortDate(userMessage.updatedAt)}>
                    <Typography fontSize={'11px'} alignSelf={'flex-end'} sx={{cursor: 'pointer'}}>(edited)</Typography>
                </Tooltip>
            }
                {showMessageOptions &&
                    <>
                        <MessageOptions isRecipient={isRecipient} userMessage={userMessage} editMessage={editMessage}
                                        removeDeletedMessage={removeDeletedMessage}/>
                    </>
                }
            </Box>
        </>
    )
}

function MessageOptions({isRecipient, userMessage, editMessage, removeDeletedMessage}: {
    isRecipient: boolean,
    userMessage: UserMessage,
    editMessage: (userMessage: UserMessage) => void,
    removeDeletedMessage: (userMessage: UserMessage) => void
}) {
    const [openMessageDeleteDialog, setOpenMessageDeleteDialog] = useState<UserMessage | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        editMessage(userMessage)
        handleClose();
    };
    const onDelete = () => {
        setOpenMessageDeleteDialog(userMessage);
    }

    const handleDelete = (deletedUserMessage?: UserMessage) => {
        if (deletedUserMessage)
            removeDeletedMessage(deletedUserMessage);
        setOpenMessageDeleteDialog(null);
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon sx={{fontSize: '18px'}}/>
            </IconButton>
            <Menu
                transformOrigin={{horizontal: isRecipient ? 'left' : 'right', vertical: 'top'}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        padding: '0 10px',
                        width: '150px',
                        textAlign: 'center'
                    },
                }}
            >
                <Box sx={{fontSize: 'small'}}>
                    {shortDate(userMessage.createdAt)}
                </Box>
                <Divider/>
                {!isRecipient &&
                    <MenuItem onClick={handleEdit} sx={{
                        margin: '5px 0',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 'small'
                    }}>
                        Edit
                        <EditIcon sx={{fontSize: '20px'}}/>
                    </MenuItem>}
                <MenuItem
                    onClick={onDelete}
                    sx={{
                        margin: '5px 0', borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 'small',

                    }}>
                    Delete
                    <DeleteIcon sx={{fontSize: '20px'}}/>
                </MenuItem>
            </Menu>
            <DeleteUserMessageDialog
                userMessage={openMessageDeleteDialog}
                isRecipient={isRecipient}
                onClose={handleDelete}
            />
        </div>
    );
}

function EditMessageContainer({userMessage, editedMessage, onClose}: {
    userMessage: UserMessage,
    editedMessage: (updatedUserMessage: UserMessage) => void,
    onClose: () => void
}) {
    const [text, setText] = useState<string>('');
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        setText(userMessage.message.text);
    }, [userMessage])

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (!text.trim() || text === userMessage.message.text) return;
        const payload: UpdateUserMessageDto = {text: text};
        messagesService.editMessage(userMessage.id, payload).then((response) => {
            editedMessage(response);
        })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <>
            <Box sx={{
                background: `${theme.palette.mode === 'dark' ? '#1e1b1f' : '#241f260a'}`, margin: '8px 0', p: 2, pb: 0,
                borderLeft: `10px solid ${theme.palette.mode === 'dark' ? '#5f9ea07d' : '#241f264f'}`,
                borderRadius: '10px'
            }}>
                <form onSubmit={handleSubmit}
                      style={{width: '100%', background: `${theme.palette.mode === 'dark' ? 'black' : 'white'}`}}>
                    <TextField
                        placeholder={'Edit message'}
                        sx={{width: 'inherit'}}
                        multiline
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </form>
                <Box sx={{p: 1, display: 'flex', fontSize: 'small'}}>
                    escape to&nbsp;
                    <Typography
                        style={{textDecoration: 'underline', color: '#3797f0', fontSize: 'small', cursor: 'pointer'}}
                        onClick={onClose}>
                        cancel
                    </Typography>&nbsp;•
                    &nbsp;enter to&nbsp;
                    <Typography
                        style={{textDecoration: 'underline', color: '#3797f0', fontSize: 'small', cursor: 'pointer'}}
                        onClick={handleSubmit}
                    >Save
                    </Typography>&nbsp;
                </Box>
            </Box>
        </>
    )
}

export interface CreateUserMessageDto {
    recipientId: number;
    text: string;
}

export interface UpdateUserMessageDto extends Partial<CreateUserMessageDto> {
}

export interface DeleteUserMessageDto {
    deleteType: DeleteUserMessageType;
}

export enum DeleteUserMessageType {
    DeleteInitiatedMessage = 'DeleteInitiatedMessage',
    DeleteRecipientMessage = 'DeleteRecipientMessage',
    DeleteForEveryone = 'DeleteForEveryone',
}

export interface UserMessageDto {
    initiatorId: number;
    recipientId: number;
}
