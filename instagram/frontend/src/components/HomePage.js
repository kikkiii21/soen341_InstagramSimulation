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


const homeStyles = makeStyles((theme) => ({
    contain: {
        position: 'fixed',
    },
 
}));


const HomePage = () => {

    //state 
    const [posts,setPosts] = useState(data());

    
    const style = homeStyles();
    return(
         
        <Grid container spacing={3}>
        <Grid item xs={12} >
          <Paper ><Header /></Paper>
        </Grid>
        <Grid item xs={12} >
        </Grid>
        <Grid item xs={12} >
        </Grid>
        <Grid item xs={12} >
        </Grid>
        <Grid item xs={12} >
        </Grid>
        <Grid item xs={8}>
        {/* REQUIRED FURTHER CHECK BEFORE USE */}
            {/* <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CreatePost />
                </Grid>
            </Grid> */}
            <Grid  container
                direction="column"
                justify="center"
                alignItems="center"
                >
                
                <PostList posts={posts} setPosts={setPosts} />
                
            </Grid>
        </Grid>
        <Grid item xs={4} >
          <Grid   container
                direction="column"
                justify="center"
                alignItems="center"
                
                >
                
                <Grid  item xs={12}>
                <UserInfo />
                </Grid>
            
                
            </Grid>
        </Grid>
        
      </Grid>
    );
   
};


export default HomePage;