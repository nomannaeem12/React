import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home} from "./home/layout/home.tsx";
import {Authentication} from "./authentication/layout/authentication.tsx";
import {SignIn} from "./authentication/pages/signIn.tsx";
import {SignUp} from "./authentication/pages/signUp.tsx";
import {AuthGuard} from "./core/guards/authGuard.tsx";
import {LoginGuard} from "./core/guards/loginGuard.tsx";
import {Users} from "./home/pages/users/users.tsx";
import {NotFound} from "./shared/pages/notFound.tsx";
import {ThemeContext} from "./core/providers/customThemeProvider.tsx";
import {UserProfile} from "./home/pages/users/user-profile.tsx";
import {Inbox} from "./home/pages/messages/inbox.tsx";
import {Messages} from "./home/pages/messages/messages.tsx";
import {Chatterbox} from "./home/pages/messages/chatterbox.tsx";
import {useContext} from "react";
import {ThemeProvider} from "@mui/material/styles";

function App() {
    const {theme} = useContext(ThemeContext);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="" element={<LoginGuard><Authentication/></LoginGuard>}>
                        <Route index element={<SignIn/>}/>
                        <Route path="sign-up" element={<SignUp/>}/>
                    </Route>
                    <Route path="home" element={<AuthGuard><Home/></AuthGuard>}>
                        <Route path="users">
                            <Route index element={<Users/>}/>
                            <Route path=":id" element={<UserProfile/>}/>
                        </Route>
                        <Route path="messages">
                            <Route index element={<Messages/>}/>
                            <Route path="chatterbox/:recipientId" element={<Chatterbox/>}/>
                            <Route element={<Inbox/>}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </ThemeProvider>
        </>
    )
}

export default App
