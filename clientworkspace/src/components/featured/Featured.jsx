import { InfoOutlined, PlayArrow } from "@material-ui/icons"
import axios from "axios";
import { useEffect, useState } from "react"
import "./featured.scss"


export default function Featured({type, setGenre}) {
    const [content, setContent] = useState({});

    useEffect(()=>{
        const getRandomContent = async ()=>{
            try {
                const res = await axios.get(`/movies/random?type=${type}` , {
                    //to check wheather user is authenticated or not
                    headers: {
                      token: ""+JSON.parse(localStorage.getItem("user")).accessToken
                    }
                  });
                //   [0] we use this bcoz our random api returns an array not the object thats why we are fetching data from 0th index
                setContent(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getRandomContent();
    },[type]);

    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type==="practical"? "Practical":"Theory"}</span>
                    <select name="subjects" id="subjects" onChange={e=>setGenre(e.target.value)}>
                        <option>Subjects</option>
                        <option value="OS">OS</option>
                        <option value="CN">CN</option>
                        <option value="DBMS">DBMS</option>
                        <option value="JAVA">JAVA</option>
                        <option value="DS">DS</option>
                    </select>
                </div>
            )}
            <img src={content.img} alt="" />

            <div className="info">
                <img src={content.imgTitle} alt="" />
                <span className="desc" >
                {content.desc}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>More Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
