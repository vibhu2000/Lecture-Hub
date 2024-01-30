import axios from "axios";
import { deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions"

export const getMovies = async(dispatch)=>{
    dispatch(getMoviesStart());
    try{
        const res= await axios.get("/movies",       //getting access token
        {
            headers:{token:""+JSON.parse(localStorage.getItem("user")).accessToken},
        });
        dispatch(getMoviesSuccess(res.data));
    }
    catch(err){
        dispatch(getMoviesFailure());
    }
}

//delete
export const deleteMovie = async(id, dispatch)=>{
    dispatch(deleteMovieStart());
    try{
        await axios.delete("/movies/"+id,       //getting access token
        {
            headers:{token:""+JSON.parse(localStorage.getItem("user")).accessToken},
        });
        dispatch(deleteMovieSuccess(id));
    }
    catch(err){
        dispatch(deleteMovieFailure());
    }
}