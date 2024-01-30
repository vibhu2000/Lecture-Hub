import axios from "axios";
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions"

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

//create
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());       //dispatching our actions
    try {
      const res = await axios.post("/movies", movie, {
        headers: {
          token: "" + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(createMovieSuccess(res.data));
      alert("Video Added...");
    } catch (err) {
      dispatch(createMovieFailure());
      alert("Video already exist...");
    }
  };

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