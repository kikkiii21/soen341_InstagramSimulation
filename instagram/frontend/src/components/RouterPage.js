import React, { useState, useEffect } from "react";
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
import { UserContext, UserStatusContext } from "./AppContext";
import { v4 as uid } from "uuid";
import {PostsContext} from './PostsContext'
import PostList from "./PostList";


const RouterPage = () => {
  // let postsArray = data();
  // let isWaiting = false;
  // while (isWaiting) {
  //   if(postsArray != null){
  //     isWaiting = false;
  //     console.log(postsArray);
  //   }
  //   continue;
  // }
  const [posts,setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [LoggedInUserInfo, setLoggedInUserInfo] = useState({name: "Arthur Morgan", avatar: "../../static/images/arthur.jpg", id: uid()});

  
  
  // Adding react Router in order to align the URL with the intended page/component
  // Make sure to start from most specific to least specific paths! 
  return(
    <Router>
      <Switch>
      <UserStatusContext.Provider value={{ isLoggedIn, setIsLoggedIn }}> 
        <UserContext.Provider value={{ LoggedInUserInfo, setLoggedInUserInfo }}>
          <PostsContext.Provider value={{ posts , setPosts }}>
            <Route path='/signup' component={Signup}></Route>
            <Route path='/signin' component={Login}></Route>
            <Route  path='/HomePage' component={HomePage}></Route>
            <Route  path='/pl' component={PostList}></Route>
            <Route exact path='/' component={HomePage}></Route>
          </PostsContext.Provider>
        </UserContext.Provider>
      </UserStatusContext.Provider>
      </Switch>
    </Router> 
  );    
};

  export default RouterPage;