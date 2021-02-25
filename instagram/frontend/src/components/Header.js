import React from "react";
import "../../static/css/header.css"
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Subscribed from './pages/subscribed';
import Myprofile from './pages/myprofile';
import Account from './pages/account';


const Header = () => {
    return(
 
      <div>
        
        <Navbar / >
        <switch>
        <Route path = '/subscribed' component = { Subscribed } />
        <Route path = '/myprofile' component = { Myprofile }/>
        <Route path = '/account' component = { Account }/>
        </switch>
         </div >
                
                 
    );
}

export default Header;
