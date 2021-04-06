import React, { useState, useEffect, useMemo } from "react";
import Signup from "./SignUp";
import Login from "./Login";
import HomePage from "./HomePage";
import FollowHomePage from "./FollowHomepage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { UserContext } from "../Context/AppContext";
import { v4 as uid } from "uuid";
import { PostsContext } from "../Context/PostsContext";
import { UserStatusContext } from "../Context/UserStatusContext";
import { CommentsContext } from "../Context/CommentsContext";
import Profile from "./Profile";
import Settings from "./Settings";
import UserInfo from "../SharedComponents/UserInfo";

const RouterPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoggedInUserInfo, setLoggedInUserInfo] = useState({
    name: "ProfilePic",
    avatar: UserInfo.avatar,
    id: uid(),
  });
  const [comment, setComment] = useState([]);
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
              <CommentsContext.Provider value={{ comment, setComment }}>
                <Route path="/register" component={Signup}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/homepage" component={HomePage}></Route>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/following" component={FollowHomePage}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/settings" component={Settings}></Route>
              </CommentsContext.Provider>
            </PostsContext.Provider>
          </UserContext.Provider>
        </UserStatusContext.Provider>
      </Switch>
    </Router>
  );
};

export default RouterPage;
