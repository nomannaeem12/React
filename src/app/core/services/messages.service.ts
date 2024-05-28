import {createRequest} from "./request.service.ts";
import {UserMessage} from "../interfaces/user.ts";
import {CreateUserMessageDto, UserMessageDto} from "../../home/pages/messages/chatterbox.tsx";

interface MessagesService {
    getMessages: (userMessageDto: UserMessageDto) => Promise<{ inbox: [], outbox: [] }>;
    sendMessage: (createUserMessageDto: CreateUserMessageDto) => Promise<UserMessage>;
}

export const getMessages = async (userMessageDto: UserMessageDto): Promise<{ inbox: [], outbox: [] }> => {
    const request = createRequest(`/user-message/filteredUserMessages`, 'POST', userMessageDto);
    const response = await request;
    if (!response.ok) {
        handleAuthenticationError(response);
        throw new Error((await response.json()).error);
    }
    return await response.json();
}

export const sendMessage = async (createUserMessageDto: CreateUserMessageDto): Promise<UserMessage> => {
    const request = createRequest('/user-message', 'POST', createUserMessageDto);
    const response = await request;
    if (!response.ok) {
        handleAuthenticationError(response);
        throw new Error((await response.json()).error);
    }
    return await response.json();
}

const handleAuthenticationError = (response: Response) => {
    if (response.status === 401) {
        localStorage.removeItem('SignedIn');
        window.location.href = '/';
        throw new Error('Authentication error');
    }
    return response;
};

const MessagesService: MessagesService = {
    getMessages,
    sendMessage
}

export default MessagesService;