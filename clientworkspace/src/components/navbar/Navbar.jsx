//rafce
import React, { useContext,useState } from 'react'
import "./navbar.scss"
import profile from "../navbar/profile.jpg"
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons'
import Capture from './Capture1.jpg';
import { Link } from "react-router-dom"
import { AuthContext } from "../../authContext/AuthContext"
import { logout } from '../../authContext/AuthActions'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {dispatch}=useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src={Capture} alt="" />
          <Link to="/" className='link'>
            <span>HomePage</span>
          </Link>
          <Link to="/topic" className='link'>
            <span className='navbarmainlinks'>Theory</span>
          </Link>
          <Link to="/unit" className='link'>
            <span className='navbarmainlinks'>Practical</span>
          </Link>
          <span>New & Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className='icon' />
          <span>USER</span>
          <Notifications className='icon' />
          <img src={profile} alt="" />
          <div className="profile">
            <ArrowDropDown className='icon' />
            <div className="options">
              <span>Settings</span>
              <span onClick={()=> dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
