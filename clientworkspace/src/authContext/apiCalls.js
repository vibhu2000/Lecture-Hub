import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout } from "./AuthActions";

//  user -> login credentials ie. email and password
export const login = async (user, dispatch) => {
    dispatch(loginStart());

    // we send login credentials using api
    try {
        const res = await axios.post("auth/login", user);
        
        // if user is admin and has successfuly login 
        dispatch(loginSuccess(res.data))
        
    } catch (error) {
        dispatch(loginFailure());
        alert("Invalid Username or Password...")
    }
};

export const logouts = async (user, dispatch) => {
    dispatch(logout());
};