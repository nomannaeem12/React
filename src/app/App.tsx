import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home} from "./home/layout/home.tsx";
import {Authentication} from "./authentication/layout/authentication.tsx";
import {SignIn} from "./authentication/pages/signIn.tsx";
import {SignUp} from "./authentication/pages/signUp.tsx";
function App() {
  return (
    <>
        <Routes>
            <Route path="" element={<Authentication />}>
                <Route index element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
            </Route>
            <Route path="home" element={<Home />} />
        </Routes>
    </>
  )
}

export default App
