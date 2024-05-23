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
import {ThemeProvider} from "./core/providers/themeProvider.tsx";
import {UserProfile} from "./home/pages/users/user-profile.tsx";
import {Inbox} from "./home/pages/messages/inbox.tsx";
import {Messages} from "./home/pages/messages/messages.tsx";

function App() {

    return (
        <>
            <ThemeProvider>
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
