import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logouts } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Topbar() {

  const { isFetching, dispatch } = useContext(AuthContext);
  const user = localStorage.getItem("user");
  const handleLogout = (e) => {
    // by default when we click on button this will refresh the page we dont want to refresh it so thats why we use this
    e.preventDefault();
    logouts(user, dispatch);
};

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lecture-hub</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <LogoutRoundedIcon onClick={handleLogout} />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
