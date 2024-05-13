import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home} from "./home/layout/home.tsx";
import {Authentication} from "./authentication/layout/authentication.tsx";
import {SignIn} from "./authentication/pages/signIn.tsx";
import {SignUp} from "./authentication/pages/signUp.tsx";
import {AuthGuard} from "./core/guards/authGuard.tsx";
import {LoginGuard} from "./core/guards/loginGuard.tsx";
import {Users} from "./home/pages/users/users.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="" element={<LoginGuard><Authentication/></LoginGuard>}>
                    <Route index element={<SignIn/>}/>
                    <Route path="sign-up" element={<SignUp/>}/>
                </Route>
                <Route path="home" element={<AuthGuard><Home/></AuthGuard>}>
                    <Route path="users" element={<Users/>}/>
                </Route>
                <Route path="*" element={<p>Not Found</p>}/>
            </Routes>
        </>
    )
}

export default App
