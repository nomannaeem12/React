import {BasicEntity} from "./basic-entity.interface.ts";

export interface User extends BasicEntity {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    resetToken: string;
    resetTokenExpiration: Date;
    inbox: UserMessage[];
    outbox: UserMessage[];
}

export interface UserMessage extends BasicEntity {
    messageId: number;
    senderId: number;
    receiverId: number;
    message: Message;
    sender: User;
    receiver: User;
}

export interface Message extends BasicEntity {
    message: text;
}