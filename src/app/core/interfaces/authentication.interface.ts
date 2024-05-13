import {User} from "./user.ts";

interface SignInDTO {
    email: string;
    password: string;
}


export interface SignInResponse {
    access_token: string;
    user: User;
}

export default SignInDTO;