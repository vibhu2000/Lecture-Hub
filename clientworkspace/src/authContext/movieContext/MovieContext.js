import MovieReducer from "./MovieReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    // if user is already login so we can fetch user data from local storage otherwise user is not login then its null
    movies:[],
    //this decide when we are fetching any data from api or not
    isFetching: false,
    error: false
};

export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);
    return (
        // in this case {children} is our application ie. <App /> present in our index file
        <MovieContext.Provider
            value={{
                movies: state.movies,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </MovieContext.Provider>
    );
};