import {environment} from "../../envirnment.ts";
import {SignInDTO} from "../interfaces/authentication.interface.ts";
import {User} from "../interfaces/user.ts";
import {UsersFilterDto} from "../../home/pages/messages/components/recipientSelectionDialog.tsx";

export const createRequest = async (url: string, method: string, body?: SignInDTO | Partial<User> | UsersFilterDto) => {
    const URL = `${environment.baseurl}${url}`;
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(URL, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    });
};

const getToken = () => {
    const signedIn = localStorage.getItem('SignedIn');
    return signedIn ? JSON.parse(signedIn).access_token : null;
}