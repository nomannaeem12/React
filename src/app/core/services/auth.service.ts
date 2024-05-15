import {createRequest} from "./request.service.ts";
import {SignInDTO} from "../interfaces/authentication.interface.ts";

export const SignInAPI = async (credentials: SignInDTO) => {
    const request = createRequest('/auth/login', 'POST', credentials);
    try {
        const response = await request;
        return await response.json();
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
