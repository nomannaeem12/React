import {CredentialDto} from "../../authentication/pages/signIn/signIn.tsx";

const BASE_URL = 'http://localhost:3000';

export const SignInAPI = async (credentials: CredentialDto) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
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
