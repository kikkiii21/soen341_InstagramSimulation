import axios from "axios";
import React, {useState, useContext, useEffect} from "react";
import {FollowContext} from './FollowContext';
import Posts from "./Posts";
import {PostsContext} from './PostsContext';
import { v4 as uid } from "uuid";
import {UserContext} from './AppContext';
import {UserStatusContext} from './UserStatusContext'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



const FollowList = () => {
  const {posts , setPosts} = useContext(PostsContext);
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

let config = {
    headers: {
      'content-type': 'application/json',
      'Authorization' : `token ${(LoggedInUserInfo.token || JSON.parse(localPosts).token)}`
    }
  }

console.log(getProfileImage);

  useEffect( () => {
    axios.get('../followingEndpoint/', config)
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
          <Posts uid={item.id} name={item.owner}  avatar={ LoggedInUserInfo.avatar || JSON.parse(localPosts).avatar }  postImage={item.photo} postComment={item.title} key={item.id} />
        ))}
      </>
    );

};
export default FollowList;