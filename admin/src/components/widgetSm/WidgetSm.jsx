import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {

  const [newUser, setNewUser] = useState([]);
  useEffect(()=>{
    const getNewUser = async ()=>{
      try {
        const res = await axios.get("/users?new=true", {
          //to check wheather user is authenticated or not
          headers: {
            token: ""+JSON.parse(localStorage.getItem("user")).accessToken
          }
        });
        setNewUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNewUser();
  },[]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        
        {/* fetching data & set it */}
        {newUser.map((user)=>(
          
        <li className="widgetSmListItem">
          <img
            // if there is no profile pic set default avatar
            src={user.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcnVxgB8tU7GZmy0vpNngTmMuzh-DdpHUH8B_bRFCKeNE03D365Uiw4nypfvA6w71a7sY&usqp=CAU"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
         ))}
      </ul>
    </div>
  );
}
