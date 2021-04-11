import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import Posts from "./Posts";
import { PostsContext } from "../Context/PostsContext";
import { v4 as uid } from "uuid";
import { UserContext } from "../Context/AppContext";
import { UserStatusContext } from "../Context/UserStatusContext";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const PostList = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(true);
  const [postSync, setPostSync] = useState(true);
  const localPosts = localStorage.getItem("userInfo");
  const [profiles, setProfiles] = useState(JSON.parse(localStorage.getItem("profileImages")));
  const [userList, setUserList] = useState(JSON.parse(localStorage.getItem("userList")));
  // console.log("profiles >>>> ", JSON.parse(localStorage.getItem("profileImages")))
  // console.log("userList >>>> ", JSON.parse(localStorage.getItem("userList")))
let counter = 0;

const profileImageParser = (dataArray) => {
  dataArray.map((obj) => {
    const userMatchId = userList.filter((user) => user.username == obj.author)[0].id
    obj.avatar = profiles.filter((img) => (img.id == userMatchId))[0].photo
  })
}
  useEffect(() => {
    axios
      .get("postsEndpoint/")
      .then((response) => {
        console.log("here are my posts first >>>",response.data)
        const data = response.data
        profileImageParser(data);
        setPosts(data)

        // setPosts(response.data);
        // setPostSync(false)
      })
      .catch((err) => {
        console.error(err);
      });
      
  }, []);

  useEffect(() => {
    //  posts.map((obj) => {
    //   const userMatchId = userList.filter((user) => user.username == obj.author)[0].id
    //   obj.avatar = profiles.filter((img) => (img.id == userMatchId))[0].photo
    // })
    // setPosts({...posts})
    localStorage.setItem("posts", JSON.stringify(posts));
    // setEditing(false)
    setLoading(false);
  }, [posts]);

 

  console.log("JOOOOOO >>>",posts)
  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        posts.map((item) => (
          <Posts
            uid={item.id}
            author={item.author}
            avatar={item.avatar}
            postImage={item.photo}
            postCaption={item.caption}
            key={item.id}
            pid={item.id}
          />
        ))
      )}
    </>
  );
};
export default PostList;
