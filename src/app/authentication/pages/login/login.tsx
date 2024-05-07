import './login.css'
import {useState} from "react";
import vfs_logo from '../../../../assets/VFS_logo.png';
function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passworda, setPassworda] = useState([]);
    function handleLogin(){
        alert(`Login with email ${email}`);
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <img src={vfs_logo} alt="logo" className="logo"/>
                    <div className="form-container">
                        <input className="input-field" type={"email"} placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                        <input className="input-field" type={"password"} placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                        <div className="button-container">
                            <span className="forgot-password-link">Forgot password?</span>
                            <button onClick={handleLogin} className="login-button">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export {Login};