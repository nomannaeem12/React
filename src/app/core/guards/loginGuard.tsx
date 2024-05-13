import {Navigate} from "react-router-dom";
import {ReactNode} from "react";

export const LoginGuard = ({children}: { children: ReactNode }) => {
    const loggedInUser = localStorage.getItem('SignedIn');
    return loggedInUser ? <Navigate to="/home" replace/> : children;
};