import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../SharedComponents/Header";
import CreatePost from "../SharedComponents/CreatePost";
import Paper from "@material-ui/core/Paper";
import UserInfo from "../SharedComponents/UserInfo";
import PostList from "../SharedComponents/PostList";
import Hidden from "@material-ui/core/Hidden";
import { UserContext } from "../Context/AppContext";
import { PostsContext } from "../Context/PostsContext";
import { UserStatusContext } from "../Context/UserStatusContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";


const HomePage = () => {
  //state
  const { posts, setPosts } = useContext(PostsContext);
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const status = localStorage.getItem("userStatus");
  const [ProfileImage, setProfileImage] = useState();
  const [userList, setUserList] = useState(null);
  const [UserProfileImage, setUserProfileImage] = useState();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  let usersLocal = JSON.parse(localStorage.getItem("userList"));
  let imagesLocal = JSON.parse(localStorage.getItem("profileImages"));
  let infoLocal = JSON.parse(localStorage.getItem("userInfo"));
  let profileLocal = JSON.parse(localStorage.getItem("userProfileImages"));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    !isLoggedIn && !JSON.parse(status) ? (window.location = "/login") : "";
    axios
      .get("profilePictureList/")
      .then((response) => {
        setProfileImage(response.data);
        localStorage.setItem("profileImages", JSON.stringify(response.data));
        
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("updatePhoto/", {
        headers: {
          "content-type": "application/json",
          Authorization: `token ${userInfo.token}`,
        },
      })
      .then((response) => {
        setUserProfileImage(response.data.photo);
        localStorage.setItem(
          "userProfileImages",
          JSON.stringify(response.data.photo)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ProfileImage]);

  useEffect(() => {
    const newAvatar = { ...userInfo };
    newAvatar.avatar = UserProfileImage;
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo", JSON.stringify(newAvatar));
    setLoggedInUserInfo(newAvatar);
  }, [UserProfileImage]);

  useEffect(() => {
    (JSON.parse(localStorage.getItem("userList")) == null) &&
      axios
        .get("userlistEndpoint", {
          headers: {
            "content-type": "application/json",
            Authorization: `token ${userInfo.token}`,
          },
        })
        .then((response) => {
          localStorage.setItem("userList", JSON.stringify(response.data));
         
          userList == null ? setUserList(response.data) : "";
        })
        .catch((err) => {
          console.error(err);
        });
    if (
      imagesLocal != null &&
      profileLocal != null &&
      infoLocal != null &&
      usersLocal != null
    ) {
      setReady(true);
    }
  }, [LoggedInUserInfo, UserProfileImage, userList]);

  return (
    <>
      <Route>
        {!isLoggedIn && !JSON.parse(status) ? <Redirect to="/login" /> : ""}
      </Route>

      {!ready ? (
        <div>Loading ....</div>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <Header />
            </Paper>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12} md={8}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} md={10}>
                {JSON.parse(status) && <CreatePost />}
              </Grid>
              <Grid item xs={12} md={10}>
                <PostList />
              </Grid>
            </Grid>
          </Grid>
          <Hidden only={["sm", "xs"]}>
            <Grid item xs={4}>
              <UserInfo />
            </Grid>
          </Hidden>
        </Grid>
      )}
    </>
  );
};

export default HomePage;
