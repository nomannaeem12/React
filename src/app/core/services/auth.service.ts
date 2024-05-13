import {createRequest} from "./request.service.ts";
import SignInDTO from "../interfaces/authentication.interface.ts";

export const SignInAPI = async (credentials: SignInDTO) => {
    return createRequest('/auth/login', 'POST', credentials);
};
