import {SignIn} from "../interfaces/authentication.interface.ts";
import {createRequest} from "./request.service.ts";
import {User} from "../interfaces/user.ts";
import {UsersFilterDto} from "../../home/pages/messages/components/recipientSelectionDialog.tsx";

interface UsersService {
    getUsers: () => Promise<User[]>;
    addUser: (user: Partial<User>) => Promise<User>;
    filter: (searchText: UsersFilterDto) => Promise<User[]>;
    getUserById: (id: number) => Promise<User>;
}

export function setSignedInUser(response: SignIn) {
    localStorage.setItem('SignedIn', JSON.stringify(response));
}

export function getSignedInUser() {
    const signedIn = localStorage.getItem('SignedIn');
    return signedIn ? JSON.parse(signedIn).user : null;
}

export const getUsers = async (): Promise<User[]> => {
    const request = createRequest('/users', 'GET');
    const response = await request;
    if (!response.ok) {
        handleAuthenticationError(response);
        throw new Error((await response.json()).error);
    }
    return await response.json();
}

export const getUserById = async (id: number): Promise<User> => {
    const request = createRequest(`/users/${id}`, 'GET');
    const response = await request;
    if (!response.ok) {
        handleAuthenticationError(response);
    }
    return await response.json();
}

export const addUser = async (body: Partial<User>): Promise<User> => {
    const request = createRequest('/auth/register', 'POST', body);
    const response = await request;
    if (!response.ok) {
        handleAuthenticationError(response);
        throw new Error((await response.json()).error);
    }
    return await response.json();
}

export const filter = async (body: UsersFilterDto): Promise<User[]> => {
    const request = createRequest('/users/filter', 'POST', body);
    const response = await request;
    if (!response.ok) {
        handleAuthenticationError(response);
        throw new Error((await response.json()).error);
    }
    return await response.json();
}

const handleAuthenticationError = (response: Response) => {
    if (response.status === 401) {
        localStorage.removeItem('SignedIn');
        window.location.href = '/';
        throw new Error('Authentication error');
    }
    return response;
};

const usersService: UsersService = {
    getUsers,
    addUser,
    filter,
    getUserById,
}

export default usersService;