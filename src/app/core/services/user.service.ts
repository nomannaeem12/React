import {SignInResponse} from "../interfaces/authentication.interface.ts";
import {environment} from "../../envirnment.ts";
import {User} from "../interfaces/user.ts";

export function setSignedInUser(response: SignInResponse){
    localStorage.setItem('SignedIn', JSON.stringify(response));
}

export const getUsersAPI = async () => {
    try {
        const response = await fetch(`${environment.baseurl}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SignedInToken(),
            },
        });
        return await response.json().then((users) => users.filter((user: User) => user.email !== 'system.vfs@gmail.com'));
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}

export const SignedInToken = () => {
    return JSON.parse(localStorage.getItem('SignedIn')!).access_token;
}