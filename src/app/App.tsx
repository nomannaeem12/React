import './App.css'
import {SignIn} from "./authentication/pages/signIn/signIn.tsx";
import {Route, Routes} from "react-router-dom";
import {Home} from "./home/home.tsx";
function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </>
  )
}

export default App
