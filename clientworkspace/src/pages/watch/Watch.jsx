import { ArrowBackOutlined } from "@material-ui/icons"
import { Link, useLocation } from "react-router-dom";
import "./watch.scss"


export default function Watch() {

    const location = useLocation();
    const movie = location.search;
    // console.log(movie);
    const movies=movie.replace("?","");
  console.log(movies)
    
    return (
        <div className="watch">
            <Link to= "/"> 
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>
            </Link>
            <video
                className="video"
                autoPlay
                progress="true"
                controls
                src={movies}/>
        </div>
    )
}

