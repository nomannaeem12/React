import axios from 'axios';
import {CredentialDto} from "../pages/signIn/signIn.tsx";

const BASE_URL = 'http://localhost:3000';

export const SignInAPI = async (credentials: CredentialDto) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`,credentials);
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error fetching users:', error);
        throw error;
    }
};

