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
  const localPosts = localStorage.getItem("userInfo");

  useEffect(() => {
    axios
      .get("postsEndpoint/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        posts.map((item) => (
          <Posts
            author={item.author}
            avatar={LoggedInUserInfo.avatar || JSON.parse(localPosts).avatar}
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
