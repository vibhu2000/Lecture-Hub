// rfc
import React, { useContext, useState } from 'react'
import "./login.css"
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from '../../context/authContext/apiCalls';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        // by default when we click on button this will refresh the page we dont want to refresh it so thats why we use this
        e.preventDefault();
        login({ email, password }, dispatch);
    };

    return (
        <div className='login'>
            <form className="loginForm">
                <input
                    type="text"
                    placeholder='email'
                    className="loginInput"
                    onChange={(e) => setEmail(e.target.value)} />

                <input
                    type="password"
                    placeholder='password'
                    className="loginInput"
                    onChange={(e) => setPassword(e.target.value)} />

                <button
                    className='loginButton'
                    onClick={handleLogin}
                    disabled={isFetching}>
                    Login
                </button>
            </form>
        </div>
    )
}
