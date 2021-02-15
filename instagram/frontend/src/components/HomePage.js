import React, { Component } from "react";
import Signup from "./SignUp";
import Login from "./Login";
import LandingPage from "./LandingPage";
import {
  
BrowserRouter as Router,
Switch,
Route,
Link,
Redirect
} from 'react-router-dom';

const HomePage = () => {
  // Adding react Router in order to align the URL with the intended page/component
  // Make sure to start from most specific to least specific paths! 
  return(
    <Router>
      <Switch> 
        <Route path='/signup' component={Signup}></Route>
        <Route path='/login' component={Login}></Route>
        <Route exact path='/' component={LandingPage}></Route>
      </Switch>
    </Router> 
  );    
};

  export default HomePage;