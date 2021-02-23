import React,{ useState } from "react";
import Grid from '@material-ui/core/Grid';
import { Container, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header";
import CreatePost from "./CreatePost";
import Paper from "@material-ui/core/Paper";
import UserInfo from "./UserInfo";
import data from "./data";
import PostList from "./PostList";
import Hidden from '@material-ui/core/Hidden';
import { v4 as uid } from "uuid";



const homeStyles = makeStyles((theme) => ({
    contain: {
        position: 'fixed',
    },
 
}));


const HomePage = () => {

    //state 
    const [posts,setPosts] = useState(data());
    const [isLoggedIn, setIsLoggedIn] = useState(true); // temporarily a static logged in user
    const [LoggedInUserInfo, setLoggedInUserInfo] = useState({name: "Arthur Morgan", avatar: "../../static/images/arthur.jpg", id: uid()});

    
    const style = homeStyles();
    return(
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
        <Grid item sm={12} md={8} >
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={10}>
                    <CreatePost 
                    posts={posts} 
                    setPosts={setPosts}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    LoggedInUserInfo={LoggedInUserInfo}
                    setLoggedInUserInfo={setLoggedInUserInfo}
                    />
                </Grid>
                <Grid item xs={10}>
                <PostList posts={posts} setPosts={setPosts} />
                </Grid>
            </Grid>
        </Grid>
        <Hidden only={['sm','xs']}>
          <Grid item md={4}>
              <Grid container direction="column" justify="center" alignItems="center">
                  <Grid  item xs={12}>
                    <UserInfo
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    LoggedInUserInfo={LoggedInUserInfo}
                    setLoggedInUserInfo={setLoggedInUserInfo}
                    />
                  </Grid>
              </Grid>
          </Grid>
        </Hidden>
      </Grid>
    );
   
};


export default HomePage;