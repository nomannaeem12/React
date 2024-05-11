import {Navigate} from "react-router-dom";
import {ReactNode} from "react";

export const AuthGuard = ({children}: { children: ReactNode }) => {
    const loggedInUser = localStorage.getItem('SignedIn');
    return loggedInUser ? children : <Navigate to="/" replace/>;
};