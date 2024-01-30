import "./Login.scss";
import Capture from "./Capture.jpg";
import { useContext, useState } from "react";
import {login} from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";

export default function Login(props) {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {dispatch}=useContext(AuthContext);

    const handleLogin=(e)=>{
        e.preventDefault()
        login({email,password}, dispatch)
    }
    return(
        <div className="login">
            <div className="container">
                <form>
                    <img src={Capture} alt=""></img>
                    <h1>SIGN IN</h1>
                    <input type="email" placeholder="Email or Phone Number" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="loginButton" onClick={handleLogin}>Sign In</button>
                    <span>
                        New to Streaming Spark? 
                        <Link to="/register" className="link" style={{color: "red", fontStyle: "italic"}}>  Sign up now.</Link>
                    </span>
                </form>               
            </div>
        </div>
    );

}