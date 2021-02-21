import React, { Component } from "react";
import Signup from "./SignUp";
import Login from "./Login";
import HomePage from "./HomePage";
import {
  
BrowserRouter as Router,
Switch,
Route,
Link,
Redirect
} from 'react-router-dom';


const RouterPage = () => {
  // Adding react Router in order to align the URL with the intended page/component
  // Make sure to start from most specific to least specific paths! 
  return(
    <Router>
      <Switch> 
        <Route path='/signup' component={Signup}></Route>
        <Route path='/signin' component={Login}></Route>
        <Route  path='/HomePage' component={HomePage}></Route>
        <Route exact path='/' component={HomePage}></Route>
      </Switch>
    </Router> 
  );    
};

  export default RouterPage;