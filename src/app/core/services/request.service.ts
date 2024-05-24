import {environment} from "../../envirnment.ts";

export const createRequest = async <T>(url: string, method: string, body?: T) => {
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