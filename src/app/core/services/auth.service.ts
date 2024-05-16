import {createRequest} from "./request.service.ts";
import {SignIn, SignInDTO} from "../interfaces/authentication.interface.ts";

interface AuthenticationService {
    signIn: (credentials: SignInDTO) => Promise<SignIn>;
}

const signIn = async (credentials: SignInDTO): Promise<SignIn> => {
    const request = createRequest('/auth/login', 'POST', credentials);
    const response = await request;
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }
    return await response.json();
};


const authenticationService: AuthenticationService = {
    signIn
}

export default authenticationService;