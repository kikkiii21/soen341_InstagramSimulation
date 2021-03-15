import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import Posts from "./Posts";
import { PostsContext } from "./PostsContext";
import { v4 as uid } from "uuid";
import { UserContext } from "./AppContext";
import { UserStatusContext } from "./UserStatusContext";

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
      .get("posts/")
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
            name={item.owner}
            avatar={LoggedInUserInfo.avatar || JSON.parse(localPosts).avatar}
            postImage={item.photo}
            postComment={item.title}
            key={item.id}
            pid={item.id}

          />
        ))
      )}
    </>
  );
};
export default PostList;
