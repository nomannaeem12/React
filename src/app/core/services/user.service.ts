import {SignInResponse} from "../interfaces/authentication.interface.ts";
import {createRequest} from "./request.service.ts";

export function setSignedInUser(response: SignInResponse) {
    localStorage.setItem('SignedIn', JSON.stringify(response));
}

export const getUsersAPI = async () => {
    const request = createRequest('/users', 'GET');
    try {
        const response = await request;
        return await response.json();
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}
