import React, { useState, useEffect, useMemo } from "react";
import Signup from "./SignUp";
import Login from "./Login";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { UserContext } from "./AppContext";
import { v4 as uid } from "uuid";
import { PostsContext } from "./PostsContext";
import PostList from "./PostList";
import { UserStatusContext } from "./UserStatusContext";

const RouterPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoggedInUserInfo, setLoggedInUserInfo] = useState({
    name: "Arthur Morgan",
    avatar: "../../static/images/arthur.jpg",

    id: uid(),
  });
  const userInfo = useMemo(() => ({ LoggedInUserInfo, setLoggedInUserInfo }), [
    LoggedInUserInfo,
    setLoggedInUserInfo,
  ]);
  const statusInfo = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [
    isLoggedIn,
    setIsLoggedIn,
  ]);

  // Adding react Router in order to align the URL with the intended page/component
  return (
    <Router>
      <Switch>
        <UserStatusContext.Provider value={statusInfo}>
          <UserContext.Provider value={userInfo}>
            <PostsContext.Provider value={{ posts, setPosts }}>
              <Route path="/signup" component={Signup}></Route>
              <Route path="/signin" component={Login}></Route>
              <Route path="/homepage" component={HomePage}></Route>
              <Route exact path="/" component={HomePage}></Route>
            </PostsContext.Provider>
          </UserContext.Provider>
        </UserStatusContext.Provider>
      </Switch>
    </Router>
  );
};

export default RouterPage;
