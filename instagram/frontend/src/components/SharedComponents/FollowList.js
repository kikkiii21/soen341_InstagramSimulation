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
  const [followedPosts, setFollowedPosts] = useState([]);
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const [loading, setLoading] = useState(true);
  const localPosts = localStorage.getItem("userInfo");
  const [profiles, setProfiles] = useState(
    JSON.parse(localStorage.getItem("profileImages"))
  );
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("userList"))
  );

  let config = {
    headers: {
      "content-type": "application/json",
      Authorization: `token ${
        LoggedInUserInfo.token || JSON.parse(localPosts).token
      }`,
    },
  };

  const profileImageParser = (dataArray) => {
    dataArray.map((obj) => {
      const userMatchId = userList.filter(
        (user) => user.username == obj.author
      )[0].id;
      obj.avatar = profiles.filter((img) => img.id == userMatchId)[0].photo;
    });
  };

  useEffect(() => {
    axios
      .get("../followingEndpoint/", config)
      .then((response) => {
        const data = response.data;
        profileImageParser(data);
        setFollowedPosts(data);
        // console.log(response.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("followedPosts", JSON.stringify(followedPosts));
    setLoading(false);
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
