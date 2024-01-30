// rfc
import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from "@material-ui/icons"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useState } from "react"
import "./listItem.scss"

export default function ListItem({ index , item }) {

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(()=>{
    const getMovie = async()=>{
      try {
        const res = await axios.get("/movies/find/"+item, {
          //to check wheather user is authenticated or not
          headers: {
            token: ""+JSON.parse(localStorage.getItem("user")).accessToken
          }
        });
        setMovie(res.data);

      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
    //when we change iten above function will run
  },[item])


  return (
    //here we created and object using {{}}
    <Link to={{pathname:"/watch", search: movie.video}}>
    <div className="listItem" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}>
      <img src={movie.img} alt="" />

      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />

          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon"/>
              <Add className="icon"/>
              <ThumbUpAltOutlined className="icon"/>
              <ThumbDownOutlined className="icon"/>
            </div>
            <div className="itemInfoTop">
              <span>{movie.title}</span>
              <span>{movie.duration}</span>
              {/* <span className="limit">+{movie.limit}</span> */}
              <span className="limit">{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
        </div>
        </Link>
  )
}
