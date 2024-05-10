import {SignInResponse} from "../interfaces/authentication.interface.ts";

export function setSignedInUser(response: SignInResponse){
    localStorage.setItem('SignedIn', JSON.stringify(response));
}