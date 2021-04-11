import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";
import { PostsContext } from "../Context/PostsContext";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const PostList = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const [loading, setLoading] = useState(true);
  const localPosts = localStorage.getItem("userInfo");
  const [profiles, setProfiles] = useState(
    JSON.parse(localStorage.getItem("profileImages"))
  );
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("userList"))
  );

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
      .get("postsEndpoint/")
      .then((response) => {
        const data = response.data;
        profileImageParser(data);
        setPosts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
    setLoading(false);
  }, [posts]);

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
