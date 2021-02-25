import React, {useContext, useState, useEffect} from 'react';
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import '../../static/css/header.css';
import profileImage from '../../static/images/profile.png';
import homeImage from '../../static/images/home.png';
import settingsImage from '../../static/images/settings.png';
import {UserStatusContext} from './UserStatusContext';
import {UserContext} from './AppContext';
import axios from 'axios';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';





const Navbar = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(UserStatusContext);
  const {LoggedInUserInfo, setLoggedInUserInfo} = useContext(UserContext);
  const localUserInfo = localStorage.getItem("userInfo");
  const localUserStatus= localStorage.getItem("userStatus");
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  
  const Logout = () => {
    axios.post("/logout","" ,{
      headers: {
        'Authorization' : `token ${(LoggedInUserInfo.token || JSON.parse(localUserInfo).token)}`
      }
    })
    .then(res => {
      setIsLoggedIn(false);
      setIsLoggedOut(true);
        localStorage.setItem("userStatus", "false");
    })
    .catch(err => 
      (err.response.status == 204)? localStorage.setItem("userStatus", "false"): ""
      )};

  



    return ( 
    <div>
     {/* <Route >
        {(isLoggedOut) ? <Redirect to="/signin" /> : ""}
      </Route> */}
      <Nav >
      <NavLink to = '/' className="position-fix" >
        <a className="Nav-brand-logo" href="/">
          Instagram
        </a>
      </NavLink >
        <div className="top-bar">
      <NavMenu >
        <NavLink to = '/home' activeStyle> <img src={profileImage} className="nav-images"></img> </NavLink>
        <NavLink to = '/settings' activeStyle ><img src={homeImage} className="nav-images"></img>  </NavLink>
        <NavLink to = '/profile' activeStyle ><img src={settingsImage} className="nav-images"></img> </NavLink>
      </NavMenu >
      </div>
        
      <NavBtn >
        <NavBtnLink to= '/signin' onClick={Logout} > Logout </NavBtnLink> 
      </NavBtn >
          
      </Nav> 
    </div>
    )
}

export default Navbar