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
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
            const messages = [...response.inbox, ...response.outbox];
            messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setUserMessages(messages);
        })
    }, [recipientId]);

    function handleSubmit() {
        const payload: CreateUserMessageDto = {text: text, receiverId: +recipientId!};
        userService.sendMessage(payload).then((response) => {
            console.log(response)
        })
    }

    return (
        recipient && <>
            <Card sx={{height: '100%', width: '800px'}}>
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
                <CardContent sx={{height: '80%', overflow: 'auto'}}>
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
                            userMessages && userMessages.map((userMessage) => (
                                <Box
                                    sx={{
                                        mb: '3px',
                                        display: 'flex',
                                        justifyContent: userMessage.receiverId !== recipient.id ? 'start' : 'end'
                                    }}
                                    key={userMessage.id}
                                >

                                    <Box sx={{
                                        backgroundColor: userMessage.receiverId !== recipient.id ? 'black' : '#3797f0',
                                        padding: '5px 10px',
                                        borderRadius: '40px'
                                    }}>
                                        {userMessage.message.text}
                                    </Box>

                                </Box>
                            ))
                        }
                    </Box>
                </CardContent>
                <CardActions sx={{height: '10%'}}>
                    <TextField variant='outlined' size='medium' sx={{width: '100%'}}
                               InputProps={{
                                   endAdornment: <ArrowForwardIosSharpIcon onClick={handleSubmit}/>,
                               }}
                               onChange={(event) => setText(event.target.value)}
                    />
                </CardActions>
            </Card>
        </>
    )
}

export interface CreateUserMessageDto {
    receiverId: number;
    text: string;
}
