import axios from "axios";
import React, {useState, useContext, useEffect} from "react";
import Comments from "./Comments";
import {CommentsContext} from './CommentsContext';
import { v4 as uid } from "uuid";
import {UserContext} from './AppContext';
import {UserStatusContext} from './UserStatusContext'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

 

const CommentList = () => {
  const {comment , setComment} = useContext(CommentsContext);
  const {LoggedInUserInfo, setLoggedInUserInfo} = useContext(UserContext);
  const {isLoggedIn, setIsLoggedIn} = useContext(UserStatusContext);
  const [isLoading, setIsLoading] = useState(true);
  const localPosts = localStorage.getItem("userInfo");

  
  useEffect( () => {
    axios.get('comments/')
      .then((response) => {
        setComment(response.data);
        // console.log(response.data)
      }).catch(err => {
        console.error(err);
      })
    
  },[])

  useEffect( () => {
    localStorage.setItem("comments", JSON.stringify(comment));
    setIsLoading(false);
  },[comment])



    return(
      <>
        {isLoading? <div>Loading ...</div> : comment.map((item) => (
          <Comments username={item.owner}  avatar={ LoggedInUserInfo.avatar || JSON.parse(localPosts).avatar }  
          comment={item.body} key={item.id} />
        ))}
      </>
    );

};
export default CommentList;