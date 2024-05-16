import {User} from "./user.ts";

export interface SignInDTO {
    email: string;
    password: string;
}


export interface SignIn {
    access_token: string;
    user: User;
}
