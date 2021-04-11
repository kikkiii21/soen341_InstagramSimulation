import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import Posts from "./Posts";
import { PostsContext } from "../Context/PostsContext";
import { v4 as uid } from "uuid";
import { UserContext } from "../Context/AppContext";
import { UserStatusContext } from "../Context/UserStatusContext";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const FollowList = () => {
  const [ followedPosts, setFollowedPosts ] = useState([]);
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const [loading, setLoading] = useState(true);
  const localPosts = localStorage.getItem("userInfo");

  let config = {
    headers: {
      "content-type": "application/json",
      Authorization: `token ${
        LoggedInUserInfo.token || JSON.parse(localPosts).token
      }`,
    },
  };

  useEffect(() => {
    axios
      .get("../followingEndpoint/", config)
      .then((response) => {
        setFollowedPosts(response.data);
        // console.log(response.data)
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("followedPosts", JSON.stringify(followedPosts));
  }, [followedPosts]);

  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        followedPosts.map((item) => (
          <Posts
            uid={item.id}
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
export default FollowList;
