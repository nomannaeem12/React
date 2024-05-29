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
    // response
    messageId: number;
    senderId: number;
    receiverId: number;
    isEdited: boolean;
    message: Message;
    sender: User;
    receiver: User;

    // additional
    isEditMessage: boolean;
}

export interface Message extends BasicEntity {
    text: string;
}