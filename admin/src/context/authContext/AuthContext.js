import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    // if user is already login so we can fetch user data from local storage otherwise user is not login then its null
    user: JSON.parse(localStorage.getItem("user")) || null,
    //this decide when we are fetching any data from api or not
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    // we created this useEffect bcoz jb user login hoye ga to uske data local storage me save ho jaye taki jb tk user logout na kre or vo bage change kre to usko baar baar apne credentials nhi dalna pdhe
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));
    },[state.user]);

    return (
        // in this case {children} is our application ie. <App /> present in our index file
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    );
};