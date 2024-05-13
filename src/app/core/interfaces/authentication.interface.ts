import {User} from "./user.ts";

export interface CredentialInterface {
    email: string;
    password: string;
}


export interface SignInResponse {
    access_token: string;
    user: User;
}