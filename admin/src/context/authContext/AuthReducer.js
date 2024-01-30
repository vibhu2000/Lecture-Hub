const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            // write our state
            return {
                user: null,
                //this decide when we are fetching any data from api or not
                isFetching: true,
                error: false
            };

        case "LOGIN_SUCCESS":
            // write our state
            return {
                user: action.payload,
                //this decide when we are fetching any data from api or not
                isFetching: false,
                error: false
            };

        case "LOGIN_FAILURE":
            // write our state
            return {
                user: null,
                //this decide when we are fetching any data from api or not
                isFetching: false,
                error: true
            };
        
        case "LOGOUT":
            // write our state
            return {
                user: null,
                //this decide when we are fetching any data from api or not
                isFetching: false,
                error: false
            };
        
        default:
            return {...state};
    }
};

export default AuthReducer;