import {environment} from "../../envirnment.ts";
import SignInDTO from "../interfaces/authentication.interface.ts";

export const createRequest = async (url: string, method: string, body?: SignInDTO) => {
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