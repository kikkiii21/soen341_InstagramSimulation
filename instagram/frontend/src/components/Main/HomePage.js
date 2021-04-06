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

const homeStyles = makeStyles((theme) => ({
  contain: {
    position: "fixed",
  },
}));

const HomePage = () => {
  //state
  const { posts, setPosts } = useContext(PostsContext);
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const status = localStorage.getItem("userStatus");
  const [ProfileImage, setProfileImage] = useState();
  const [UserProfileImage, setUserProfileImage] = useState();
 const [userInfo, setUserInfo] = useState(
      JSON.parse(localStorage.getItem("userInfo"))
  );


   useEffect(() => {
     axios
         .get("profilePictureList/")
         .then((response) => {
           setProfileImage(response.data);
           localStorage.setItem("profileImages",JSON.stringify(response.data))
           console.log(response.data)
         })
         .catch((err) => {
           console.error(err);
         });
  }, []);

   useEffect(() => {
     axios.get("updatePhoto/",  {
       headers: {
         "content-type": "application/json",
         Authorization: `token ${userInfo.token
         }`,
       }
       })
         .then((response) => {
           setUserProfileImage(response.data);
           localStorage.setItem("userProfileImages",JSON.stringify(response.data))
           console.log(response.data)
         })
         .catch((err) => {
           console.error(err);
         });
  }, []);

    useEffect(() => {
        const newAvatar = {...userInfo}
        newAvatar.avatar = UserProfileImage
        localStorage.setItem("userInfo",JSON.stringify(newAvatar))
        }, [UserProfileImage]
    );


  const style = homeStyles();
  return (
    <>
      <Route>
        {!isLoggedIn && !JSON.parse(status) ? <Redirect to="/login" /> : ""}
      </Route>
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
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={10}>
              <CreatePost />
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
    </>
  );
};

export default HomePage;
