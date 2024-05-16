import {SignInResponse} from "../interfaces/authentication.interface.ts";
import {createRequest} from "./request.service.ts";
import {User} from "../interfaces/user.ts";

interface UserService {
    getUsers: () => Promise<User[]>;
    addUser: (user: Partial<User>) => Promise<User>;
}

export function setSignedInUser(response: SignInResponse) {
    localStorage.setItem('SignedIn', JSON.stringify(response));
}

export const getUsers = async () => {
    const request = createRequest('/users', 'GET');
    const response = await request;
    const jsonResponse = await response.json();
    if (!response.ok) {
        handleAuthenticationError(response);
        throw new Error(jsonResponse.error);
    }
    return jsonResponse;
}

export const addUser = async (body: Partial<User>) => {
    const request = createRequest('/auth/register', 'POST', body);
    const response = await request;
    const jsonResponse = await response.json();
    if (!response.ok) {
        handleAuthenticationError(response);
        throw new Error(jsonResponse.error);
    }
    return jsonResponse;
}

const handleAuthenticationError = (response: Response) => {
    if (response.status === 401) {
        localStorage.removeItem('SignedIn');
        window.location.href = '/';
        throw new Error('Authentication error');
    }
    return response;
};

const userService: UserService = {
    getUsers,
    addUser
}

export default userService;