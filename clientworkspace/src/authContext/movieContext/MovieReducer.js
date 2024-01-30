const MovieReducer = (state, action) => {
    switch (action.type) {
        case "GET_MOVIES_START":
            // write our state
            return {
                movies: [],
                //this decide when we are fetching any data from api or not
                isFetching: true,
                error: false
            };

        case "GET_MOVIES_SUCCESS":
            // write our state
            return {
                movies: action.payload,     //if we get successful data
                //this decide when we are fetching any data from api or not
                isFetching: false,
                error: false
            };

        case "GET_MOVIES_FAILURE":
            // write our state
            return {
                movies: [],
                //this decide when we are fetching any data from api or not
                isFetching: false,
                error: true
            };    

            case "DELETE_MOVIE_START":
            // write our state
            return {
                ...state,               //whatever movies are in current state
                isFetching: true,
                error: false
            };

        case "DELETE_MOVIE_SUCCESS":
            // if successfull we will delete the movie
            return {
                movies: state.movies.filter((movie)=>movie.id!==action.payload),     
                //if movie id is not equal to our id then it will stay in array, if eqalu it will remove
                isFetching: false,
                error: false
            };

        case "DELETE_MOVIE_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true
            };    
        default:
            return {...state};          //triple dots saves the values in array 
    }
};

export default MovieReducer;