import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../SharedComponents/Header";
import Paper from "@material-ui/core/Paper";
import UserInfo from "../SharedComponents/UserInfo";
import FollowList from "../SharedComponents/FollowList";
import Hidden from "@material-ui/core/Hidden";
import { UserContext } from "../Context/AppContext";
import { PostsContext } from "../Context/PostsContext";
import { UserStatusContext } from "../Context/UserStatusContext";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const FollowHomePage = () => {
  //state
  const { posts, setPosts } = useContext(PostsContext);
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const status = localStorage.getItem("userStatus");

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
        <Grid item sm={12} md={8}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={10}>
              <FollowList />
            </Grid>
          </Grid>
        </Grid>
        <Hidden only={["sm", "xs"]}>
          <Grid item md={4}>
            <UserInfo />
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default FollowHomePage;
