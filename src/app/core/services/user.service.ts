import {SignInResponse} from "../interfaces/authentication.interface.ts";
import {createRequest} from "./request.service.ts";
import {User} from "../interfaces/user.ts";

export function setSignedInUser(response: SignInResponse) {
    localStorage.setItem('SignedIn', JSON.stringify(response));
}

export const getUsers = async () => {
    const request = createRequest('/users', 'GET');
    try {
        const response = await request;
        if (response.status === 401) {
            localStorage.removeItem('SignedIn');
            window.location.href = '/';
        }
        return await response.json();
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}

export const addUser = async (body: Partial<User>) => {
    const request = createRequest('/auth/register', 'POST',body);
    try {
        const response = await request;
        if (response.status === 401) {
            localStorage.removeItem('SignedIn');
            window.location.href = '/';
        }
        return await response.json();
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}
