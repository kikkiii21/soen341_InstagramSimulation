import axios from "axios";
import React, {useState, useContext, useEffect} from "react";
import Posts from "./Posts";
import {PostsContext} from './PostsContext';
import { v4 as uid } from "uuid";
import {UserContext} from './AppContext';
import {UserStatusContext} from './UserStatusContext'

 

const PostList = () => {
  const {posts , setPosts} = useContext(PostsContext);
  const {LoggedInUserInfo, setLoggedInUserInfo} = useContext(UserContext);
  const {isLoggedIn, setIsLoggedIn} = useContext(UserStatusContext);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    axios.get('posts/posts/')
      .then((response) => {
        setPosts(response.data);
        // console.log(response.data)
      }).catch(err => {
        console.error(err);
      })
    setLoading(false);
  },[])

  useEffect( () => {
    localStorage.setItem("posts", JSON.stringify(posts));
  },[posts])

 

 

    return(
      <>
        
        {loading? <div>Loading ...</div> : posts.map((item) => (
          <Posts name={item.owner}  avatar={LoggedInUserInfo.avatar }  postImage={item.photo} postComment={item.title} key={item.id} />
          
        ))}
      </>
    );

};
export default PostList;