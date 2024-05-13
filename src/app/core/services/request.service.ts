import {environment} from "../../envirnment.ts";
import SignInDTO from "../interfaces/authentication.interface.ts";

export const createRequest = async (url: string, method: string, body?: SignInDTO) => {
    const URL = `${environment.baseurl}${url}`;
    return fetch(URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
};

const getToken = () => {
    return JSON.parse(localStorage.getItem('SignedIn')!).access_token;
}