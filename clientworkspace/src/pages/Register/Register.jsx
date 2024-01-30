import "./Register.scss";
import Logo from './logo.jpg';
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate();
    
    const emailRef=useRef()
    const usernameRef=useRef()
    const passwordRef=useRef()

    const handleStart = ()=>{
        setEmail(emailRef.current.value);
    };
    const handleFinish = async (e)=>{
        e.preventDefault();
        setUsername(usernameRef.current.value);
        setPassword(passwordRef.current.value);
        try{
            await axios.post("auth/Register", {email,username,password} );
            navigate("/login");
            alert("Account Successfully Created...")
        }catch(err){
            alert("Email ID/Username already exist...")
        }
    };
    // const handleSignin = ()=>{
    //     navigate("/login");
    // };

    return(
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src={Logo} alt="" />
                    {/* <button className="loginButton" onClick={handleSignin}>Sign In</button> */}
                </div>
            </div>
            <div className="container">
                <h1>EXPLORE WHAT YOU WANT !</h1>
                <h2>Gather to learn. Learn anytime.</h2>
                <p>
                    Ready to learn? Enter your email to create or restart your account.
                </p>
                {
                    !email ? (
                        <div className="input">
                        <input type="email" placeholder="Email Address" ref={emailRef}/>
                        <button className="registerButton" onClick={handleStart}>Get Started</button>
                        </div>
                    ) : (
                        <form className="input">
                        <input type="username" placeholder="Username" ref={usernameRef}/>
                        <input type="password" placeholder="Password" ref={passwordRef}/>
                        <button className="registerButton" onClick={handleFinish}>Start</button>
                        </form>   
                    )
                }
                <span style={{padding: "10px"}}>
                <span stylr={{fontSize: "20px"}}>Already account?</span>
                <Link style={{color: "red", fontStyle: "italic"}} className="link" to="/login" >  Sign in</Link>

                </span>
            </div>
        </div>
    );

}