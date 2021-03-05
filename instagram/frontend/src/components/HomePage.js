import React,{ useState, useContext,useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import { Container, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header";
import CreatePost from "./CreatePost";
import Paper from "@material-ui/core/Paper";
import UserInfo from "./UserInfo";
import PostList from "./PostList";
import Hidden from '@material-ui/core/Hidden';
import { v4 as uid } from "uuid";
import { UserContext } from "./AppContext";
import {PostsContext} from './PostsContext'
import axios from 'axios';
import {UserStatusContext} from './UserStatusContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  } from 'react-router-dom';


const homeStyles = makeStyles((theme) => ({
  contain: {
    position: 'fixed',
  },
}));


const HomePage = () => {

    //state 
    const {posts,setPosts} = useContext(PostsContext);
    const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
    const status = localStorage.getItem("userStatus")
    
  const style = homeStyles();
  return(
    <>
      <Route >
        {(!isLoggedIn && !JSON.parse(status)) ? <Redirect to="/signin" /> : ""}
      </Route>
    <Grid container spacing={3}>
      <Grid item xs={12} >
          <Paper >
            <Header />
          </Paper>
      </Grid>
      <Grid item xs={12} >
      </Grid>
      <Grid item xs={12} >
      </Grid>
      <Grid item xs={12} >
      </Grid>
      <Grid item xs={12} >
      </Grid>
      <Grid item xs={12} md={8} >
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={10}>
                <CreatePost/>
            </Grid>
            <Grid item xs={12} md={10}>
                <PostList/>
            </Grid>    
          </Grid>
      </Grid>
      <Hidden only={['sm','xs']}>
        <Grid item  xs={4}>
          <UserInfo />
        </Grid>
      </Hidden>
    </Grid>
    </>
  );
   
};


export default HomePage;