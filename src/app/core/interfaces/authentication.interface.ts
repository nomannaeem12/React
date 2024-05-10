import {UserInterface} from "./user.interface.ts";

export interface CredentialInterface {
    email: string;
    password: string;
}


export interface SignInResponse {
    access_token: string;
    user: UserInterface;
}