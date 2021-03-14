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
  const {comments , setComments} = useContext(CommentsContext);
  const {LoggedInUserInfo, setLoggedInUserInfo} = useContext(UserContext);
  const {isLoggedIn, setIsLoggedIn} = useContext(UserStatusContext);
  const [loading, setLoading] = useState(true);
  const localPosts = localStorage.getItem("userInfo");

  const getProfileImage = axios.get('https://faceapi.herokuapp.com/faces?n=1')
    .then((res) => {
      return res.data;
    }).catch(err => {
      console.error(err);
    })
  
 
console.log(getProfileImage);
  
  
  
  useEffect( () => {
    axios.get('comments/')
      .then((response) => {
        setComments(response.data);
        // console.log(response.data)
      }).catch(err => {
        console.error(err);
      })
    setLoading(false);
  },[])

  useEffect( () => {
    localStorage.setItem("comments", JSON.stringify(comments));
  },[comments])



    return(
      <>
        {loading? <div>Loading ...</div> : comments.map((item) => (
          <Comments username={item.owner}  avatar={ LoggedInUserInfo.avatar || JSON.parse(localPosts).avatar }  
          comment={item.body} post={item.post} key={item.id} />
        
        ))}
      </>
    );

};
export default CommentList;