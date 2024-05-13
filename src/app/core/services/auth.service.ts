import {CredentialInterface} from "../../authentication/pages/signIn.tsx";
import {environment} from "../../envirnment.ts";

export const SignInAPI = async (credentials: CredentialInterface) => {
    try {
        const response = await fetch(`${environment.baseurl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return await response.json();
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
