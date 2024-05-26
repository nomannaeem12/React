import {useParams} from "react-router-dom";
import {Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, {useContext, useEffect, useState} from "react";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";
import {User, UserMessage} from "../../../core/interfaces/user.ts";
import userService from "../../../core/services/user.service.ts";
import StringAvatar from "../../../shared/components/stringAvatar.tsx";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ThemeContext} from "../../../core/providers/customThemeProvider.tsx";
import {containsEmoji} from "../../../shared/functions.ts";

export function Chatterbox() {
    const {recipientId} = useParams();
    const {toggleLoading} = useContext(LoaderContext);
    const [recipient, setRecipient] = useState<User | null>(null);
    const [text, setText] = useState<string>('');
    const [userMessages, setUserMessages] = useState<UserMessage[]>([]);

    useEffect(() => {
        toggleLoading(true);
        userService.getUserById(+recipientId!)
            .then((response) => {
                setRecipient(response);
                toggleLoading(false);
            })
        userService.getUserMessages(+recipientId!).then((response) => {
            const messages: UserMessage[] = [...response.inbox, ...response.outbox];
            messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setUserMessages(messages);
        })
    }, [recipientId]);

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (!text.trim()) return;
        const payload: CreateUserMessageDto = {text: text, receiverId: +recipientId!};
        userService.sendMessage(payload).then((response) => {
            setUserMessages([...userMessages, response]);
            setText('');
        })
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
                            <Button variant='contained' color='secondary' size='small' sx={{m: '15px 0'}}>
                                View Profile
                            </Button>
                        </Box>
                    </Box>
                    <Box>
                        {
                            userMessages && userMessages.map((userMessage, index) => (
                                <Box
                                    sx={{
                                        mb: '3px',
                                        display: 'flex',
                                        justifyContent: userMessage.receiverId !== recipient.id ? 'start' : 'end'
                                    }}
                                    key={index}
                                >
                                    <TextMessageContainer userMessage={userMessage} recipientId={recipient.id}/>
                                </Box>
                            ))
                        }
                    </Box>
                </CardContent>
                <CardActions>
                    <form onSubmit={handleSubmit} style={{width: '100%'}}>
                        <TextField sx={{width: 'inherit'}} value={text} onChange={(e) => setText(e.target.value)}/>
                    </form>
                </CardActions>
            </Card>
        </>
    )
}

export interface CreateUserMessageDto {
    receiverId: number;
    text: string;
}


function TextMessageContainer({userMessage, recipientId}: { userMessage: UserMessage, recipientId: number }) {
    const {theme} = useContext(ThemeContext);
    const isDarkMode = theme.palette.mode === 'dark';
    const isReceiver = userMessage.receiverId !== recipientId;
    const isEmoji = !containsEmoji(userMessage.message.text);
    const backgroundColor = isEmoji
        ? isDarkMode
            ? (isReceiver ? 'black' : '#3797f0')
            : (isReceiver ? '#efefef' : '#3797f0')
        : 'transparent';

    const color = isDarkMode
        ? (isReceiver ? 'white' : 'black')
        : (isReceiver ? 'black' : 'white');

    return (
        <>
            <Box style={{
                backgroundColor: backgroundColor,
                color: color,
                padding: !isEmoji ? '0' : isReceiver ? '5px 15px 5px 10px' : '5px 10px 5px 15px',
                borderRadius: !isEmoji ? '0' : isReceiver ? '4px 18px 18px 4px' : '18px 4px 4px 18px',
                fontSize: !isEmoji ? '50px' : 'inherit'
            }}>
                {userMessage.message.text}
            </Box>
        </>
    )
}